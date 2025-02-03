import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useLogout = () => {
    const [closingSession, setClosingSession] = useState(false);
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setClosingSession(true);
            await logoutUser();
            navigate("/login");
            toaster.create({
                description: "Sesión cerrada exitosamente.",
                type: "error",
                duration: 3000,
            });
        } catch (error: any) {
            toaster.create({
                title: "Error",
                description:
                    error.message || "Ha habido un error al cerrar sesión.",
                type: "error",
                duration: 3000,
            });
        } finally {
            setClosingSession(false);
        }
    };

    return { handleLogout, closingSession };
};
