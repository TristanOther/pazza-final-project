import { Link, useParams, useLocation } from "react-router-dom";
export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Pazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        // Construct URL for each section using course ID and link label.
        const linkPath = `/Kambaz/Courses/${cid}/${label}`;

        // Determine active state.
        const isActive = pathname.includes(`/${label}`);

        return (
          <Link
            key={label}
            to={linkPath}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}