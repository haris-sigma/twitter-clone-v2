import { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

export default function AuthPage() {
  const loginImage = "https://sig1.co/img-twitter-1";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Row>
      <Col sm={6}>
        <Image src={loginImage} fluid />
      </Col>
      <Col sm={6} className="p-4">
        <i
          className="bi bi-twitter"
          style={{ fontSize: 50, color: "dodgerblue" }}
        ></i>

        <p className="mt-5" style={{ fontSize: 64 }}>
          Happening Now
        </p>
        <h2 className="my-5" style={{ fontSize: 31 }}>
          Join Twitter today.
        </h2>
        <Col sm={5} className="d-grid gap-2">
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-google"></i> Sign up with Google
          </Button>
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-apple"></i> Sign up with Apple
          </Button>
          <p style={{ textAlign: "center" }}>or</p>
          <Button className="rounded-pill" onClick={handleShow}>
            Create an account
          </Button>
          <p style={{ fontSize: "12px" }}> Agree to terms</p>
          <p className="mt-5" style={{ fontWeight: "bold" }}>
            Already have an account?
          </p>
          <Button className="rounded-pill" variant="outline-primary">
            Sign in
          </Button>
        </Col>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="d-grid gap-2 px-5">
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>
              Create your account
            </h2>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmai">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
            <p style={{ fontSize: 12 }}>
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use. SigmaTweets may use your contact
              information, including your email address and phone number for
              purposes outlined in our Privacy Policy, like keeping your account
              secure and personalising our services, including ads. Learn more.
              Others will be able to find you by email or phone number, when
              provided, unless you choose otherwise here.
            </p>
            <Button className="rounded-pill">Sign up</Button>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}
