import { Row, Col, Title, Button } from "antd";
const index = () => {
  return (
    <Row>
      <Col span={8}>
        <Title>App Chat</Title>
        <Button>Đăng nhập bằng Google</Button>
        <Button>Đăng nhập bằng Facebook</Button>
      </Col>
    </Row>
  );
};

export default index;
