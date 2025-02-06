import { Form, Button, Dropdown, Col, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div style={{ width: "75%" }}>
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mt-4">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            className="border"
            placeholder="Enter assignment name..."
            defaultValue="A1"
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mt-3">
          <Form.Control
            as="textarea"
            className="border"
            rows={10}
            placeholder="Enter description..."
          >
            The assignment is available online Submit a link to the landing page of your Web 
            application on Netlify. The landing page should include the following: - Your full name 
            and section - Links to each of the lab assignments - Link to the Kanbas application - 
            Links to all relevant source code repositories The Kanbas application should include a 
            link to navigate back to the landing page.
          </Form.Control>
        </Form.Group>

        {/* Points */}
        <Form.Group className="mt-3 d-flex justify-content-end align-items-center">
          <Form.Label className="me-2 mb-0">Points</Form.Label>
          <Form.Control
            type="text"
            className="border"
            style={{ maxWidth: '50%' }}
            placeholder="Enter points..."
            defaultValue="100"
          />
        </Form.Group>


        {/* Assignment Group */}
        <Form.Group className="mt-3 d-flex justify-content-end align-items-center">
          <Form.Label className="me-2 mb-0">Assignment Group</Form.Label>
          <Dropdown style={{ width: '50%' }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-assignment-group">
              ASSIGNMENTS
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>ASSIGNMENTS</Dropdown.Item>
              <Dropdown.Item>QUIZZES</Dropdown.Item>
              <Dropdown.Item>EXAMS</Dropdown.Item>
              <Dropdown.Item>PROJECTS</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group className="mt-3 d-flex justify-content-end align-items-center">
          <Form.Label className="me-2 mb-0">Display Grade as</Form.Label>
          <Dropdown style={{ width: '50%' }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-grade-display">
              Percentage
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Percentage</Dropdown.Item>
              <Dropdown.Item>Points</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group className="mt-3 d-flex justify-content-end align-items-top">
          <Form.Label className="me-2 mb-0">Submission Type</Form.Label>
          <div className="border p-2" style={{ width: '50%' }}>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-grade-display">
                Online
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Online</Dropdown.Item>
                <Dropdown.Item>Paper</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Check
              type="checkbox"
              label="Text Entry"
              className="mt-2"
            />
            <Form.Check
              type="checkbox"
              label="Website URL"
              className="mt-2"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              className="mt-2"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              className="mt-2"
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              className="mt-2"
            />
          </div>
        </Form.Group>

        {/* Assignment Assign To, Date Pickers */}
        <Form.Group className="mt-3 d-flex justify-content-end align-items-top">
          <Form.Label className="me-2 mb-0">Assign</Form.Label>
          <div className="border p-3" style={{ width: "50%" }}>
            <Row>
              <Col sm={6}>
                <Form.Label><b>Assign to</b></Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-assign-to">
                    Everyone
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Everyone</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Instructors</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Students</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Label className="mt-3"><b>Due</b></Form.Label>
                <Form.Control
                  type="date"
                  className="border"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Label><b>Available From</b></Form.Label>
                <Form.Control
                  type="date"
                  className="border"
                />
              </Col>
              <Col>
                <Form.Label><b>Until</b></Form.Label>
                <Form.Control
                  type="date"
                  className="border"
                />
              </Col>
            </Row>
          </div>
        </Form.Group>

        {/* Line Separator */}
        <hr className="my-4" />
        {/* Cancel and Save Buttons */}
        <div className="float-end">
          <Button variant="secondary" size="lg" className="me-2">Cancel</Button>
          <Button variant="danger" size="lg">Save</Button>
        </div>
      </Form>
    </div>
  );
}
