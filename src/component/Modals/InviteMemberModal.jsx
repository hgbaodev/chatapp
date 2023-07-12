import { Avatar, Form, Modal, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import PropTypes from "prop-types";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFecher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      onSearch={debounceFecher}
      notFoundContent={fetching ? <Spin size="small"></Spin> : null}
      {...props}
    >
      {
        //[(label, value, photoURL)]
        options.map((option) => (
          <Select.Option key={option.uid}>
            <Avatar size="small" src={option.photoURL}>
              {option.photoURL ? "" : option.label?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Select.Option>
        ))
      }
    </Select>
  );
}

async function fetchUserList() {}

const InviteMemberModal = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const { uid } = useContext(AuthContext);
  const [form] = useForm();
  const handleOk = () => {
    //add new rooms firestore
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
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
          ></DebounceSelect>
        </Form>
      </Modal>
    </div>
  );
};

InviteMemberModal.propTypes = {
  isInviteMemberVisible: PropTypes.bool.isRequired,
  setIsInviteMemberVisible: PropTypes.func.isRequired,
};

DebounceSelect.propTypes = {
  fetchOptions: PropTypes.func,
  debounceTimeout: PropTypes.number,
};

export default InviteMemberModal;
