import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ user, setUser, sendSmsCode }) => {
  const { username, mobileNumber } = user;

  const populateFields = e => {
    const { name, value } = e.target;

    setUser(draft => {
      draft[name] = value;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    sendSmsCode();
  };

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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={e => populateFields(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={e => populateFields(e)}
                />
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
