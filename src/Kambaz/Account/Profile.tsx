import { Dropdown, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <Form.Control id="wd-username"
        placeholder="username"
        defaultValue="alice"
        className="mt-2"/>
      <Form.Control id="wd-password"
        placeholder="password" type="password"
        defaultValue="123"
        className="mt-2"/>
      <Form.Control id="wd-firstname"
        placeholder="first name"
        defaultValue="Alice"
        className="mt-2"/>
      <Form.Control id="wd-lastname"
        placeholder="last name"
        defaultValue="Wonderland"
        className="mt-2"/>
      <Form.Control
        type="date"
        className="mt-2"/>
      <Form.Control id="wd-email"
        placeholder="email"
        defaultValue="alice@wonderland.com"
        className="mt-2"/>
      <Dropdown className="mt-2">
        <Dropdown.Toggle variant="secondary" id="dropdown-submission-type">
          User
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>User</Dropdown.Item>
          <Dropdown.Item>Admin</Dropdown.Item>
          <Dropdown.Item>Faculty</Dropdown.Item>
          <Dropdown.Item>Student</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link id="wd-signup-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mt-2">
        Signout
      </Link>
    </div>
  );
}
