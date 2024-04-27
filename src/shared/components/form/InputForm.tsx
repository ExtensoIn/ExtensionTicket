import { Input } from "@nextui-org/react";
import ControlledInput from "./ControlledInput";

type InputFormProps = {
    name: string;
    label: string;
    type: 'text' | 'number';
    required?: string;
    max?: { value: number, message: string };
    min?: { value: number, message: string };
}

function InputForm({ name, label, type, required, max, min }: InputFormProps) {
    return (
        <ControlledInput name={name} required={required} max={max} min={min}>
            {({ onChange, value }) => <Input value={value} classNames={{
                label: 'z-0'
            }} label={label} type={type} onValueChange={(value: any) => {
                if (type === 'number') {
                    onChange(parseFloat(value))
                }
                else {
                    onChange(value)
                }
            }} />}
        </ControlledInput>
    )
}

export default InputForm
