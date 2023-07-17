/* eslint-disable react/prop-types */
import { createContext, useMemo, useContext, useState } from "react";
import {} from "react";
import { AuthContext } from "../Context/AuthProvider";
import useFireStore from "../hooks/useFireStore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [seletedRoomId, setSelectedRoomId] = useState("");
  const [isAddRooomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
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
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id == seletedRoomId) || {},
    [rooms, seletedRoomId]
  );

  const usersCondition = useMemo(() => {
    const compareValue = selectedRoom.members || ["oke"];
    return {
      fieldName: "uid",
      operator: "in",
      compareValue,
    };
  }, [selectedRoom.members]);

  const members = useFireStore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRooomVisible,
        setIsAddRoomVisible,
        seletedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
