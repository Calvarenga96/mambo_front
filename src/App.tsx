import { Box, Container, Heading } from "@chakra-ui/react";
import KanbanBoard from "./components/KanbanBoard";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "./components/ui/toaster";

function App() {
    return (
        <Container>
            <Box display="flex" justifyContent="center" py={4}>
                <Heading>Mambo Kanban</Heading>
            </Box>

            <AppProvider>
                <KanbanBoard />
            </AppProvider>

            <Toaster />
        </Container>
    );
}

export default App;
