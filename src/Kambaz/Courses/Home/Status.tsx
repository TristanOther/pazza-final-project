export default function CourseStatus() {
    return (
      <div id="wd-course-status">
        <h2>Course Status</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li><button>Unpublish</button> <button>Publish</button></li>
            <li><button>Import Existing Content</button></li>
            <li><button>Import From Commons</button></li>
            <li><button>Choose Home Page</button></li>
            <li><button>View Course Stream</button></li>
            <li><button>New Announcement</button></li>
            <li><button>New Analytics</button></li>
            <li><button>View Course Notifications</button></li>
        </ul>
      </div> 
    );
}