import CreateTaskForm from "../CreateTaskForm";
import { Box, Button, Container, Loader, Text, VStack } from "@chakra-ui/react";
import Dialog from "../Dialog";
import TasksTable from "../TasksTable";
import { useAppContext } from "@/context/AppContext";
import LogoutButton from "../LogoutButton";
import { useAuth } from "@/context/AuthContext";

const KanbanBoard = () => {
    const {
        handleSubmit,
        isLoading,
        handleCancel,
        openDialog,
        setOpenDialog,
        taskStatusesList,
    } = useAppContext();

    const { user } = useAuth();

    const userName = user.name.split(" ")[0];

    return (
        <Container>
            <VStack align="stretch" p={4}>
                <Box w="100%" display="flex" justifyContent="center">
                    <Text>¡Hola {userName} ;)!</Text>
                </Box>

                <Box display="flex" w="100%" justifyContent="space-between">
                    <LogoutButton />

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

                {taskStatusesList.length ? (
                    <TasksTable />
                ) : (
                    <Box w="100%" minHeight="500px">
                        <Loader />
                    </Box>
                )}
            </VStack>
        </Container>
    );
};

export default KanbanBoard;
