import { z } from "zod";

export const createTaskSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    description: z.string().optional(),
    selectedStatus: z.string().min(1, { message: "El estado es obligatorio" }),
    selectedUser: z
        .string()
        .min(1, { message: "El usuario asignado es obligatorio" }),
});
