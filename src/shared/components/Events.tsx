import Card, { CardProps } from './Card';
import bg from '../../assets/home/backgroundHome.webp';
import { Input } from '@nextui-org/react';

interface EventsProps {
    title: string;
    events: CardProps[];
    showImage: boolean;
}

const styles = {
    label: 'text-white focus:text-white',
    input: 'bg-transparent text-white fill-white',
    inputWrapper: 'border-slate-500 hover:border-slate-600 focus:border-white',
}

const Events = ({ title, events, showImage }: EventsProps) => {
    return (
        <div className='relative af'>
            <div className='bg-transparent w-full top-[-3.75rem] flex absolute z-20 items-center justify-center px-10 md:px-20 lg:px-40'>
                <div className='bg-blue-950 w-full z-10 rounded-2xl flex gap-8 justify-center p-6 pt-3 xs:p-10 xs:pt-6'>
                    <Input className='dark' classNames={styles} variant='underlined' label="Search Event" />
                    <Input className='dark' classNames={styles} variant='underlined' label="Place" />
                    <Input className='dark' classNames={styles} variant='underlined' label="Date" />
                </div>
            </div>
            <section className='flex flex-col items-center justify-center bg-gray-100 px-10 py-20 md:px-20 lg:px-40 md:py-28'>
                <h1 className='text-4xl font-light font-AbrilFatface text-left w-full text-blue-950'>{title}</h1>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-12 w-full z-10'>
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