import { ListGroup } from "react-bootstrap";
import { LuClipboardPenLine } from "react-icons/lu";
import { BsPlus, BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import GreenCheckmark from "./GreenCheckmark";
import { useParams } from "react-router-dom";
import * as db from "../../Database";
import { FacultyOnlyOptions } from "../../Account/FacultyOnlyOptions";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(a => a.course === cid);

  return (
    <div>
      <AssignmentControls />
      <br /><br />
      <ListGroup className="rounded-0 mt-5" id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <FacultyOnlyOptions>
              <BsGripVertical className="me-2 fs-3" />
            </FacultyOnlyOptions>
            <MdArrowDropDown />
            ASSIGNMENTS
            <div className="float-end">
              <span className="text-black border border-black badge rounded-pill">40% of Total</span>
              <FacultyOnlyOptions>
                <BsPlus className="fs-2" />
                <IoEllipsisVertical className="fs-4" />
              </FacultyOnlyOptions>
            </div>
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.map((assignment) => (
              <ListGroup.Item key={assignment._id} className="wd-assignment p-3 ps-1">
                <div className="float-start mt-2">
                  <FacultyOnlyOptions>
                    <BsGripVertical className="me-2 fs-3" />
                  </FacultyOnlyOptions>
                  <LuClipboardPenLine style={{ color: "green" }} className="me-2 fs-4" />
                </div>
                <div className="float-end mt-2">
                  <FacultyOnlyOptions>
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-4" />
                  </FacultyOnlyOptions>
                </div>
                <div className="float-start ms-2">
                  <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-black text-decoration-none">
                    <b>{assignment.title}</b>
                  </a>
                  <div className="text-muted mt-1">
                    <span className="text-danger small me-1">Multiple Modules</span> | 
                    <span className="small ms-1 me-1"><b>Not available until </b>{new Date(assignment.availableFrom).toLocaleDateString()}</span> |
                    <span className="small ms-1 me-1"><b>Due </b>{new Date(assignment.dueDate).toLocaleDateString()}</span> |
                    <span className="small ms-1">{assignment.points} pts</span>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

/* Kept in case we want to use the data for placeholders later.
<div>
  <AssignmentControls />
  <br /><br />
  <ListGroup className="rounded-0 mt-5" id="wd-assignments">
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <BsGripVertical className="me-2 fs-3" />
        <MdArrowDropDown />
        ASSIGNMENTS
        <div className="float-end">
          <span className="text-black border border-black badge rounded-pill">40% of Total</span>
          <BsPlus className="fs-2" />
          <IoEllipsisVertical className="fs-4" />
        </div> 
      </div>
      <ListGroup className="wd-assignments rounded-0">
        <ListGroup.Item className="wd-assignment p-3 ps-1">
          <div className="float-start mt-3">
            <BsGripVertical className="me-2 fs-3" />
            <LuClipboardPenLine style={{ color: "green" }} className="me-2 fs-4" />
          </div>
          <div className="float-end mt-3">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
          </div>
          <div className="float-start ms-2">
            <a href="#/Kambaz/Courses/1234/Assignments/123"
              className="wd-assignment-link text-black text-decoration-none" >
              <b>A1</b>
            </a>
            <br />
            <div className="wd-assignment-description">
              <span className="text-danger small me-1">Multiple Modules</span> |
              <span className="small ms-1 me-1"><b>Not available until</b> May 6 at 12:00am</span> | 
              <span className="small ms-1 me-1"><b>Due</b> May 13 at 11:59 pm</span> | 
              <span className="small ms-1">100 pts</span>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="wd-assignment p-3 ps-1">
          <div className="float-start mt-3">
            <BsGripVertical className="me-2 fs-3" />
            <LuClipboardPenLine style={{ color: "green" }} className="me-2 fs-4" />
          </div>
          <div className="float-end mt-3">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
          </div>
          <div className="float-start ms-2">
            <a href="#/Kambaz/Courses/1234/Assignments/123"
              className="wd-assignment-link text-black text-decoration-none" >
              <b>A2</b>
            </a>
            <br />
            <div className="wd-assignment-description">
              <span className="text-danger small me-1">Multiple Modules</span> |
              <span className="small ms-1 me-1"><b>Not available until</b> May 13 at 12:00am</span> | 
              <span className="small ms-1 me-1"><b>Due</b> May 20 at 11:59 pm</span> | 
              <span className="small ms-1">100 pts</span>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="wd-assignment p-3 ps-1">
          <div className="float-start mt-3">
            <BsGripVertical className="me-2 fs-3" />
            <LuClipboardPenLine style={{ color: "green" }} className="me-2 fs-4" />
          </div>
          <div className="float-end mt-3">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
          </div>
          <div className="float-start ms-2">
            <a href="#/Kambaz/Courses/1234/Assignments/123"
              className="wd-assignment-link text-black text-decoration-none" >
              <b>A3</b>
            </a>
            <br />
            <div className="wd-assignment-description">
              <span className="text-danger small me-1">Multiple Modules</span> |
              <span className="small ms-1 me-1"><b>Not available until</b> May 20 at 12:00am</span> | 
              <span className="small ms-1 me-1"><b>Due</b> May 27 at 11:59 pm</span> | 
              <span className="small ms-1">100 pts</span>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  </ListGroup>
</div>
*/
  