import { Controller, useFormContext } from "react-hook-form"
import ErrorMsg from "./ErrorMessage";
import { ReactNode } from "react";

type ChangeHandler = (...event: any[]) => void

type InputFormProps = {
    name: string;
    required?: string;
    max?: { value: number, message: string };
    min?: { value: number, message: string };
    children: (props: { onChange: ChangeHandler, value: any }) => ReactNode;
}

function ControlledInput({ name, children, required = "The field is required", min, max }: InputFormProps) {
    const { control, formState, } = useFormContext();
    const validate = {
        min,
        max,
        required,
    }
    return (
        <Controller name={name} control={control} rules={validate} render={({ field: { onChange, value } }) => {
            return (
                <div className="w-full flex flex-col gap-2">
                    {children({ onChange, value })}
                    <ErrorMsg error={formState.errors[name]?.message as string} />
                </div>
            )

        }} />
    )
}

export default ControlledInput