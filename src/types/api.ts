export interface TaskPayload {
    name: string;
    description?: string;
    statusId: number;
    userId: number;
    taskId?: number;
}

export type UpdateTaskPayload = Required<Pick<TaskPayload, "taskId">> &
    Partial<TaskPayload>;

export type TaskStatus = {
    id: number;
    description: string;
    name: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
};

export type Task = {
    id: number;
    name: string;
    description: string;
    status_id: number;
    user_id: number;
};
