import { MouseEvent, ReactNode } from "react";

export interface DialogProps {
    trigger: ReactNode;
    title: string;
    body: ReactNode;
    closeText?: string;
    okText?: string;
    onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
    onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    open?: boolean;
}
