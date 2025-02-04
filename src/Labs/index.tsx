import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
export default function Labs() {
    return (
        <div id="wd-labs">
            <h1>Info</h1>
            <p>
                I've placed this section here based on the assignment two instructions on Canvas, which 
                said this information needed to be available as part of the labs page. As it was not all
                included in lab 1 (the github link was there, but at the bottom of the page) I chose to 
                include it here for ease of access.
            </p>
            <p>
                Tristan Lyons<br />
                CS4550 Section 4<br />
                <a href="https://github.com/TristanOther/kambaz-react-web-app" id="wd-github">This project's GitHub repo.</a> (I was instructed by a TA to make this repo public after submission until grading is complete so the TAs can grade my work.) 
            </p>
            <h1>Labs</h1>
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2/*" element={<Lab2 />} />
                <Route path="Lab3" element={<Lab3 />} />
            </Routes>
        </div>
    );
}