import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/>
      <Link to={`/Kambaz/Account/Signin`}  > Signin  </Link> <br/>
      <Link to={`/Kambaz/Account/Signup`}  > Signup  </Link> <br/>
      <Link to={`/Kambaz/Account/Profile`} > Profile </Link> <br/>
    </div>
);}
