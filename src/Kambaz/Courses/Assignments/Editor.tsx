export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr><br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr><br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="POINTS">POINTS</option>
            </select>
          </td>
        </tr><br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">ONLINE</option>
              <option value="PAPER">PAPER</option>
            </select><br /><br />
            <label htmlFor="wd-submission-type">Online Entry Options</label><br />

            <input type="checkbox" name="text-entry" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="website-url" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="media-recordings" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="student-annotation" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="file-upload" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label><br/>
          </td>
        </tr><br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
          <td>
            <select id="wd-assign-to">
              <option value="EVERYONE">EVERYONE</option>
              <option value="INSTRUCTORS">INSTRUCTORS</option>
              <option value="STUDENTS">STUDENTS</option>
            </select>
          </td>
        </tr><br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Assign to</label>
          </td>
          <td>
            <input type="date" value="1970-01-01" id="wd-due-date"/>
          </td>
        </tr><br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input type="date" value="1970-01-01" id="wd-available-from"/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">until</label>
          </td>
          <td>
            <input type="date" value="1970-01-01" id="wd-available-until"/>
          </td>
        </tr><br/>
        <tr>
          <td />
          <td align="right" valign="top">
            <button>Cancel</button> <button>Save</button>
          </td>
        </tr><br/>
      </table>
    </div>
  );
}


