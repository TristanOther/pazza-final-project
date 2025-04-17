import { Form, InputGroup } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

export default function PostToolbar() {
    const { cid } = useParams();
    const navigate = useNavigate();

  return (
    <div
      className="pazza-background-dark d-flex justify-content-between align-items-center p-2"
      style={{ width: "100%" }}
    >
        {/* New post button */}
        <div
            className="pazza-blue-background text-white px-3 py-2 rounded"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Piazza/posts/create`)}
        >
            New Post
        </div>
        {/* Search bar */}
        <InputGroup style={{ maxWidth: "400px" }}>
            <InputGroup.Text>
            <CiSearch />
            </InputGroup.Text>
            <Form.Control
            placeholder="Search or add a post..."
            className="pazza-white"
            />
        </InputGroup>      
    </div>
  );
}
