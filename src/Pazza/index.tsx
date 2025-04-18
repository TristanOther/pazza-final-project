import PazzaNavigation from "./PazzaNavigation.tsx";
import ManageClass from "./ManageClass/ManageClassScreen.tsx";
import Statistics from "./Statistics.tsx";
import Resources from "./Resources.tsx";
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
        const fetchTags = async() => {
            dispatch(setTags(await TagsClient.fetchTags(cid as string)));
        }
        fetchTags();
    }, [cid, dispatch]);
    
    return (
        <div id="wd-pazza-q-and-a">
            <div className="mx-3 my-3">
                <div style={{ width: "100%" }}>
                    <PazzaNavigation />
                </div>
                <Routes>
                    <Route path="/*" element={<Posts />} />
                    <Route path="/Manage" element={
                        <PazzaProtectedRoute>
                            <ManageClass />
                        </PazzaProtectedRoute>} />
                    <Route path="Statistics" element={<Statistics />} />
                    <Route path="Resources" element={<Resources />} />
                </Routes>
            </div>
        </div>
    );
}