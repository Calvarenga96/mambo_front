import { createListCollection } from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { SelectProps } from "@/types/select";
import { useAppContext } from "@/context/AppContext";

const Select = ({
    label,
    options,
    placeholder,
    value,
    onChange,
}: SelectProps) => {
    const { dialogRef } = useAppContext();

    const collection = createListCollection({
        items: options,
    });

    return (
        <SelectRoot
            collection={collection}
            size="sm"
            onValueChange={onChange}
            value={value}
        >
            {label && <SelectLabel>{label}</SelectLabel>}

            <SelectTrigger>
                <SelectValueText placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent portalRef={dialogRef}>
                {collection.items.map((item) => (
                    <SelectItem item={item.value} key={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export default Select;
