import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RouteLoader from "./components/RouteLoader";
import Homepage from "./sections/homepage.jsx";

// The landing page is the entry point, so it stays in the main bundle. The auth
// and dashboard screens (plus their stylesheets) are only downloaded when you
// actually navigate to them, which keeps the first load on phones smaller.
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
