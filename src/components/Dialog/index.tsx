import { Button } from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@/types/dialog";
import { useAppContext } from "@/context/AppContext";

const Dialog = ({
    trigger,
    title,
    body,
    closeText = "Cancelar",
    okText = "Aceptar",
    onCancel,
    onOk,
    loading,
    open,
}: DialogProps) => {
    const { dialogRef } = useAppContext();

    return (
        <DialogRoot
            placement="center"
            motionPreset="slide-in-bottom"
            open={open}
        >
            <DialogBackdrop />
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent ref={dialogRef}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <DialogBody>{body}</DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" onClick={onCancel}>
                            {closeText}
                        </Button>
                    </DialogActionTrigger>

                    <Button onClick={onOk} loading={loading}>
                        {okText}
                    </Button>
                </DialogFooter>

                <DialogCloseTrigger onClick={onCancel} />
            </DialogContent>
        </DialogRoot>
    );
};

export default Dialog;
