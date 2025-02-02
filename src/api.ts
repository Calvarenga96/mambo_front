import axios from "axios";
import { TaskPayload, TaskStatus, UpdateTaskPayload } from "./types/api";

const API_URL = "http://localhost:8000/api/v1";

const errorHandler = ({ error, message }: { error: any; message: string }) => {
    throw new Error(error.message || message || "Ha ocurrido un error");
};

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
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
        const response = await axios.post(`${API_URL}/tasks`, body);
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
        const response = await axios.put(`${API_URL}/tasks/${taskId}`, body);
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
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudo eliminar la tarea" });
    }
};

export const getTaskStatuses = async (): Promise<TaskStatus[]> => {
    try {
        const response = await axios.get(`${API_URL}/task-statuses`);
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
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        errorHandler({ error, message: "No se pudieron obtener los usuarios" });
    }
};
