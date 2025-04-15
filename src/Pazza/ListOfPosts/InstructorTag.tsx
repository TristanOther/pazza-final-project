export default function InstructorTag() {
    const squareStyle = {
        width: '10px',
        height: '10px',
        backgroundColor: '#f8b01e'
    };
    
    return (
        <div id="wd-pazza-instructor-post-tag">
            <div className="d-flex align-items-center px-1" style={{ background: "Gainsboro", borderRadius: "3px", height: "20px" }}>
                <div style={squareStyle} className="me-1"></div>
                <p className="text-secondary mb-0">Instr</p>
            </div>
        </div>
    );
}