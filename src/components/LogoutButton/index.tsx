import { useLogout } from "@/hooks/useLogout";
import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
    const { handleLogout, closingSession } = useLogout();

    return (
        <Button
            variant="subtle"
            color="red"
            onClick={handleLogout}
            loading={closingSession}
        >
            Cerrar Sesión
        </Button>
    );
};

export default LogoutButton;
