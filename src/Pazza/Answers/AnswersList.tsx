import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as client from './client';
import * as userClient from '../../Kambaz/Account/client';
import AnswerItem from './AnswerItem';
import AnswerForm from './AnswerForm';

export default function AnswersList({ postId }: { postId: string }) {
  const [answers, setAnswers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasStudentAnswered, setHasStudentAnswered] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const answersData = await client.findAnswersForPost(postId);
      setAnswers(answersData);
      
      // Check if any student has already answered
      const studentAnswers = answersData.filter((answer: any) => {
        const author = users.find(user => user._id === answer.createdBy);
        return author && author.role === "STUDENT";
      });
      
      setHasStudentAnswered(studentAnswers.length > 0);
    } catch (err) {
      console.error("Failed to fetch answers:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const usersData = await userClient.findAllUsers();
      setUsers(usersData);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };
  
  useEffect(() => {
    fetchUsers().then(() => fetchAnswers());
  }, [postId]);
  
  // Determine if current user can answer
  const canAnswer = currentUser && (
    currentUser.role === "FACULTY" || 
    currentUser.role === "ADMIN" || 
    (currentUser.role === "STUDENT" && !hasStudentAnswered)
  );

  return (
    <div className="answers-section mt-4">
      <h3>Answers</h3>
      
      {loading ? (
        <p>Loading answers...</p>
      ) : answers.length === 0 ? (
        <Alert variant="info">No answers yet. Be the first to answer!</Alert>
      ) : (
        <div className="answers-list">
          {answers.map(answer => (
            <AnswerItem 
              key={answer._id} 
              answer={answer} 
              users={users}
              onUpdate={fetchAnswers}
              onDelete={fetchAnswers}
            />
          ))}
        </div>
      )}
      
      {canAnswer ? (
        <AnswerForm postId={postId} onAnswerCreated={fetchAnswers} />
      ) : currentUser && currentUser.role === "STUDENT" && hasStudentAnswered ? (
        <Alert variant="warning">
          Another student has already answered this post. Only one student answer is allowed per post.
        </Alert>
      ) : null}
    </div>
  );
}