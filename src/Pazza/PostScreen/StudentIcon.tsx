import { FaSquare } from "react-icons/fa";

export default function StudentIcon() {
    return (
        <div
            className="fs-4 pazza-student-text"
            style={{
                position: "relative",
                width: "1.55em", // fs-2 scales based on font size, use em here
                height: "1.55em",
                marginLeft: "0.2em",
            }}
        >
            <FaSquare
                style={{ position: "absolute", top: 0, left: 0 }}
                size="100%"
            />
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.75em",
                }}
            >
                S
            </span>
        </div>
    );
}