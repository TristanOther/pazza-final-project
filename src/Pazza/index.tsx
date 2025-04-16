import PazzaNavigation from "./PazzaNavigation.tsx";
import ManageClass from "./ManageClass/ManageClassScreen.tsx";
import Statistics from "./Statistics.tsx";
import Resources from "./Resources.tsx";
import { Provider } from "react-redux";
import PazzaProtectedRoute from "./PazzaProtectedRoute.tsx";
import { Route, Routes } from "react-router-dom";
import Posts from "./PostScreen/Posts.tsx";
import store from "./store.ts";

export default function Modules() {
    return (
        <Provider store={store}>
            <div id="wd-pazza-q-and-a">
                <div className="mx-3 my-3">
                    <div style={{ width: "100%" }}>
                        <PazzaNavigation />
                    </div>
                    <Routes>
                        <Route path="/*" element={<Posts />} />
                        <Route path="/QnA" element={<Posts />} />
                        <Route path="/Manage" element={
                            <PazzaProtectedRoute>
                                <ManageClass />
                            </PazzaProtectedRoute>} />
                        <Route path="Statistics" element={<Statistics />} />
                        <Route path="Resources" element={<Resources />} />
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}