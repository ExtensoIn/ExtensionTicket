import Card, { CardProps } from './Card';
import bg from '../../assets/05967bb9-231d-4794-be70-d1ad6f18196b.webp';

interface EventsProps {
    title: string;
    events: CardProps[];
    showImage: boolean;
}

const Events = ({ title, events, showImage }: EventsProps) => {
    return (
        <div className='relative'>
            <section className='flex flex-col items-center justify-center bg-gray-100 p-20 md:p-40'>
                <h1 className='text-4xl font-light font-AbrilFatface text-left w-full text-blue-950'>{title}</h1>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-20 w-full z-10'>
                    {events.map((event, index) => (
                        <Card key={index} {...event} />
                    ))}
                </div>
            </section>
            {showImage && (
                <div className="absolute inset-0 w-full overflow-hidden z-0">
                    <img
                        src={bg}
                        alt="Your Image"
                        className="w-full h-auto sepia opacity-5 brightness-200 contrast-200 grayscale saturate-200"
                    />
                </div>
            )}
        </div>
    );
};

export default Events;
