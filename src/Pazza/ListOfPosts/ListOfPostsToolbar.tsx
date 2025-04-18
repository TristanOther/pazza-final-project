import { Form, InputGroup } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

export default function PostToolbar({ setSearchTerm }: any) {
    const { cid } = useParams();
    const navigate = useNavigate();

  return (
    <div
      className="pazza-darker-grey-background d-flex justify-content-between align-items-center p-2"
      style={{ width: "100%" }}
    >
        {/* New post button */}
        <div
            className="pazza-blue-background text-white px-3 py-2 rounded text-nowrap"
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
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </InputGroup>      
    </div>
  );
}
