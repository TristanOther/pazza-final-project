export default function Landing() {
    return (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "100vh", padding: "2rem" }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Mini-Piazza Final Project
          </h1>
          <h3 className="text-muted mb-4">
            Pazza Final Project Group 2 | CS4550-02
          </h3>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            <strong>Team Members:</strong> James Roth and Tristan Lyons
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            <a href="https://github.com/TristanOther/pazza-final-project" target="_blank" rel="noopener noreferrer">
              GitHub repo for our React.JS frontend
            </a>
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
            <a href="https://github.com/TristanOther/pazza-final-project-server" target="_blank" rel="noopener noreferrer">
              GitHub repo for our Node.JS backend
            </a>
          </p>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px" }}>
            Select <strong>"Account"</strong> on the left of the screen to sign in and enter Kambaz, then select a course to access Pazza for that course.
          </p>
        </div>
      );
}
