import "./main_styling.css";
import { useParams, useLocation } from "react-router";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function PazzaNavigation() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userFirstLastName = currentUser ? currentUser.firstName + " " + currentUser.lastName : "Log In";
  const userName = currentUser ? currentUser.username : "Log In";
  const { pathname } = useLocation();

  const navbar_links = [
    { label: "Q & A", path: pathname + "/QnA", faculty_only: false },
    { label: "Resources", path: pathname + "/Resources", faculty_only: false },
    { label: "Statistics", path: pathname + "/Statistics", faculty_only: false },
    { label: "Manage Class", path: pathname + "/Manage", faculty_only: true },
  ];

  return (
    <div id="pazza-nav-bar" className="d-flex pazza-blue">
      <a href="/Piazza" style={{ textDecoration: "none" }}>
        <text id="pazza-home-btn" className="me-5 pazza-blue">pazza</text>
      </a>
      <div className="d-flex justify-content-between align-items-center" style={{}}>
        <h5 className="text-white me-5 my-0"><strong>{cid}</strong></h5>
        {navbar_links.filter((link) => !link.faculty_only || ((currentUser.role === "FACULTY") || (currentUser.role === "ADMIN")))
          .map((link) => (
          <a href={link.path} style={{ textDecoration: "none" }} >
            <span className={`text-white me-4 fw-bold
                ${pathname.includes(`/Piazza/Profile/${userName}`) ? "text-decoration-underline" : ""}`}>{link.label}
            </span>
          </a>
        ))}
      </div>
      <div className="d-flex align-items-center ms-auto">
        <CiUser className="fs-2 bg-light"/>
        <a href={`/Profile/${userName}`} style={{ textDecoration: "none" }}>
          <span className={`ms-2 text-white bg-none fw-bold 
                ${pathname.includes(`/Piazza/Profile/${userName}`) ? "text-decoration-underline" : ""}`}>{userFirstLastName}
          </span>
        </a>
      </div>
    </div >
  );
}