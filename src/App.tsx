import { Route, Routes, Navigate } from "react-router";
import Kanban from "./pages/Kanban";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/kanban"
                element={
                    <ProtectedRoute>
                        <Kanban />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
