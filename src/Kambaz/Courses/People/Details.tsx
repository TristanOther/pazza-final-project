import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser || currentUser.role !== "ADMIN") navigate(-1);

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;
  
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> 
      </button>
      <div className="text-center mt-2"> 
        <FaUserCircle className="text-secondary me-2 fs-1" /> 
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name"> {user.firstName} {user.lastName} </div>
      {!editing && (
        <FaPencil onClick={() => {
          setEditing(true);
          setName(`${user.firstName} ${user.lastName}`);
          setEmail(user.email);
          setRole(user.role);
        }} className="float-end fs-5 mt-2 wd-edit" /> 
      )}
      {editing && (
        <FaCheck onClick={() => saveUser()} className="float-end fs-5 mt-2 me-2 wd-save" />
      )}
      {user && editing && (
        <>
          <b>Name:</b>
          <FormControl 
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }}
          />
        </>
      )}
      {user && editing && (
        <>
          <b>Email:</b>
          <FormControl 
            type="email"
            className="w-50 wd-edit-name"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }}
          />
        </>
      )}
      {user && editing && (
        <>
          <b>Role:</b> 
          <br />
          <select 
            className="form-select float-start w-25 wd-select-role"
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }}
          >
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>
          <br />
          <br />
        </>
      )}

      {!editing && (
        <div className="wd-name" onClick={() => {setEditing(true); setName(`${user.firstName} ${user.lastName}`); setEmail(user.email); setRole(user.role);}}> 
          <b>Name:</b>  <span className="wd-name">  {user.firstName} {user.lastName} </span> <br />
        </div>
      )}
      {!editing && (
        <div className="wd-email" onClick={() => {setEditing(true); setName(`${user.firstName} ${user.lastName}`); setEmail(user.email); setRole(user.role);}}> 
          <b>Email:</b> <span className="wd-email"> {user.email}                     </span> <br />
        </div>
      )}
      {!editing && (
        <div className="wd-roles" onClick={() => {setEditing(true); setName(`${user.firstName} ${user.lastName}`); setEmail(user.email); setRole(user.role);}}> 
          <b>Role:</b> <span className="wd-roles"> {user.role}                      </span> <br />
        </div>
      )}
      <b>Login ID:</b>        <span className="wd-login-id">        {user.loginId}        </span> <br />
      <b>Section:</b>         <span className="wd-section">         {user.section}        </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">  {user.totalActivity}  </span> 
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > 
        Cancel 
      </button>
    </div> 
  ); 
}