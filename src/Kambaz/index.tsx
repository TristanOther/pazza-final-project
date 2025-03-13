import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enroll, unenroll } from "./Enrollments/reducer";
import { v4 as uuidv4 } from "uuid";
import ProtectedCourse from "./Enrollments/ProtectedCourse";

export default function Kambaz() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  // Course state initialized with a template course.
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    imgPath: "/images/react.jpg",
    description: "New Description",
    author: null
  });

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route 
            path="/Dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={async (course: any) => {
                    const newCourseId = uuidv4();
                    dispatch(addCourse({ ...course, _id: newCourseId }));
                    dispatch(enroll({ user: course.author, course: newCourseId}));
                  }}
                  deleteCourse={(courseId) => {
                    dispatch(deleteCourse(courseId));
                    enrollments.map((e: any) => {
                      if (e.course === courseId) dispatch(unenroll(e._id));
                    });
                  }}
                  updateCourse={() => dispatch(updateCourse(course))}
                />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/Courses/:cid/*"
            element={
              <ProtectedRoute>
                <ProtectedCourse>
                  <Courses courses={courses} />
                </ProtectedCourse>
              </ProtectedRoute>
            }
          />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
);
}

