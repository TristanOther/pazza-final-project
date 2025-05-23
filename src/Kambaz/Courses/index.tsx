import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import FacultyOnlyRoute from "../Account/FacultyOnlyRoute";
import { useEffect, useState } from "react";

import * as courseClient from "./client";
import Pazza from "../../Pazza";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [people, setPeople] = useState<any[]>([]);
  const fetchCoursePeople = async () => {
    try {
      const users = await courseClient.findUsersForCourse(cid ? cid : "");
      setPeople(users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCoursePeople();
  }, []);



  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2> 
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Pazza/*" element={<Pazza />} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route 
              path="Assignments/:aid" 
              element={ <FacultyOnlyRoute fallback={"../Assignments"}> <AssignmentEditor /> </FacultyOnlyRoute> }
            />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable users={people} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
