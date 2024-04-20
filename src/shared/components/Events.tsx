import Card, { CardProps } from './Card';
import bg from '../../assets/backgroundHome.webp';

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
                <div className="absolute inset-0 w-full z-0"
                    style={{
                        background: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        filter: 'brightness(230%) contrast(230%) grayscale(200%) saturate(200%)',
                        opacity: 0.05,
                    }}
                >
                </div>
            )}
        </div>
    );
};

export default Events;