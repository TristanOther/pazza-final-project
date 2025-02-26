import { Card } from "react-bootstrap";

export default function PostCard() {
  const post = {
    title: "Example Post Display Card",
    author: "Name, Author's",
    content: `This is a test summary for a post display card.`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="fw-bold">{post.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text className="text-dark">{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
