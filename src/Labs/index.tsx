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
                said this information needed to be available as part of the labs page.
            </p>
            <p>
                Tristan Lyons<br />
                CS4550 Section 4<br />
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