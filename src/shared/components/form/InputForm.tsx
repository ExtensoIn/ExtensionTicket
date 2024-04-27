import ControlledInput from './ControlledInput';
import { Input } from '@nextui-org/react';
import MediForm from "./MediaForm.tsx";

type InputFormProps = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'media';
    required?: string;
    max?: { value: number; message: string };
    min?: { value: number; message: string };
};

function InputForm({ name, label, type, required, max, min }: InputFormProps) {
    return (
        <ControlledInput name={name} required={required} max={max} min={min}>
            {({ onChange, value }) =>
                type === 'media' ? (
                    <MediForm onChange={onChange} name={name} label={label}/>
                ) : (
                    <Input
                        aria-label={`Input ${name}`}
                        value={value}
                        classNames={{
                            label: 'z-0',
                        }}
                        label={label}
                        type={type}
                        onValueChange={(value) => {
                            if (type === 'number') {
                                onChange(parseFloat(value));
                            } else {
                                onChange(value);
                            }
                        }}
                    />
                )
            }
        </ControlledInput>
    );
}

export default InputForm;
