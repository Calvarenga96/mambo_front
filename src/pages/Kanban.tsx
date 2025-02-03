import KanbanBoard from "@/components/KanbanBoard";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/AppContext";
import { Box, Container, Heading } from "@chakra-ui/react";

export default function Kanban() {
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
