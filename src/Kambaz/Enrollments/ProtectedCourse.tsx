import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourse({ courses, children }: { courses: any[], children: any }) {
  const { cid } = useParams();

  const enrollment = courses.find((enrollment: any) => enrollment._id === cid);

  if (enrollment) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
}}