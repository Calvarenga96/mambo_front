import { createTask, getTasks, getTaskStatuses, getUsers } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { createTaskSchema } from "@/schemas/createTaskSchema";
import { Task, TaskStatus, User } from "@/types/api";
import { ChildrenPropType, ContextInitialState } from "@/types/context";
import {
    createContext,
    FormEvent,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";

const AppContext = createContext<ContextInitialState | null>(null);

export const AppProvider = ({ children }: ChildrenPropType) => {
    const [taskStatusesList, setTaskStatusesList] = useState<TaskStatus[]>([]);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [tasksList, setTasksList] = useState<Task[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        description?: string;
        selectedStatus?: string;
        selectedUser?: string;
    }>({});

    const dialogRef = useRef<HTMLDivElement | null>(null);

    const resetValues = () => {
        setName("");
        setDescription("");
        setSelectedStatus("");
        setSelectedUser("");
    };

    const validateForm = () => {
        const result = createTaskSchema.safeParse({
            name,
            description,
            selectedStatus,
            selectedUser,
        });

        if (!result.success) {
            const newErrors: { [key: string]: string } = {};
            result.error.errors.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                await createTask({
                    name,
                    description,
                    statusId: parseInt(selectedStatus),
                    userId: parseInt(selectedUser),
                });
                toaster.create({
                    title: "Tarea creada",
                    description: "La tarea se ha añadido correctamente.",
                    type: "success",
                    duration: 3000,
                });
                resetValues();
                fetchTasks();
            } catch (error: any) {
                toaster.create({
                    title: "Error",
                    description: error.message || "No se pudo crear la tarea.",
                    type: "error",
                    duration: 3000,
                });
            } finally {
                setIsLoading(false);
                setOpenDialog(false);
            }
        }
    };

    const fetchTaskStatusesList = useCallback(async () => {
        try {
            const data = await getTaskStatuses();
            setTaskStatusesList(data);
        } catch (error: any) {
            toaster.create({
                title: "Error",
                description:
                    error.message || "Error al obtener estados de tareas",
                type: "error",
                duration: 3000,
            });
        }
    }, []);

    const fetchUsersList = useCallback(async () => {
        try {
            const data = await getUsers();
            setUsersList(data);
        } catch (error: any) {
            toaster.create({
                title: "Error",
                description:
                    error.message || "Error al obtener la lista de usuarios",
                type: "error",
                duration: 3000,
            });
        }
    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            const data = await getTasks();
            setTasksList(data);
        } catch (error: any) {
            toaster.create({
                title: "Error",
                description: error.message || "Error al obtener las tareas",
                type: "error",
                duration: 3000,
            });
        }
    }, []);

    const handleCancel = () => {
        setOpenDialog(false);
        setErrors({});
        resetValues();
    };

    return (
        <AppContext.Provider
            value={{
                taskStatusesList,
                fetchTaskStatusesList,
                usersList,
                fetchUsersList,
                tasksList,
                fetchTasks,
                setTasksList,
                handleSubmit,
                name,
                setName,
                description,
                setDescription,
                selectedStatus,
                setSelectedStatus,
                selectedUser,
                setSelectedUser,
                isLoading,
                dialogRef,
                resetValues,
                openDialog,
                setOpenDialog,
                handleCancel,
                errors,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            "useAppContext debe estar dentro del proveedor AppProvider",
        );
    }
    return context;
};
