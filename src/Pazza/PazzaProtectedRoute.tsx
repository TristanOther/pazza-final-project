import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PazzaProtectedRoute({ children }: { children: any }) {
    const pazzaHome = useLocation().pathname.split("/").slice(0, -1).join("/");
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN")) {
        return children;
    } else {
        return <Navigate to={pazzaHome} />;
    }
}