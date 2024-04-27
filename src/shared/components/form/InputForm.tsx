import { useState } from 'react';
import ControlledInput from './ControlledInput';
import { Input, Image } from '@nextui-org/react';

type InputFormProps = {
    name: string;
    label: string;
    type: 'text' | 'number' | 'media';
    required?: string;
    max?: { value: number; message: string };
    min?: { value: number; message: string };
};

function InputForm({ name, label, type, required, max, min }: InputFormProps) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    return (
        <ControlledInput name={name} required={required} max={max} min={min}>
            {({ onChange, value }) =>
                type === 'media' ? (
                    <>
                        <label htmlFor={name} className="cursor-pointer">
                            <p className="text-sm text-gray-500 mb-2">{label}</p>
                            <Image
                                src={uploadedImage || 'https://via.placeholder.com/1000x600'}
                                alt={label}
                                className="rounded-lg w-96 h-96 object-cover"
                            />
                            <input
                                id={name}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const imageDataUrl = event.target?.result as string;
                                            setUploadedImage(imageDataUrl);
                                            onChange(imageDataUrl);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </>
                ) : (
                    <Input
                        value={value}
                        classNames={{
                            label: 'z-0',
                        }}
                        label={label}
                        type={type}
                        onValueChange={(value: any) => {
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
