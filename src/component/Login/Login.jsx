import { Row, Col, Typography, Button } from "antd";
import { signInWithPopup } from "firebase/auth";
import { auth, providerGg } from "../firebase/config";
const { Title } = Typography;

const Login = () => {
  const handleGgLogin = () => {
    signInWithPopup(auth, providerGg)
      .then((result) => {
        console.log("Login success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  auth.onAuthStateChanged((user) => {
    console.log({ user });
    if(user) {
      
    }
  });

  return (
    <Row justify="center" style={{ height: "800px" }}>
      <Col span={8}>
        <Title style={{ textAlign: "center" }} level={3}>
          App Chat
        </Title>
        <Button
          onClick={handleGgLogin}
          style={{ width: "100%", marginBottom: 5 }}
        >
          Đăng nhập bằng Google
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
