import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
      }}
    >
      <Row>
        <Col className="">
          <div className="form-container">
            <h3 className="form-container-heading text-center my-3">
              Login into your account
            </h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Mobile Number" />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100 text-center"
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
