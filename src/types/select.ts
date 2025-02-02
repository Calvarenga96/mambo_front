import { SelectValueChangeDetails } from "@chakra-ui/react";

type SelectOption = {
    label: string;
    value: string | number;
};

export type SelectProps = {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    value?: string[];
    onChange?: (details: SelectValueChangeDetails) => void;
};
