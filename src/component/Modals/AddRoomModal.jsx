import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomModal = () => {
  const { isAddRooomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { uid } = useContext(AuthContext);
  const [form] = useForm();
  const handleOk = () => {
    //add new rooms firestore
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        open={isAddRooomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng"></Input>
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả"></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
