import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "border border-0 text-danger");
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const linkPath = `/Kambaz/Account/${label}`;
        const isActive = pathname.includes(`/${label}`);

        return (
          <Link 
            key={label}
            to={linkPath}
            className={`list-group-item ${isActive ? "active" : "text-danger"} border border-0`}
          >
            {label}
          </Link>
        );
      })}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
  );
}
