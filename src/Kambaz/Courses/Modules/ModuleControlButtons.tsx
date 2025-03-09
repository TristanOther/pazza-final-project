import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FacultyOnlyOptions } from "../../Account/FacultyOnlyOptions";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FacultyOnlyOptions>
        <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3 mb-1" />
        <FaTrash className="text-danger me-3 mb-1" onClick={() => deleteModule(moduleId)}/>
        <GreenCheckmark />
        <BsPlus className="fs-2 me-1" />
        <IoEllipsisVertical className="fs-4" />
      </FacultyOnlyOptions>
    </div> 
  );
}