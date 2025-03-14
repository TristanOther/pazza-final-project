import "./main_styling.css";
import { useParams, useLocation } from "react-router";
import { CiUser } from "react-icons/ci";

export default function PazzaNavigation() {
  const { cid } = useParams();
  const user = "Current User (TODO)"
  const { pathname } = useLocation();

  const navbar_links = [
    { label: "Q & A", path: pathname + "/QnA" },
    { label: "Resources", path: pathname + "/Resources" },
    { label: "Statistics", path: pathname + "/Statistics" },
    { label: "Manage Class", path: pathname + "/Manage" },
  ];

  return (
    <div id="pazza-nav-bar" className="d-flex pazza-blue">
      <a href="/Piazza" style={{ textDecoration: "none" }}>
        <text id="pazza-home-btn" className="me-5 pazza-blue">pazza</text>
      </a>
      <div className="d-flex justify-content-between align-items-center" style={{}}>
        <h5 className="text-white me-5 my-0"><strong>{cid}</strong></h5>
        {navbar_links.map((link) => (
          <a href={link.path} style={{ textDecoration: "none" }} >
            <span className={`text-white me-4 fw-bold
                ${pathname.includes(`/Piazza/Profile/${user}`) ? "text-decoration-underline" : ""}`}>{link.label}
            </span>
          </a>
        ))}
      </div>
      <div className="d-flex align-items-center ms-auto">
        <CiUser className="fs-2 bg-light"/>
        <a href={`/Profile/${user}`} style={{ textDecoration: "none" }}>
          <span className={`ms-2 text-white bg-none fw-bold 
                ${pathname.includes(`/Piazza/Profile/${user}`) ? "text-decoration-underline" : ""}`}>{user}
          </span>
        </a>
      </div>
    </div >
  );
}