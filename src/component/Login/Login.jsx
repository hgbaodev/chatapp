/* eslint-disable no-unused-vars */
import { Row, Col, Typography, Button } from "antd";
import { signInWithPopup } from "firebase/auth";
import { auth, providerGg } from "../firebase/config";
import { addDocument } from "../firebase/services";
const { Title } = Typography;

const Login = () => {
  const handleGgLogin = async () => {
    await signInWithPopup(auth, providerGg)
      .then((result) => {
        console.log(result);
        const { _tokenResponse, user, providerId } = result;
        if (_tokenResponse?.isNewUser) {
          addDocument("users", {
            displayaName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: providerId,
          });
          console.log("Add user success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
