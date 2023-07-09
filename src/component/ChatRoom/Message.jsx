/* eslint-disable no-unused-vars */

import { Avatar, Typography } from "antd";
import { styled } from "styled-components";

const MessageStyles = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

/* eslint-disable react/prop-types */
const Message = ({ text, displayName, createAt, photoUrl }) => {
  return (
    <MessageStyles>
      <div>
        <Avatar src={photoUrl}>A</Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{createAt}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </MessageStyles>
  );
};

export default Message;
