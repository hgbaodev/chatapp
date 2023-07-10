import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import { styled } from "styled-components";
import useFireStore from "../../hooks/useFireStore";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../Context/AuthProvider";

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
  const { uid } = useContext(AuthContext);
  //Room
  /**
   * {
   * name: 'room name'
   * description: 'mo ta'
   * members: [uid1, uid2,....]
   * }
   */
  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFireStore("rooms", roomCondition);

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyles header="Danh sách các phòng" key="1">
        {rooms.map((item) => (
          <LinkStyles key={item.id}>{item.name}</LinkStyles>
        ))}
        <Button type="text" icon={<PlusSquareOutlined />} className="addRoom">
          Thêm phòng
        </Button>
      </PanelStyles>
    </Collapse>
  );
};

export default RoomList;
