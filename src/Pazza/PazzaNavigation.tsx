import "./main_styling.css";
import { useParams } from "react-router";
import { CiUser } from "react-icons/ci";
import { Row, Col } from "react-bootstrap";

export default function PazzaNavigation() {
  const { cid } = useParams();
  const user = "Current User (TODO)"

  const navbar_links = [
    { label: "Q & A", path: "/Piazza/QnA" },
    { label: "Manage Class", path: "/Piazza/Manage" },
  ];

  return (
    <div id="pazza-nav-bar" className="pazza-blue">
      <Row>
        <Col xs={4}>
          <a href="/Piazza" style={{ textDecoration: "none" }}><text id="pazza-home-btn" className="pazza-blue">Pazza</text></a> //TODO: Fix this href
        </Col>
        <Col xs={1}>
          <h5 className="text-white pazza-course-title-nb"><strong>{cid}</strong></h5>
        </Col>
        {navbar_links.map((link) => (
          <Col xs={1} key={link.path} style={{ paddingTop: "12px" }}>
            <a href={link.path} style={{ textDecoration: "none" }} >
              <span className="pazza-menu-bar-small-links">{link.label}</span>
            </a>
          </Col>
        ))}
        <Col xs={1}></Col>
        <Col xs={2} className="pt-2">
          <div>
            <CiUser className="fs-2 bg-light" />
            <a href={`/Piazza/Profile/${user}`} style={{ textDecoration: "none" }}>
              <span className="ms-2 text-white fw-bold">{user}</span>
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}