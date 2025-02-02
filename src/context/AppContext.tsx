import { createTask, getTasks, getTaskStatuses, getUsers } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { Task, TaskStatus, User } from "@/types/api";
import { AppProviderProps, ContextInitialState } from "@/types/context";
import {
    createContext,
    FormEvent,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";

const AppContext = createContext<ContextInitialState | null>(null);

export const AppProvider = ({ children }: AppProviderProps) => {
    const [taskStatusesList, setTaskStatusesList] = useState<TaskStatus[]>([]);
    const [usersList, setUsersList] = useState<User[]>([]);
    const [tasksList, setTasksList] = useState<Task[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const dialogRef = useRef<HTMLDivElement | null>(null);

    const resetValues = () => {
        setName("");
        setDescription("");
        setSelectedStatus("");
        setSelectedUser("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
        } catch (error) {
            toaster.create({
                title: "Error",
                description: "No se pudo crear la tarea.",
                type: "error",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
            setOpenDialog(false);
        }
    };

    const fetchTaskStatusesList = useCallback(async () => {
        try {
            const data = await getTaskStatuses();
            setTaskStatusesList(data);
        } catch (error) {
            console.error("Error al obtener estados de tareas:", error);
        }
    }, []);

    const fetchUsersList = useCallback(async () => {
        try {
            const data = await getUsers();
            setUsersList(data);
        } catch (error) {
            console.error("Error al obtener estados de tareas:", error);
        }
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasksList(data);
        } catch (error) {
            console.error("Error al obtener tareas:", error);
        }
    };

    const handleCancel = () => {
        setOpenDialog(false);
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
