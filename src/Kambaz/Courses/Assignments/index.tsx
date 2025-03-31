import { Button, ListGroup, Modal } from "react-bootstrap";
import { LuClipboardPenLine } from "react-icons/lu";
import { BsPlus, BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import GreenCheckmark from "./GreenCheckmark";
import { useParams } from "react-router-dom";
import { FacultyOnlyOptions } from "../../Account/FacultyOnlyOptions";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { deleteAssignment, setAssignments } from "./reducer";

import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState({_id: null, title: null});
  const dispatch = useDispatch();
  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, [])

  const handleDeleteClick = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment?._id) {
      removeAssignment(selectedAssignment._id);
    }
    setShowModal(false);
  };

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
            {assignments.map((assignment: any) => (
              <ListGroup.Item key={assignment._id} className="wd-assignment p-3 ps-1">
                <div className="float-start mt-2">
                  <FacultyOnlyOptions>
                    <BsGripVertical className="me-2 fs-3" />
                  </FacultyOnlyOptions>
                  <LuClipboardPenLine style={{ color: "green" }} className="me-2 fs-4" />
                </div>
                <div className="float-end mt-2">
                  <FacultyOnlyOptions>
                  <FaTrash className="text-danger me-3 mb-1" onClick={() => handleDeleteClick(assignment)}/>
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
            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete "{selectedAssignment?.title}"?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
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
  