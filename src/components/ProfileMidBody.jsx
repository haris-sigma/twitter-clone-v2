import { Button, Col, Image, Nav, Row } from "react-bootstrap";

export default function ProfileMidBody() {
  const url =
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />

      <Image
        src={pic}
        roundedCircle
        style={{
          position: "absolute",
          top: "140px",
          marginLeft: 15,
          width: 150,
          border: "4px solid #F8F9FA",
        }}
      />
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>
      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Haris
      </p>
      <p style={{ marginBottom: "2px" }}>@haris.samingan</p>
      <p>I help people</p>
      <p>Entrepreneur</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>
      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="replies">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="highlights">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="media">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="likes">Likes</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
}
