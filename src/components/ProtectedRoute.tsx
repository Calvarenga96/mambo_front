import { useAuth } from "@/context/AuthContext";
import { ChildrenPropType } from "@/types/context";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: ChildrenPropType) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
