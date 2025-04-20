export default function InstructorTag() {
    const squareStyle = {
        width: '10px',
        height: '10px'
    };
    
    return (
        <div id="wd-pazza-instructor-post-tag">
            <div className="d-flex align-items-center px-1" style={{ background: "Gainsboro", borderRadius: "3px", height: "20px" }}>
                <div style={squareStyle} className="me-1 pazza-instructor-background"></div>
                <p className="text-secondary mb-0">Instr</p>
            </div>
        </div>
    );
}