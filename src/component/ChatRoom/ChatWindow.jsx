import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import { styled } from "styled-components";
import Message from "./Message";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFireStore from "../../hooks/useFireStore";

const HeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__desciption {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyles = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyles = styled.div`
  height: 100vh;
`;

const MessageListStyles = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ContentStyles = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyles = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const { uid, photoURL, displayName } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["message"]);
  };

  const messCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id || "",
    };
  }, [selectedRoom.id]);

  const messages = useFireStore("messages", messCondition);

  return (
    <WrapperStyles>
      {selectedRoom.id ? (
        <>
          <HeaderStyles>
            <div className="header__info">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__desciption">
                {selectedRoom?.description}
              </span>
            </div>
            <ButtonGroupStyles>
              <Button
                icon={<UserAddOutlined></UserAddOutlined>}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.length > 0 &&
                  members.map((item) => (
                    <Tooltip title={item.displayName} key={item.id}>
                      <Avatar src={item.photoURL}>
                        {item.displayName?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
              </Avatar.Group>
            </ButtonGroupStyles>
          </HeaderStyles>
          <ContentStyles>
            <MessageListStyles>
              {messages.length > 0 &&
                messages.map((mess) => (
                  <Message
                    key={mess.createAt}
                    text={mess.text}
                    photoUrl={mess.photoURL}
                    displayName={mess.displayName}
                    createAt={mess.createAt}
                  ></Message>
                ))}
            </MessageListStyles>
            <FormStyles form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Nhập tin nhắn...."
                  bordered={false}
                  autoComplete="off"
                ></Input>
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyles>
          </ContentStyles>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
        />
      )}
    </WrapperStyles>
  );
};

export default ChatWindow;
