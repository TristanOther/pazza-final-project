import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as client from './client';

export default function AnswerForm({ postId, onAnswerCreated }: { postId: string, onAnswerCreated: () => void }) {
  const [content, setContent] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!content.trim()) {
      setError("Answer content cannot be empty");
      return;
    }
    
    try {
      await client.createAnswer(postId, { content });
      setContent("");
      onAnswerCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit answer");
    }
  };

  return (
    <div className="answer-form mt-4">
      <h4>Your Answer</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your answer here..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Answer
        </Button>
      </Form>
    </div>
  );
}