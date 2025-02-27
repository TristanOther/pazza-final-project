import InstructorTag from "./InstructorTag";
import UnreadIndicator from "./UnreadIndicator";

export default function PostCard(props: { instructor: boolean; unread: boolean; }) {
  const post = {
    title: "Example Post Display Card",
    instructor: props.instructor,
    unread: props.unread,
    content: `This is a test summary for a post display card. I'm writing a lot of words because I want to be able to test the card adequately and this is about the max data that would fit.`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  };

  return (
    <div className="border square">
        <div className="d-flex">
            <div className="align-self-center mx-2"><UnreadIndicator unread={post.unread} /></div>
            <div>
                <div className="d-flex me-2 mt-1 align-items-center">
                    {post.instructor && <span className="me-1"><InstructorTag /></span>}
                    <span className="fw-semibold fs-6">{post.title}</span >
                </div>
                <p className="mb-0 text-secondary">{post.content}</p>
            </div>
            <span className="text-muted ms-auto me-2 mt-1">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
    </div>
  );
}
