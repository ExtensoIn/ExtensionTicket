import { Select, SelectItem } from "@nextui-org/react"
import ControlledInput from "./ControlledInput";

type SelectFormProps = {
    name: string;
    label?: string;
    items: { label: string, value: string }[]
}

function SelectForm({ name, label, items }: SelectFormProps) {
    return (
        <ControlledInput name={name}>
            {({ onChange, value }) => (
                <Select selectionMode="multiple" label={label} items={items} selectedKeys={value} onSelectionChange={onChange}>
                    {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                </Select>
            )}
        </ControlledInput>
    )
}

export default SelectForm
