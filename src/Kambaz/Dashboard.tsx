import { useState } from "react";
import { Button, Card, Col, FormControl, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enroll, unenroll } from "./Enrollments/reducer";

export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
  courses: any[]; 
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: (course: any) => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void; 
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const filteredCourses = courses.filter((course) =>
    enrollments.some((enrollment: any) =>
    enrollment.user === currentUser._id &&
    enrollment.course === course._id
  ));
  const [enrollmentMode, setEnrollmentMode] = useState("disabled");
  const dispatch = useDispatch();

  {/* This function dynamically builds the enrollment listgroup item for toggling enrollments. */}
  function buildCourseEnrollBar(c: any) {
    const e = enrollments.find((enrollment: any) => 
      enrollment.user === currentUser._id && enrollment.course === c._id
    );
    return (
      <ListGroup.Item className="d-flex align-items-center" key={c._id}>
        <span className="me-auto">[{c._id}] {c.name}</span>
        { e &&
          <Button 
            className="btn btn-danger" 
            style={{ width: "5%" }} 
            onClick={() => dispatch(unenroll(e._id))}
          > 
            Unenroll 
          </Button> 
        }
        { !e &&
          <Button 
            className="btn btn-success"
            style={{ width: "5%" }} 
            onClick={() => dispatch(enroll({ user: currentUser._id, course: c._id }))}
          > 
            Enroll
          </Button> 
        }
      </ListGroup.Item>
    );
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* Create course buttons - faculty only. */}
      { currentUser.role === "FACULTY" &&
        <div>
          <h5>
            New Course
            {/* Add course form button. */}
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => addNewCourse({ ...course, author: currentUser._id })}
            > 
              Add 
            </button>
            {/* Update course form button. */}
            <button 
              className="btn btn-warning float-end me-2"
              onClick={updateCourse} 
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5><br />
          {/* Form course name field. */}
          <FormControl 
            value={course.name} className="mb-2" 
            onChange={(e) => setCourse({ ...course, name: e.target.value }) }
          />
          {/* Form course description field. */}
          <FormControl 
            value={course.description} 
            //rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value }) }
          />
          <hr />
          <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
        </div>
      }
      {/* Enrollments button(s) - students only. */}
      { currentUser.role === "STUDENT" &&
        <>
          <div className="d-flex justify-content-between">
            <h5>Course Enrollment</h5>
            <div>
              { enrollmentMode === "disabled" && <span>Click to see all courses:</span> }
              { enrollmentMode === "enroll" && <span>Click to see enrolled courses only:</span> }
              { enrollmentMode === "unenroll" && <span>Click to hide:</span> }
              <Button 
                variant="primary"
                className="ms-2"
                onClick={() => {
                  if (enrollmentMode === "disabled") {
                    setEnrollmentMode("enroll");
                  } else if (enrollmentMode === "enroll") {
                    setEnrollmentMode("unenroll");
                  } else {
                    setEnrollmentMode("disabled");
                  }
                }}
              >
                Enrollments
              </Button>
            </div>
          </div>
          { enrollmentMode === "enroll" &&
            <ListGroup className="my-2">
              {courses.map((c) => buildCourseEnrollBar(c))}
            </ListGroup>
          }
          { enrollmentMode === "unenroll" &&
            <ListGroup className="my-2">
              {filteredCourses.map((c) => buildCourseEnrollBar(c))}
            </ListGroup>
          }
          <hr />
        </>
      }
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {/* Where the course is linking to. */}
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  {/* Course image. */}
                  <Card.Img 
                    src={course.imgPath} 
                    variant="top" 
                    width="100%" 
                    height={160} 
                  /> 
                  <Card.Body className="card-body">
                    {/* Course name. */}
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    {/* Course description. */}
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    {/* Go to course button. */}
                    <Button variant="primary"> Go </Button>
                    { currentUser.role === "FACULTY" &&
                      <>
                        {/* Delete course button. */}
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        {/* Edit course button. */}
                        <button 
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    }
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
;}


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