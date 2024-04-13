import React, { useState } from 'react';
import bg from '../../assets/05967bb9-231d-4794-be70-d1ad6f18196b.webp';

interface ImageLinearProps {
    img?: string;
    height?: string; // Add a prop for height
    children?: React.ReactNode;
}

const ImageLinear = (props: ImageLinearProps) => {
    const [loaded, setLoaded] = useState(false);

    const containerStyle = {
        height: props.height || '100vh',
    };

    return (
        <div className="relative w-full" style={containerStyle}>
            <div
                className="
                absolute inset-0 bg-pink-500 bg-gradient-to-r from-pink-500 
                to-purple-800 md:opacity-90 opacity-80"
            ></div>
            <img
                src={loaded ? (props.img || bg) : bg}
                alt="bg"
                className="absolute h-full w-full object-cover -z-10"
                onLoad={() => setLoaded(true)}
            />
            <div className="flex items-center justify-center text-white font-bold text-2xl opacity-80">
                {props.children}
            </div>
        </div>
    );
};

export default ImageLinear;
