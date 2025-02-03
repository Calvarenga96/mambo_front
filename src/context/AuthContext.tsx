import { createContext, useContext, useState } from "react";
import { getUser, logout } from "@/api";

type AuthContextType = {
    user: any;
    isAuthenticated: boolean;
    fetchUser: () => Promise<void>;
    logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const isAuthenticated = !!user;

    const fetchUser = async () => {
        try {
            const userData = await getUser();
            if (userData) setUser(userData);
        } catch (error) {
            setUser(null);
        }
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, fetchUser, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de AuthProvider");
    }
    return context;
};
