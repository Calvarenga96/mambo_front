import CreateTaskForm from "../CreateTaskForm";
import { Box, Button, VStack } from "@chakra-ui/react";
import Dialog from "../Dialog";
import TasksTable from "../TasksTable";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

const KanbanBoard = () => {
    const {
        fetchTasks,
        fetchTaskStatusesList,
        handleSubmit,
        isLoading,
        handleCancel,
        openDialog,
        setOpenDialog,
    } = useAppContext();

    useEffect(() => {
        fetchTasks();
        fetchTaskStatusesList();
    }, []);

    return (
        <VStack align="stretch" p={4}>
            <Box display="flex" w="100%" justifyContent="flex-end">
                <Dialog
                    trigger={
                        <Button onClick={() => setOpenDialog(true)}>
                            Crear Tarea
                        </Button>
                    }
                    title="Crear Nueva Tarea"
                    body={<CreateTaskForm />}
                    closeText="Cancelar"
                    okText="Guardar"
                    onOk={handleSubmit}
                    onCancel={handleCancel}
                    loading={isLoading}
                    open={openDialog}
                />
            </Box>

            <TasksTable />
        </VStack>
    );
};

export default KanbanBoard;
