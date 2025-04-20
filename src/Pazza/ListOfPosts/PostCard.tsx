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

// The rich text from the editor contains HTML tags. This strips those out for displaying the title on a post card.
function humanReadable(text: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const rawText = doc.body.textContent || "";

  // Collapse multiple spaces and trim leading spaces per line
  return rawText
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trimStart())
    .join('\n');
}

export default function PostCard({ id, title, content, createdAt, instructor, readBy }: props) {
  const location = useLocation();
  const pid = location.pathname.split("/").pop();

  return (
    <div className={`border square ${(pid && pid === id) ? "pazza-yellow-background" : "pazza-white-background"}`} style={{ width: "100%" }}>
        <div className="d-flex">
            <div className="align-self-center mx-2"><UnreadIndicator unread={readBy} /></div>
            <div>
                <div className="d-flex me-2 mt-1 align-items-center">
                    {instructor && <span className="me-1"><InstructorTag /></span>}
                    <span className="fw-semibold fs-6">{shortenText(title, 30)}</span >
                </div>
                <p className="mb-0 text-secondary" style={{ maxWidth: "15vw", wordBreak: "break-word", whiteSpace: "pre-line" }}>{humanReadable(shortenText(content, 150))}</p>
            </div>
            <span className="text-muted ms-auto me-2 mt-1">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
    </div>
  );
}
