import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../../../shared/components/ImageLinear'
import mainPhoto from '../../../assets/home/backgroundHome.webp'
import CustomButton from '../../../shared/components/Button'
import { useEffect, useState } from 'react';

interface EventProps {
  eventId: number;
  title: string;
  description: string;
  eventDate: Date;
  imageUrl?: string;
  backgroundImageUrl?: string;
}


export const Route = createLazyFileRoute('/event/$eventId/')({
  component: (props: EventProps) => {
    props = {
      eventId: 1,
      title: 'Event 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      eventDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    }

    const eventDate = new Date(props.eventDate);
    const [timeLeft, setTimeLeft] = useState<number>(
      Math.floor((eventDate.getTime() - new Date().getTime()) / 1000)
    );

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft === 0) {
            window.location.reload();
          }
          return newTimeLeft;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return (<>
      <ImageLinear height='100vh'>
        <div className='flex flex-col h-full w-full justify-center items-center'>
          <section className='w-full flex flex-wrap gap-7 justify-between items-center px-10 md:px-40'>
            <div className="relative">
              <img src={props.imageUrl || mainPhoto} alt="Extension Ticket main image event" className="max-w-80 md:max-w-96" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t 
                            from-black to-transparent rounded-full shadow-md transform -skew-y-3  z-0
                            translate-x-3 translate-y-7 blur-xl"></div>
            </div>

            <span className='max-w-96 flex flex-col gap-6'>
              <h1 className='text-4xl font-AbhayaLibre font-light'>{props.title}</h1>
              <p className='font-AbhayaLibre text-lg'>{props.description}</p>
              <CustomButton>Get Tickets</CustomButton>
              <div className='flex gap-4 w-full '>
                <div className="flex flex-col items-center">
                  <span className='text-6xl font-AbhayaLibre font-extrabold'>{days}</span>
                  <span className='text-lg font-AbhayaLibre font-semibold'>Days</span>
                </div>
                <span className="text-6xl font-AbhayaLibre font-extrabold">:</span>
                <div className="flex flex-col items-center">
                  <span className='text-6xl font-AbhayaLibre font-extrabold'>{hours}</span>
                  <span className='text-lg font-AbhayaLibre font-semibold'>Hours</span>
                </div>
                <span className="text-6xl font-AbhayaLibre font-extrabold">:</span>
                <div className="flex flex-col items-center">
                  <span className='text-6xl font-AbhayaLibre font-extrabold'>{minutes}</span>
                  <span className='text-lg font-AbhayaLibre font-semibold'>Minutes</span>
                </div>
                <span className="text-6xl font-AbhayaLibre font-extrabold">:</span>
                <div className="flex flex-col items-center">
                  <span className='text-6xl font-AbhayaLibre font-extrabold'>{seconds}</span>
                  <span className='text-lg font-AbhayaLibre font-semibold'>Seconds</span>
                </div>
              </div>
            </span>
          </section>
        </div>
      </ImageLinear>
    </>)
  }
})