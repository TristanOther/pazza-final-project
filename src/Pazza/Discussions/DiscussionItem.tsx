import { useState, useEffect } from 'react';
import { Card, Button, Dropdown, Badge, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaEllipsisV, FaThumbsUp, FaCheck, FaComment } from 'react-icons/fa';
import * as client from './client';
import * as replyClient from '../Replies/client';
import * as userClient from '../../Kambaz/Account/client';
import ReplyItem from '../Replies/ReplyItem';
import ReplyForm from '../Replies/ReplyForm';

export default function DiscussionItem({ 
  discussion, 
  onUpdate,
  onDelete,
}: { 
  discussion: any, 
  onUpdate: () => void,
  onDelete: () => void,
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(discussion.content);
  const [author, setAuthor] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Format date
  const formattedDate = new Date(discussion.createdAt).toLocaleString();
  
  // Check if current user can edit
  const canEdit = currentUser && (
    currentUser._id === discussion.createdBy || 
    currentUser.role === "FACULTY" || 
    currentUser.role === "ADMIN"
  );
  
  // Get author information
  useEffect(() => {
    const fetchAuthorAndUsers = async () => {
      try {
        const usersData = await userClient.findAllUsers();
        setUsers(usersData);
        
        const authorData = usersData.find((user: any) => user._id === discussion.createdBy);
        setAuthor(authorData);
      } catch (err) {
        console.error("Failed to fetch user information:", err);
      }
    };
    
    fetchAuthorAndUsers();
  }, [discussion.createdBy]);
  
  // Get reply list
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const repliesData = await replyClient.findRepliesForDiscussion(discussion._id);
        setReplies(repliesData);
      } catch (err) {
        console.error("Failed to fetch replies:", err);
      }
    };
    
    fetchReplies();
  }, [discussion._id]);

  const handleUpdate = async () => {
    try {
      await client.updateDiscussion(discussion._id, { content });
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error("Failed to update discussion:", err);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this discussion?")) {
      try {
        await client.deleteDiscussion(discussion._id);
        onDelete();
      } catch (err) {
        console.error("Failed to delete discussion:", err);
      }
    }
  };
  
  const handleResolve = async () => {
    try {
      await client.toggleResolved(discussion._id);
      onUpdate();
    } catch (err) {
      console.error("Failed to change resolved status:", err);
    }
  };
  
  const handleHelpful = async () => {
    try {
      await client.markAsHelpful(discussion._id);
      onUpdate();
    } catch (err) {
      console.error("Failed to mark as helpful:", err);
    }
  };
  
  const refreshReplies = async () => {
    try {
      const repliesData = await replyClient.findRepliesForDiscussion(discussion._id);
      setReplies(repliesData);
    } catch (err) {
      console.error("Failed to refresh replies:", err);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Badge bg={discussion.resolved ? "success" : "secondary"} className="me-2">
            {discussion.resolved ? "Resolved" : "Unresolved"}
          </Badge>
          
          {author && (
            <span className="me-2">
              {author.firstName} {author.lastName}
            </span>
          )}
          
          <small className="text-muted">{formattedDate}</small>
        </div>
        
        <div className="d-flex align-items-center">
          {discussion.helpfulCount > 0 && (
            <span className="me-3 text-success">
              <FaThumbsUp className="me-1" />
              {discussion.helpfulCount}
            </span>
          )}
          
          {canEdit && (
            <Dropdown>
              <Dropdown.Toggle as={Button} variant="link" id={`dropdown-discussion-${discussion._id}`} className="p-0">
                <FaEllipsisV />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => setEditing(true)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={handleResolve}>
                  {discussion.resolved ? "Mark as Unresolved" : "Mark as Resolved"}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Card.Header>
      
      <Card.Body>
        {editing ? (
          <>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-3"
            />
            <Button variant="primary" onClick={handleUpdate} className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Card.Text>{discussion.content}</Card.Text>
            
            <div className="d-flex mb-4">
              <Button 
                variant="link" 
                className="text-secondary me-3 p-0"
                onClick={handleHelpful}
              >
                <FaThumbsUp className="me-1" />
                Helpful
              </Button>
              
              <Button 
                variant="link" 
                className="text-secondary me-3 p-0"
                onClick={handleResolve}
              >
                <FaCheck className="me-1" />
                {discussion.resolved ? "Mark as Unresolved" : "Mark as Resolved"}
              </Button>
              
              <Button 
                variant="link" 
                className="text-secondary p-0"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <FaComment className="me-1" />
                Reply
              </Button>
            </div>
            
            {showReplyForm && (
              <div className="mb-4">
                <ReplyForm 
                  discussionId={discussion._id} 
                  onReplyCreated={() => {
                    setShowReplyForm(false);
                    refreshReplies();
                  }} 
                />
              </div>
            )}
            
            {replies.length > 0 && (
              <div className="replies-section">
                <h6 className="mb-3">Replies ({replies.length})</h6>
                {replies.map(reply => (
                  <ReplyItem 
                    key={reply._id} 
                    reply={reply} 
                    author={users.find((user: any) => user._id === reply.createdBy)}
                    discussionId={discussion._id}
                    onUpdate={refreshReplies}
                    onDelete={refreshReplies}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}