import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FacultyOnlyOptions } from "../../Account/FacultyOnlyOptions";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <FacultyOnlyOptions>
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
      </FacultyOnlyOptions>
    </div> 
  );
}