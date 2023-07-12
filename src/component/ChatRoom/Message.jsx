/* eslint-disable no-unused-vars */

import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
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

function formatDate(seconds) {
  let formattedDate = "";
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
}

/* eslint-disable react/prop-types */
const Message = ({ text, displayName, createAt, photoUrl }) => {
  return (
    <MessageStyles>
      <div>
        <Avatar src={photoUrl} size="small">
          {photoUrl ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </MessageStyles>
  );
};

export default Message;
