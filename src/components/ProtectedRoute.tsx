import { ChildrenPropType } from "@/types/context";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: ChildrenPropType) => {
    const isAuthenticated = true;

    // console.log(document.cookie);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
