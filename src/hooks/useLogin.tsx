import { getCsrfCookie, login } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const OK_HTTP_STATUS = 200;

    const handleLogin = async () => {
        try {
            setLoading(true);
            await getCsrfCookie();
            const response = await login({ email, password });
            if (response?.status === OK_HTTP_STATUS) navigate("/kanban");
        } catch (error: any) {
            toaster.create({
                title: "Error",
                description: error.message || "No se pudo iniciar sesión",
                type: "error",
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, handleLogin, loading };
};
