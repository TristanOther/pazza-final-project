export default function PostCard() {
  const post = {
    title: "Example Post Display Card",
    instructor: true,
    content: `This is a test summary for a post display card. I'm writing a lot of words because I want to be able to test the card adequately and this is about the max data that would fit.`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  };

  return (
    <div className="border square ps-4">
        <div className="d-flex me-2">
            <p className="fw-bold">{post.title}</p>
            <p className="text-muted ms-auto">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        <p className="mb-0">{post.content}</p>
    </div>
  );
}
