import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import { useContext } from "react";
import { styled } from "styled-components";
import { AppContext } from "../../Context/AppProvider";

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
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);


  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyles header="Danh sách các phòng" key="1">
        {rooms.map((item) => (
          <LinkStyles key={item.id} onClick={() => setSelectedRoomId(item.id)}>
            {item.name}
          </LinkStyles>
        ))}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="addRoom"
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyles>
    </Collapse>
  );
};

export default RoomList;
