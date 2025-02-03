import { useAppContext } from "@/context/AppContext";
import { useTasks } from "@/hooks/useTasks";
import { TaskProps } from "@/types/tasks";
import { Box, Text, Button, VStack, HStack, Badge } from "@chakra-ui/react";

const Task = ({ id, name, description, statusId }: TaskProps) => {
    const { taskStatusesList } = useAppContext();
    const {
        getStatusName,
        handleStatusChange,
        handleDeleteTask,
        deletingTask,
    } = useTasks();
    const status = getStatusName(statusId);

    const statusColors: { [key: string]: string } = {
        Pendiente: "red",
        "En Proceso": "green",
        Finalizado: "purple",
    };

    return (
        <Box
            p={4}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ boxShadow: "lg" }}
            transition="box-shadow 0.2s ease-in-out"
        >
            <VStack align="start">
                <Box display="flex" justifyContent="space-between" w="100%">
                    <Box>
                        <Text fontSize="lg" fontWeight="bold">
                            {name}
                        </Text>

                        <Badge
                            colorPalette={statusColors[status]}
                            variant="solid"
                        >
                            {status}
                        </Badge>
                    </Box>

                    <Button
                        size="xs"
                        color="red"
                        variant="subtle"
                        loading={deletingTask}
                        onClick={() => handleDeleteTask({ taskId: id })}
                    >
                        Eliminar
                    </Button>
                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    mt={1}
                >
                    <Text fontWeight="bold">Descripción:</Text>
                    <Text>{description || "-"}</Text>
                </Box>

                <Box mt={1}>
                    <Text>Cambiar estado a:</Text>

                    <HStack>
                        <>
                            {taskStatusesList.map((status) => (
                                <>
                                    {status.id !== statusId && (
                                        <Button
                                            key={status?.id}
                                            color={
                                                statusColors[status.description]
                                            }
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleStatusChange({
                                                    taskId: id,
                                                    statusId: status?.id,
                                                })
                                            }
                                        >
                                            {status?.description}
                                        </Button>
                                    )}
                                </>
                            ))}
                        </>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default Task;
