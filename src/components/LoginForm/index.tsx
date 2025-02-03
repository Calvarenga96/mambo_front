import { useLogin } from "@/hooks/useLogin";
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";

const LoginForm = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleFormSubmit,
        loading,
        errors,
    } = useLogin();

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="gray.100"
        >
            <Box
                bg="white"
                p={8}
                rounded="lg"
                shadow="lg"
                w={{ base: "90%", md: "400px" }}
            >
                <Heading textAlign="center" size="lg" mb={4}>
                    Iniciar Sesión
                </Heading>

                <VStack as="form" width="full" gap={4}>
                    <Box width="full">
                        <Text>Email</Text>
                        <Input
                            type="email"
                            placeholder="Ingresa tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <Text color="red">{errors.email}</Text>
                        )}
                    </Box>

                    <Box width="full">
                        <Text>Contraseña</Text>
                        <Input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <Text color="red">{errors.password}</Text>
                        )}
                    </Box>

                    <Box width="full">
                        <Button
                            colorScheme="blue"
                            w="full"
                            onClick={handleFormSubmit}
                            loading={loading}
                        >
                            Ingresar
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </Box>
    );
};

export default LoginForm;
