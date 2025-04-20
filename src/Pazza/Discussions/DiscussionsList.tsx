import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import * as client from './client';
import DiscussionItem from './DiscussionItem';
import DiscussionForm from './DiscussionForm';

export default function DiscussionsList({ postId }: { postId: string }) {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const discussionsData = await client.findDiscussionsForPost(postId);
      setDiscussions(discussionsData);
    } catch (err) {
      console.error("Failed to fetch discussions:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDiscussions();
  }, [postId]);

  return (
    <div className="discussions-section mt-5">
      <h3>Follow-up Discussions</h3>
      
      <DiscussionForm postId={postId} onDiscussionCreated={fetchDiscussions} />
      
      {loading ? (
        <p className="mt-4">Loading discussions...</p>
      ) : discussions.length === 0 ? (
        <Alert variant="info" className="mt-4">No discussions yet</Alert>
      ) : (
        <div className="discussions-list mt-4">
          {discussions.map(discussion => (
            <DiscussionItem 
              key={discussion._id} 
              discussion={discussion} 
              onUpdate={fetchDiscussions}
              onDelete={fetchDiscussions}
            />
          ))}
        </div>
      )}
    </div>
  );
}