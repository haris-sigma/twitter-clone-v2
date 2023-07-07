import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function ProfilePostCard({ content, postId }) {
  const [likes, setLikes] = useState([]);

  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);
  const userId = decode.id;

  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

  const BASE_URL =
    "https://twitter-api-sigmaschooltech.sigma-school-full-stack.repl.co";

  useEffect(() => {
    fetch(`${BASE_URL}/likes/post/${postId}`)
      .then((response) => response.json())
      .then((data) => setLikes(data))
      .catch((error) => console.error("error", error));
  }, [postId]);

  const isLiked = likes.some((like) => like.user_id === userId);

  const handleLike = () => (isLiked ? removeFromLikes() : addLikes());

  const addLikes = () => {
    setLikes([...likes, { user_id: userId }]);
    axios.post(`${BASE_URL}/likes`, { user_id: userId, post_id: postId });
  };
  const removeFromLikes = () => {
    const like = likes.find((like) => like.user_id === userId);
    if (like) {
      axios.delete(`${BASE_URL}/likes/${like.likes_id}`);
      setLikes(likes.filter((like) => like.user_id !== userId));
    }
  };

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>
      <Col>
        <strong>Haris</strong>
        <span>@haris.samingan . Apr 16</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked && <i className="bi bi-heart-fill text-danger"></i>}
            {!isLiked && <i className="bi bi-heart"></i>}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
