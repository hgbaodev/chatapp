import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import { styled } from "styled-components";

const { Panel } = Collapse;

const PanelStyles = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .addRoom {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyles = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList = () => {
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyles header="Danh sách các phòng" key="1">
        <LinkStyles>Room 1</LinkStyles>
        <LinkStyles>Room 2</LinkStyles>
        <LinkStyles>Room 3</LinkStyles>
        <Button type="text" icon={<PlusSquareOutlined />} className="addRoom">
          Thêm phòng
        </Button>
      </PanelStyles>
    </Collapse>
  );
};

export default RoomList;
