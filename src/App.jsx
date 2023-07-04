import { Login } from "./component/Login";
import { ChatRoom } from "./component/ChatRoom";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<ChatRoom />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
