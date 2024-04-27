import {Image} from "@nextui-org/react";
import {useState} from "react";

type ErrorMsgProps = {
    onChange: (imageSrc: string) => void;
    name: string;
    label: string;
};

export default function MediForm(props: ErrorMsgProps) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    return (
        <label htmlFor={props.name} className="cursor-pointer">
            <p className="text-sm text-gray-500 mb-2">{props.label}</p>
            <Image
                src={uploadedImage || 'https://via.placeholder.com/1000x600'}
                alt={props.label}
                className="rounded-lg w-96 h-96 object-cover"
            />
            <input
                id={props.name}
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
                            props.onChange(imageDataUrl);
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />
        </label>
    );
}