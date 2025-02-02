import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Task from "../Task";
import { useAppContext } from "@/context/AppContext";

const TasksTable = () => {
    const { tasksList, taskStatusesList } = useAppContext();

    return (
        <SimpleGrid
            as="form"
            columns={[1, 1, 1, 1, taskStatusesList.length]}
            gap={3}
        >
            {taskStatusesList.map((status) => (
                <Box
                    key={status?.id}
                    display="flex"
                    justifySelf="center"
                    alignItems={{ base: "center" }}
                    flexDirection="column"
                    minW="100%"
                    minH="600px"
                    border="1px solid"
                    borderRadius={5}
                    p={4}
                >
                    <Heading
                        as="h2"
                        size="md"
                        mb={5}
                        display="flex"
                        justifyContent="center"
                        w="100%"
                        borderBottom="1px solid"
                    >
                        {status?.description}
                    </Heading>

                    <Box display="flex" flexDir="column" gap={3} w="100%">
                        {tasksList
                            .filter((task) => task?.status_id === status?.id)
                            .map((task) => (
                                <Task
                                    key={task?.id}
                                    id={task?.id}
                                    name={task?.name}
                                    description={task?.description}
                                    statusId={task?.status_id}
                                />
                            ))}
                    </Box>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default TasksTable;
