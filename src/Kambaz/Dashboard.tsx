import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1800/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs1800.jpg" width={200} />
            <div>
              <h5> CS1800 Discrete </h5>
              <p className="wd-dashboard-course-title">
                Discrete Structures  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2800/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs2800.jpg" width={200} />
            <div>
              <h5> CS2800 Logic & Comp </h5>
              <p className="wd-dashboard-course-title">
                Logic and Computation  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3800/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs3800.jpg" width={200} />
            <div>
              <h5> CS3800 Theory of Comp </h5>
              <p className="wd-dashboard-course-title">
                Theory of Computation  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1200/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs1200.jpg" width={200} />
            <div>
              <h5> CS1200 Intro </h5>
              <p className="wd-dashboard-course-title">
                First Year Seminar  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1210/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs1210.jpg" width={200} />
            <div>
              <h5> CS1210 Co-op </h5>
              <p className="wd-dashboard-course-title">
                Professional Development for Khoury Co-op  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2500/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs2500.jpg" width={200} />
            <div>
              <h5> CS2500 Fundies </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science 1  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2510/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/kambaz/courses/cs2510.jpg" width={200} />
            <div>
              <h5> CS2510 Fundies 2 </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science 2  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
