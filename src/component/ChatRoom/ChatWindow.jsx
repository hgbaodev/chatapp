import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import { styled } from "styled-components";
import Message from "./Message";

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
  return (
    <WrapperStyles>
      <HeaderStyles>
        <div className="header__info">
          <p className="header__title">Room 1</p>
          <span className="header__desciption">Đây là room 1</span>
        </div>
        <ButtonGroupStyles>
          <Button icon={<UserAddOutlined></UserAddOutlined>} type="text">
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroupStyles>
      </HeaderStyles>
      <ContentStyles>
        <MessageListStyles>
          <Message
            text="Test"
            photoUrl={null}
            displayName="hgbaodev"
            createAt="10/07/2023"
          ></Message>
          <Message
            text="Test"
            photoUrl={null}
            displayName="hgbaodev"
            createAt="10/07/2023"
          ></Message>
          <Message
            text="Test"
            photoUrl={null}
            displayName="hgbaodev"
            createAt="10/07/2023"
          ></Message>
          <Message
            text="Test"
            photoUrl={null}
            displayName="hgbaodev"
            createAt="10/07/2023"
          ></Message>
        </MessageListStyles>
        <FormStyles>
          <Form.Item>
            <Input
              placeholder="Nhập tin nhắn...."
              bordered={false}
              autoComplete="off"
            ></Input>
          </Form.Item>
          <Button type="primary">Gửi</Button>
        </FormStyles>
      </ContentStyles>
    </WrapperStyles>
  );
};

export default ChatWindow;
