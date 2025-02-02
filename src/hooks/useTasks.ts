import { deleteTask, updateTask } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { useAppContext } from "@/context/AppContext";
import { Task } from "@/types/api";
import { useState } from "react";

export const useTasks = () => {
    const [deletingTask, setDeletingTask] = useState(false);
    const { taskStatusesList, setTasksList, fetchTasks } = useAppContext();

    const getStatusName = (statusId: number): Task["description"] =>
        taskStatusesList.find((status) => status.id === statusId)
            ?.description || "";

    const handleStatusChange = async ({
        taskId,
        statusId,
    }: {
        taskId: number;
        statusId: number;
    }) => {
        try {
            const updatedTask = await updateTask({ taskId, statusId });
            setTasksList((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId
                        ? { ...task, status: updatedTask.status }
                        : task,
                ),
            );
            fetchTasks();
        } catch (error: any) {
            toaster.create({
                title: "Error al actualizar tarea",
                description: error.message,
                type: "error",
                duration: 3000,
            });
        }
    };

    const handleDeleteTask = async ({ taskId }: { taskId: number }) => {
        try {
            setDeletingTask(true);
            await deleteTask({ taskId });
            setTasksList((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId),
            );
            toaster.create({
                title: "Tarea eliminada",
                description: "La tarea ha sido eliminada correctamente",
                type: "success",
                duration: 3000,
            });
        } catch (error: any) {
            toaster.create({
                title: "Error al eliminar tarea",
                description: error.message,
                type: "error",
                duration: 3000,
            });
        } finally {
            setDeletingTask(false);
        }
    };

    return {
        getStatusName,
        handleStatusChange,
        handleDeleteTask,
        deletingTask,
    };
};
