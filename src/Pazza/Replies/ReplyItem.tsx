import { useState } from 'react';
import { Card, Button, Dropdown, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaEllipsisV, FaThumbsUp } from 'react-icons/fa';
import * as client from './client';
import ReplyForm from './ReplyForm';

export default function ReplyItem({ 
  reply, 
  onUpdate,
  onDelete,
  author,
  discussionId
}: { 
  reply: any, 
  onUpdate: () => void,
  onDelete: () => void,
  author: any,
  discussionId: string
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(reply.content);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Format date
  const formattedDate = new Date(reply.createdAt).toLocaleString();
  
  // Check if current user can edit
  const canEdit = currentUser && (
    currentUser._id === reply.createdBy || 
    currentUser.role === "FACULTY" || 
    currentUser.role === "ADMIN"
  );

  const handleUpdate = async () => {
    try {
      await client.updateReply(reply._id, { content });
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error("Failed to update reply:", err);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      try {
        await client.deleteReply(reply._id);
        onDelete();
      } catch (err) {
        console.error("Failed to delete reply:", err);
      }
    }
  };
  
  const handleGoodComment = async () => {
    try {
      await client.markAsGoodComment(reply._id);
      onUpdate();
    } catch (err) {
      console.error("Failed to mark as good comment:", err);
    }
  };

  return (
    <Card className="mb-2 ms-4">
      <Card.Body className="py-2">
        {editing ? (
          <>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-2">
              <Button variant="primary" size="sm" onClick={handleUpdate} className="me-2">
                Save
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="fw-bold me-2">
                  {author ? `${author.firstName} ${author.lastName}` : "Unknown User"}
                </span>
                <small className="text-muted">{formattedDate}</small>
              </div>
              
              <div className="d-flex align-items-center">
                {reply.goodCommentCount > 0 && (
                  <span className="me-3 text-success">
                    <FaThumbsUp className="me-1" />
                    {reply.goodCommentCount}
                  </span>
                )}
                
                {canEdit && (
                  <Dropdown>
                    <Dropdown.Toggle as={Button} variant="link" id={`dropdown-reply-${reply._id}`} className="p-0">
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={() => setEditing(true)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
            
            <div className="mt-2 mb-2">
              {reply.content}
            </div>
            
            <div className="d-flex">
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 text-secondary me-3"
                onClick={handleGoodComment}
              >
                <FaThumbsUp className="me-1" />
                Good Comment
              </Button>
              
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 text-secondary"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Reply
              </Button>
            </div>
            
            {showReplyForm && (
              <ReplyForm 
                discussionId={discussionId} 
                onReplyCreated={() => {
                  setShowReplyForm(false);
                  onUpdate();
                }} 
              />
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}