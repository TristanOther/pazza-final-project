import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

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


    return (
        <div className="d-flex pazza-grey-background" style={{ width: "100%" }}>
            {tabs.map((tab: any) => (
                <div>
                    <Button className="text-nowrap" type="button" variant="link" style={{ textDecoration: "none", color: "black" }} 
                        onClick={() => navigate(tab.path)}>
                        {tab.name}
                    </Button>
                </div>
            ))}
        </div>
    );
}