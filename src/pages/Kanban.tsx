import KanbanBoard from "@/components/KanbanBoard";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/AppContext";
import { Box, Heading } from "@chakra-ui/react";

export default function Kanban() {
    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                py={4}
                borderBottom="1px solid"
                width="100%"
            >
                <Heading>Mambo Kanban</Heading>
            </Box>

            <AppProvider>
                <KanbanBoard />
            </AppProvider>

            <Toaster />
        </Box>
    );
}
