import axios from "axios";
import { TaskPayload, TaskStatus, UpdateTaskPayload } from "./types/api";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8000/api/v1";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const axiosConfig = {
    headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
};

const errorHandler = ({ error, message }: { error: any; message: string }) => {
    throw new Error(error.message || message || "Ha ocurrido un error");
};

export const getCsrfCookie = async () => {
    try {
        return await axios.get(
            "http://localhost:8000/sanctum/csrf-cookie",
            axiosConfig,
        );
    } catch (error) {
        errorHandler({ error, message: "No se pudo obtener la cookie CSRF" });
    }
};

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const body = { email, password };
        return await axios.post(`${API_URL}/login`, body, axiosConfig);
    } catch (error) {
        errorHandler({ error, message: "No se pudo iniciar sesión" });
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, axiosConfig);
        Cookies.remove("XSRF-TOKEN");
        Cookies.remove("laravel_session");
        return response;
    } catch (error) {
        errorHandler({ error, message: "No se pudo cerrar sesión" });
    }
};

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, axiosConfig);
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudieron obtener las tareas" });
    }
};

export const createTask = async ({
    name,
    description,
    statusId,
    userId,
}: TaskPayload) => {
    try {
        const body = {
            name,
            description,
            status_id: statusId,
            user_id: userId,
        };
        const response = await axios.post(
            `${API_URL}/tasks`,
            body,
            axiosConfig,
        );
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudo crear la tarea" });
    }
};

export const updateTask = async ({
    name,
    description,
    statusId,
    userId,
    taskId,
}: UpdateTaskPayload) => {
    try {
        const body = {
            name,
            description,
            status_id: statusId,
            user_id: userId,
        };
        const response = await axios.put(
            `${API_URL}/tasks/${taskId}`,
            body,
            axiosConfig,
        );
        return response.data;
    } catch (error) {
        errorHandler({
            error,
            message: "No se pudo actualizar el estado de la tarea",
        });
    }
};

export const deleteTask = async ({ taskId }: { taskId: number }) => {
    try {
        const response = await axios.delete(
            `${API_URL}/tasks/${taskId}`,
            axiosConfig,
        );
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudo eliminar la tarea" });
    }
};

export const getTaskStatuses = async (): Promise<TaskStatus[]> => {
    try {
        const response = await axios.get(
            `${API_URL}/task-statuses`,
            axiosConfig,
        );
        return response.data;
    } catch (error) {
        errorHandler({
            error,
            message: "No se pudieron obtener los estados de tarea",
        });
        return [];
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, axiosConfig);
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudieron obtener los usuarios" });
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, axiosConfig);
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudieron obtener el usuario" });
    }
};
