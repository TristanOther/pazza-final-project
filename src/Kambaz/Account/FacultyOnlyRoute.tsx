import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function FacultyOnlyRoute({ children, fallback }: { children: any, fallback: string }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') {
    return children;
  } else {
    return <Navigate to={fallback} />;
}}