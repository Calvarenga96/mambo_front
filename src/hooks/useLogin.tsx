import { getCsrfCookie, login } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/schemas/loginSchema";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {},
    );
    const { fetchUser } = useAuth();
    const navigate = useNavigate();
    const OK_HTTP_STATUS = 200;

    const validateForm = () => {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const newErrors: { email?: string; password?: string } = {};
            result.error.errors.forEach((err) => {
                if (err.path[0] === "email") {
                    newErrors.email = err.message;
                } else if (err.path[0] === "password") {
                    newErrors.password = err.message;
                }
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleFormSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            validateForm();
            await getCsrfCookie();
            const response = await login({ email, password });
            if (response?.status === OK_HTTP_STATUS) {
                await fetchUser();
                navigate("/kanban");
            }
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

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleFormSubmit,
        loading,
        errors,
    };
};
