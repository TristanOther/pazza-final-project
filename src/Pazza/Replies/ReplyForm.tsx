import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as client from './client';

export default function ReplyForm({ discussionId, onReplyCreated }: { 
  discussionId: string, 
  onReplyCreated: () => void 
}) {
  const [content, setContent] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!content.trim()) {
      setError("Reply content cannot be empty");
      return;
    }
    
    try {
      await client.createReply(discussionId, { content });
      setContent("");
      onReplyCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit reply");
    }
  };

  return (
    <div className="reply-form mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your reply..."
          />
        </Form.Group>
        <Button variant="outline-primary" size="sm" type="submit">
          Reply
        </Button>
      </Form>
    </div>
  );
}