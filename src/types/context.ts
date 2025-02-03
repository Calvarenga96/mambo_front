import {
    Dispatch,
    FormEvent,
    MutableRefObject,
    ReactNode,
    SetStateAction,
} from "react";
import { Task, TaskStatus, User } from "./api";

export interface ChildrenPropType {
    children: ReactNode;
}

export interface ContextInitialState {
    taskStatusesList: TaskStatus[];
    usersList: User[];
    tasksList: Task[];
    fetchTaskStatusesList: () => Promise<void>;
    fetchUsersList: () => Promise<void>;
    fetchTasks: () => Promise<void>;
    setTasksList: Dispatch<SetStateAction<Task[]>>;
    handleSubmit: (e: FormEvent) => Promise<void>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    selectedStatus: string;
    setSelectedStatus: Dispatch<SetStateAction<string>>;
    selectedUser: string;
    setSelectedUser: Dispatch<SetStateAction<string>>;
    dialogRef: MutableRefObject<HTMLDivElement | null>;
    resetValues: () => void;
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    handleCancel: () => void;
    errors: {
        name?: string;
        description?: string;
        selectedStatus?: string;
        selectedUser?: string;
    };
}
