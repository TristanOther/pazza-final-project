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
  const homeLink = "/#" + pathname.split("Piazza").slice(0, 1).join("/") + "Piazza";

  const navbar_links = [
    { label: "Q & A", path: "", faculty_only: false },
    { label: "Resources", path: "Resources", faculty_only: false },
    { label: "Statistics", path: "Statistics", faculty_only: false },
    { label: "Manage Class", path: "Manage", faculty_only: true },
  ];

  return (
    <div id="pazza-nav-bar" className="d-flex pazza-blue-background">
      <a href={homeLink} style={{ textDecoration: "none" }}>
        <text id="pazza-home-btn" className="me-5 pazza-blue-background">pazza</text>
      </a>
      <div className="d-flex justify-content-between align-items-center" style={{}}>
        <h5 className="text-white me-5 my-0"><strong>{cid}</strong></h5>
        {navbar_links.filter((link) => !link.faculty_only || ((currentUser.role === "FACULTY") || (currentUser.role === "ADMIN")))
          .map((link) => (
            <a href={homeLink + (link.path == "" ? "" : "/" + link.path)} style={{ textDecoration: "none" }} >
              <span className={`text-white me-4 fw-bold
              ${((pathname.split("/Piazza")[1] === "" && link.path === "") ||
                  pathname.split("/Piazza")[1].includes(link.path) && link.path != "")
                  ? "text-decoration-underline" : ""}`}>{link.label}
              </span>
            </a>
          ))}
      </div>
      <div className="d-flex align-items-center ms-auto">
        <CiUser className="fs-2 bg-light" />
        <a href={`${homeLink}/Profile/${userName}`} style={{ textDecoration: "none" }}>
          <span className={`ms-2 text-white bg-none fw-bold 
                ${pathname.includes(`/Piazza/Profile/${userName}`) ? "text-decoration-underline" : ""}`}>{userFirstLastName}
          </span>
        </a>
      </div>
    </div >
  );
}