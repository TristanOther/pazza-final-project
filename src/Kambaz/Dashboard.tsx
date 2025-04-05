import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FacultyOnlyOptions } from "./Account/FacultyOnlyOptions.tsx";

export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
  courses: any[]; 
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void; 
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>  
      </h1> <hr />
      {/* Create course buttons - faculty only. */}
      <FacultyOnlyOptions>
        <div>
          <h5>
            New Course
            {/* Add course form button. */}
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => addNewCourse()}
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
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        </div>
      </FacultyOnlyOptions>
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
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
                    {/* Enrollment Button */}
                    {enrolling && (
                      <button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }}
                        className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} 
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                    {/* Course name. */}
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    {/* Course description. */}
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    {/* Go to course button. */}
                    <Button variant="primary"> Go </Button>
                    <FacultyOnlyOptions>
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
                    </FacultyOnlyOptions>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
};
