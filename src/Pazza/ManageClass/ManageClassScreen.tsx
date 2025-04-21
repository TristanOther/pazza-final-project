import { Button } from "react-bootstrap";
import { Routes, useLocation, useNavigate, useParams } from "react-router";
import { Route } from "react-router-dom";
import ManageFolders from "./ManageFolders";
import PazzaProtectedRoute from "../PazzaProtectedRoute";

export default function ManageClass() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const tabs = [
        { name: "General Settings", path: "General" },
        { name: "Customize Q&A", path: "Customize_QA" },
        { name: "Manage Folders", path: "Folders" }, // only this one gets implemented
        { name: "Manage Enrollment", path: "Enrollment" },
        { name: "Create Groups", path: "Groups" },
        { name: "Customize Course Page", path: "Customize_Course" },
        { name: "Pazza Network Settings", path: "Network" },
    ];

    const currentTab = useLocation().pathname.split("/").pop();

    return (
        <div>
            <div className="d-flex pazza-grey-background justify-content-between pe-5 ps-5 pazza-dark-grey-border border-bottom border-2" style={{ width: "100%" }}>
                {tabs.map((tab: any) => (
                    <div>
                        <Button
                            className={`text-nowrap ${currentTab === tab.path ? "text-decoration-underline" : ""}`}
                            type="button"
                            variant="link"
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Pazza/Manage/${tab.path}`)}>
                            {tab.name}
                        </Button>
                    </div>
                ))}
            </div>
            <div style={{ width: "100%" }}> 
                <Routes>
                    <Route path="/Folders" element={
                        <PazzaProtectedRoute>
                            <ManageFolders />
                        </PazzaProtectedRoute>
                    } />
                </Routes>
            </div>
        </div>
    );
}