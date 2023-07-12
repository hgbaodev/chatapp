import { Login } from "./component/Login";
import { ChatRoom } from "./component/ChatRoom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./component/Modals/AddRoomModal";
import InviteMemberModal from "./component/Modals/InviteMemberModal";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
          <AddRoomModal></AddRoomModal>
          <InviteMemberModal></InviteMemberModal>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
