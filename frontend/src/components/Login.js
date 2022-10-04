import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ user, setUser, sendSmsCode }) => {
  const populateFields = e => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
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
              {user.verificationSent ? 'Enter Code' : 'Login into your account'}
            </h3>
            <Form onSubmit={handleSubmit}>
              {!user.verificationSent && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={user.username}
                      onChange={e => populateFields(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      name="mobileNumber"
                      value={user.mobileNumber}
                      onChange={e => populateFields(e)}
                    />
                  </Form.Group>
                </>
              )}
              {user.verificationSent && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter code"
                      name="verificationCode"
                      value={user.verificationCode}
                      onChange={e =>
                        setUser({
                          ...user,
                          verificationCode: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}

              <Button
                variant="success"
                type="submit"
                className="w-100 text-center"
              >
                {user.verificationSent ? 'Verify Code' : 'Login/Signup'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
