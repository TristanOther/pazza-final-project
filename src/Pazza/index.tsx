import PazzaNavigation from "./PazzaNavigation.tsx";
import ManageClass from "./ManageClass/ManageClassScreen.tsx";
import PazzaProtectedRoute from "./PazzaProtectedRoute.tsx";
import { Route, Routes, useParams } from "react-router-dom";
import Posts from "./PostScreen/Posts.tsx";
import { useDispatch } from "react-redux";
import { setTags } from "./TagsReducer";

import * as TagsClient from "./TagsClient.ts";
import { useEffect } from "react";

export default function Pazza() {
    const { cid } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await TagsClient.fetchTags(cid ? cid : "");
            dispatch(setTags(tags));
        }
        fetchTags();
    }, [cid, dispatch]);

    return (
        <div id="wd-pazza-q-and-a" style={{ width: "82vw", height: "82vh" }}>
            <div className="mx-3 my-3" style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%" }}>
                    <PazzaNavigation />
                </div>
                <Routes>
                    <Route path="/*" element={<Posts />} />
                    <Route path="/Manage/*" element={
                        <PazzaProtectedRoute>
                            <ManageClass />
                        </PazzaProtectedRoute>} />
                </Routes>
            </div>
        </div>
    );
}