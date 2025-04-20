import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as client from './client';

export default function DiscussionForm({ postId, onDiscussionCreated }: { 
  postId: string, 
  onDiscussionCreated: () => void 
}) {
  const [content, setContent] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!content.trim()) {
      setError("Discussion content cannot be empty");
      return;
    }
    
    try {
      await client.createDiscussion(postId, { content });
      setContent("");
      onDiscussionCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="discussion-form mt-4">
      <h4>Start a New Discussion</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your discussion content here..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Start Discussion
        </Button>
      </Form>
    </div>
  );
}