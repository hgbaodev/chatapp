/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      // eslint-disable-next-line react/prop-types
      fetchOptions(value, props.curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small"></Spin> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  const colRefQuery = collection(db, "users");
  const q = query(colRefQuery, where("keywords", "array-contains", search));

  const snapshot = await getDocs(q);
  const data = snapshot.docs
    .map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter(
      (opt) =>
        curMembers &&
        Array.isArray(curMembers) &&
        !curMembers.includes(opt.value)
    );
  return data;
}

const InviteMemberModal = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = useForm();

  const handleOk = () => {
    const roomRef = doc(db, "rooms", selectedRoom?.id);
    const newMembers = [
      ...(selectedRoom?.members || []),
      ...(value.map((val) => val.value) || []),
    ];
    updateDoc(roomRef, { members: newMembers })
      .then(() => {
        form.resetFields(); // Reset form fields
        setValue([]); // Reset value state
        setIsInviteMemberVisible(false);
      })
      .catch((error) => {
        // Handle error when updating data
        console.log("Error updating room members:", error);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setValue([]); // Reset value state
    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{
              width: "100%",
            }}
            curMembers={selectedRoom?.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

DebounceSelect.propTypes = {
  fetchOptions: PropTypes.func,
  debounceTimeout: PropTypes.number,
};

export default InviteMemberModal;
