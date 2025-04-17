import { useLocation } from "react-router";
import InstructorTag from "./InstructorTag";
import UnreadIndicator from "./UnreadIndicator";

interface props {
  id: string,
  title: string,
  content: string,
  createdAt: Date,
  instructor: boolean,
  readBy: boolean,
}

// Function that shortens text to a specified length, adding a ... to indicate if the text was shortened.
function shortenText(text: string, length: number) {
  return `${text.substring(0, length)}${text.length > length ? '...' : ''}`;
}

export default function PostCard({ id, title, content, createdAt, instructor, readBy }: props) {
  const location = useLocation();
  const pid = location.pathname.split("/").pop();

  return (
    <div className="border square" style={{ width: "100%", backgroundColor: (pid && pid === id) ? "#fff9c4" : "transparent" }}>
        <div className="d-flex">
            <div className="align-self-center mx-2"><UnreadIndicator unread={readBy} /></div>
            <div>
                <div className="d-flex me-2 mt-1 align-items-center">
                    {instructor && <span className="me-1"><InstructorTag /></span>}
                    <span className="fw-semibold fs-6">{shortenText(title, 30)}</span >
                </div>
                <p className="mb-0 text-secondary">{shortenText(content, 140)}</p>
            </div>
            <span className="text-muted ms-auto me-2 mt-1">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
    </div>
  );
}
