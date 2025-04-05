import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  useEffect(() => { fetchProfile(); }, []);

  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <Form.Control id="wd-username"
            placeholder="username"
            defaultValue={profile.username}
            className="mt-2"
            onChange={(e) => setProfile({ ...profile, username:  e.target.value })}
          />
          <Form.Control id="wd-password"
            placeholder="password"
            type="password"
            defaultValue={profile.password}
            className="mt-2"
            onChange={(e) => setProfile({ ...profile, password:  e.target.value })}
          />
          <Form.Control id="wd-firstname"
            placeholder="first name"
            defaultValue={profile.firstName}
            className="mt-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Form.Control id="wd-lastname"
            placeholder="last name"
            defaultValue={profile.lastName}
            className="mt-2"
            onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}
          />
          <Form.Control
            type="date"
            defaultValue={profile.dob}
            className="mt-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <Form.Control id="wd-email"
            placeholder="email"
            defaultValue={profile.email}
            className="mt-2"
            onChange={ (e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select 
            onChange={(e) => setProfile({ ...profile, role:  e.target.value })}
            className="form-control mb-2" id="wd-role"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <Button onClick={signout} className="w-100 mb-2 btn btn-danger" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
