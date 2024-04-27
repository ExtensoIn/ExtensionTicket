import { TimeInput } from "@nextui-org/react";
import ControlledInput from "./ControlledInput";

type TimeFormProps = {
    name: string;
    label?: string;
}

function TimeForm({ name, label }: TimeFormProps) {
    return (
        <ControlledInput name={name}>
            {({ onChange, value }) => (
                <span className='flex flex-col gap-2'>
                    <label className='text-base' htmlFor={name}>{label}</label>
                    <TimeInput
                        value={value}
                        onChange={onChange}
                        aria-label={`Time Input ${name}`}
                    />
                </span>
            )}
        </ControlledInput>
    )
}

export default TimeForm
