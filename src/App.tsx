import { Route, Routes, Navigate } from "react-router";
import Kanban from "./pages/Kanban";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}

export default App;
