import ControlledInput from './ControlledInput'
import { DateRangePicker } from "@nextui-org/react";

type DateRangeFormProps = {
    name: string;
    label?: string;
}

function DateRangeForm({ name, label }: DateRangeFormProps) {
    return (
        <ControlledInput name={name}>
            {({ onChange, value }) => (
                <span className='flex flex-col gap-2'>
                    <label className='text-base' htmlFor={name}>{label}</label>
                    <DateRangePicker
                        value={value}
                        onChange={onChange}
                        aria-label={`Date Range Input ${name}`}
                    />
                </span>
            )}
        </ControlledInput>
    )
}

export default DateRangeForm
