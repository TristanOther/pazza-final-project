import { Button } from "react-bootstrap";
import { Routes, useLocation, useNavigate } from "react-router";
import { Route } from "react-router-dom";
import ManageFolders from "./ManageFolders";
import PazzaProtectedRoute from "../PazzaProtectedRoute";

export default function ManageClass() {

    const navigate = useNavigate();
    const tabs = [
        { name: "General Settings", path: "" },
        { name: "Customize Q&A", path: "" },
        { name: "Manage Folders", path: "Folders" }, // only this one gets implemented
        { name: "Manage Enrollment", path: "" },
        { name: "Create Groups", path: "" },
        { name: "Customize Course Page", path: "" },
        { name: "Piazza Network Settings", path: "" },
    ];

    const currentTab = useLocation().pathname.split("/").pop();

    return (
        <div>
            <div className="d-flex pazza-grey-background justify-content-between pe-5 ps-5" style={{ width: "100%" }}>
                {tabs.map((tab: any) => (
                    <div>
                        <Button
                            className={`text-nowrap ${currentTab === tab.path ? "text-decoration-underline" : ""}`}
                            type="button"
                            variant="link"
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={() => navigate(tab.path)}>
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
                        </PazzaProtectedRoute>} />
                </Routes>
            </div>
        </div>
    );
}