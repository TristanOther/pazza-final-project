import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as db from "./Database";
export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src={`/images/kambaz/courses/${course._id}.jpg`} variant="top" width="100%" height={160} /> 
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
);}


/* Saved in case I want the content for adding more courses later.
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/1800/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs1800.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS1800 Discrete</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">Discrete Structures</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/2800/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs2800.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS2800 Logic & Comp</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">Logic and Computation</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/3800/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs3800.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS3800 Theory of Comp</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">Theory of Computation</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/1200/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs1200.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS1200 Intro</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">First Year Seminar</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/1210/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs1210.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS1210 Co-op</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">Professional Development for Khoury Co-op</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/2500/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs2500.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS2500 Fundies</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">Fundamentals of Computer Science 1</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
  <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
      <Link to="/Kambaz/Courses/2510/Home"
            className="wd-dashboard-course-link text-decoration-none text-dark">
        <Card.Img variant="top" src="/images/kambaz/courses/cs2510.jpg" width="100%" height={160}/>
        <Card.Body>
          <Card.Title className="wd-dashboard-course-title">CS2510 Fundies 2</Card.Title>
          <Card.Text  className="wd-dashboard-course-description">Fundamentals of Computer Science 2</Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Link>
    </Card>
  </Col>
*/