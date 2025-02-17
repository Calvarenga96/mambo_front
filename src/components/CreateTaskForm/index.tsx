import { useEffect } from "react";
import { Box, Input, Text, VStack } from "@chakra-ui/react";
import Select from "../Select";
import { useAppContext } from "@/context/AppContext";

const CreateTaskForm = () => {
    const {
        fetchUsersList,
        taskStatusesList,
        usersList,
        name,
        setName,
        description,
        setDescription,
        selectedStatus,
        setSelectedStatus,
        selectedUser,
        setSelectedUser,
        errors,
    } = useAppContext();

    useEffect(() => {
        fetchUsersList();
    }, []);

    return (
        <Box bg="white" p={4} w="full" mb={4}>
            <VStack as="form" align="stretch">
                <Box>
                    <Text>Nombre</Text>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre de la tarea"
                    />
                    {errors.name && <Text color="red">{errors.name}</Text>}
                </Box>

                <Box>
                    <Text>Descripción</Text>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción de la tarea"
                    />
                    {errors.description && (
                        <Text color="red">{errors.description}</Text>
                    )}
                </Box>

                <Box>
                    <Text>Estado</Text>
                    <Select
                        value={[selectedStatus]}
                        onChange={(e) => setSelectedStatus(e.value[0])}
                        options={taskStatusesList.map((status) => ({
                            value: status?.id.toString(),
                            label: status?.description,
                        }))}
                    />
                    {errors.selectedStatus && (
                        <Text color="red">{errors.selectedStatus}</Text>
                    )}
                </Box>

                <Box>
                    <Text>Asignar a</Text>
                    <Select
                        value={[selectedUser]}
                        onChange={(e) => setSelectedUser(e.value[0])}
                        options={usersList.map((user) => ({
                            value: user?.id.toString(),
                            label: user?.name,
                        }))}
                    />
                    {errors.selectedUser && (
                        <Text color="red">{errors.selectedUser}</Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};

export default CreateTaskForm;
