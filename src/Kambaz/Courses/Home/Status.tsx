import { Button } from "react-bootstrap";
import { FaCheckCircle, FaBell } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import { BiImport } from "react-icons/bi";

export default function CourseStatus() {
    return (
      <div id="wd-course-status" style={{ width: "350px" }}>
        <h2>Course Status</h2>
        <div className="d-flex">
          <div className="w-50 pe-1">
            <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
              <MdDoNotDisturbAlt className="me-2 mb-1 fs-5" /> 
              Unpublish 
            </Button>
          </div>
          <div className="w-50">
            <Button variant="success" size="lg" className="w-100">
              <FaCheckCircle className="me-2 mb-1 fs-5" />
              Publish
            </Button>
          </div>
        </div>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <BiImport style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          Import Existing Content
        </Button>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <LiaFileImportSolid style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          Import From Commons
        </Button>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <AiFillHome   style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          Choose Home Page
        </Button>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <RiBarChart2Fill style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          View Course Stream
        </Button>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <TfiAnnouncement style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          New Announcement
        </Button>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <RiBarChart2Fill style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          New Analytics
        </Button>
        <br />
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <FaBell style={{ bottom: "2px" }} className="me-2 mb-1 fs-5"/>
          View Course Notifications
        </Button>
      </div> 
    );
}