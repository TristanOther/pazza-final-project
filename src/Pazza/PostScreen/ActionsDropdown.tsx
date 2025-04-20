import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function ActionsDropdown({ object, deleteObject, setEditing }: { 
    object: any,
    deleteObject: (oid: string) => void,
    setEditing: (editing: boolean) => void,
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <div>
            {(object.createdBy === currentUser._id || ["ADMIN", "FACULTY", "TA"].includes(currentUser.role)) && (
                <div ref={dropdownRef} className="position-relative">
                    <div
                        className="pazza-blue-text me-1"
                        onClick={() => setShowDropdown(prev => !prev)}
                    >
                        Actions {showDropdown ? "▴" : "▾"}
                    </div>
                    {showDropdown && (
                        <div
                            className="position-absolute pazza-white-background border shadow-sm"
                            style={{ right: 0, top: '100%', zIndex: 1000 }}
                        >
                            <div 
                                className="px-2 py-1 border-bottom" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </div>
                            <div 
                                className="px-2 py-1 text-danger"
                                style={{ cursor: 'pointer' }}
                                onClick={() => deleteObject(object._id)}
                            >
                                Delete
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};