import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
export default function AssignmentControls() {
  return (
    <div id="wd-assignment-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="text-white float-end" id="wd-view-progress">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button variant="secondary" size="lg" className="text-black me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <InputGroup className="float-start w-25 me-5">
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control type="text" size="lg" placeholder="Search..." />
      </InputGroup>
    </div>
  );
}

//<FaSearch className="position-relative"/>