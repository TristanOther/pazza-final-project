import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FacultyOnlyOptions } from "../../Account/FacultyOnlyOptions";
import { Link, useParams } from "react-router-dom";

export default function AssignmentControls() {
  const { cid } = useParams();
  
  return (
    <div id="wd-assignment-controls" className="text-nowrap">
      <FacultyOnlyOptions>
        <Link to={`/Kambaz/Courses/${cid}/Assignments/new`} className="text-decoration-none">
          <Button variant="danger" size="lg" className="text-white float-end" id="wd-add-group-btn">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        </Link>
        <Button variant="secondary" size="lg" className="text-black me-1 float-end" id="wd-add-assignment-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </Button>
      </FacultyOnlyOptions>
      <InputGroup className="float-start w-25 me-5">
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control type="text" size="lg" placeholder="Search..." />
      </InputGroup>
    </div>
  );
}

//<FaSearch className="position-relative"/>