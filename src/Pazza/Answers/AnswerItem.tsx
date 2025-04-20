import { useState } from 'react';
import { Card, Button, Dropdown, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as client from './client';
import { FaEllipsisV } from 'react-icons/fa';

export default function AnswerItem({ 
  answer, 
  onUpdate,
  onDelete,
  users
}: { 
  answer: any, 
  onUpdate: () => void,
  onDelete: () => void,
  users: any[]
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(answer.content);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Find author in users array
  const author = users.find(user => user._id === answer.createdBy) || { firstName: "Unknown", lastName: "User" };
  
  const formattedDate = new Date(answer.createdAt).toLocaleString();
  
  // Check if current user can edit (is author or instructor/admin)
  const canEdit = currentUser && (
    currentUser._id === answer.createdBy || 
    currentUser.role === "FACULTY" || 
    currentUser.role === "ADMIN"
  );
  
  const handleUpdate = async () => {
    try {
      await client.updateAnswer(answer._id, { content });
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error("Failed to update answer:", err);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this answer?")) {
      try {
        await client.deleteAnswer(answer._id);
        onDelete();
      } catch (err) {
        console.error("Failed to delete answer:", err);
      }
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {editing ? (
          <>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-2">
              <Button variant="primary" onClick={handleUpdate} className="me-2">
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-0">
                  {author.firstName} {author.lastName}
                </h5>
                <small className="text-muted">{formattedDate}</small>
              </div>
              
              {canEdit && (
                <Dropdown>
                  <Dropdown.Toggle as={Button} variant="link" id={`dropdown-answer-${answer._id}`}>
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setEditing(true)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="mt-3">
              {content}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}