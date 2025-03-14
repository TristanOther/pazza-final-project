import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedCourse({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const { cid } = useParams();

  const enrollment = enrollments.find((enrollment: any) => 
    enrollment.user === currentUser._id && enrollment.course === cid
  );

  if (enrollment) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
}}