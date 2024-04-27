import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../../../shared/components/ImageLinear'
import defaultEvent from '../../../assets/events/defaultEvent.jpg'
import defaultSpeaker from '../../../assets/events/dafaultSpeaker.png'
import CustomButton from '../../../shared/components/Button'
import { useEffect, useState } from 'react';
import PageBanner from '../../../shared/components/layout/PageBanner';
import CountDown from '../../../shared/components/CountDown';
import { IconoirProvider, MapPin } from 'iconoir-react';

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

    return (<div className='flex flex-col'>
      <ImageLinear height='100vh'>
        <PageBanner imgSrc={props.imageUrl} title={props.title} description={props.description} imgMaxWidth='large'>
          <span className='w-full flex flex-col gap-4'>
            <CustomButton>Get Tickets</CustomButton>
            <CountDown days={days} hours={hours} minutes={minutes} seconds={seconds} />
          </span>
        </PageBanner>
      </ImageLinear>
      <AboutEvent description={props.description} days={days} speakers={0} location='42 Drive, Florida, USA' />
      <SpeakersSection speakers={[
        { nombre: 'Speaker 1', cargo: 'CEO' },
        { nombre: 'Speaker 2', cargo: 'CTO' },
        { nombre: 'Speaker 3', cargo: 'CFO' },
      ]} />
      {/* TODO Add the upcoming events section here */}
    </div>)
  }
})

type AboutEventProps = {
  description: string;
  location?: string;
  speakers?: number;
  days: number;
}

function AboutEvent({ description, location, speakers, days }: AboutEventProps) {
  return (
    <section className='text-blue-950 p-4 smd:p-16 md:p-8'>
      <PageBanner imgSrc={defaultEvent} title='About the Event' description={description} imgMaxWidth='normal'>
        {location && <span className='flex gap-2 justify-center items-center smd:justify-start'>
          <IconoirProvider>
            <MapPin className='hidden md:block' />
          </IconoirProvider>
          <h4 className='font-bold text-xl'>{location}</h4>
        </span>}
        <span className='flex gap-8 justify-center smd:justify-start'>
          <Square title={`${speakers}`} description={speakers ? `${speakers} Speakers` : 'No speakers'} />
          <Square title={`${days}`} description={`${days} days`} />
        </span>
      </PageBanner>

    </section>
  )
}

type SquareProps = {
  title: string;
  description: string;
}

function Square({ title, description }: SquareProps) {
  return <div className='bg-blue-950 text-white size-24 xs:size-36 flex flex-col text-center justify-center gap-2 rounded-lg'>
    <h4 className='font-bold text-3xl xs:text-5xl'>{title}</h4>
    <p className='text-sm xs:text-lg'>{description}</p>
  </div>
}

export type Speakers = {
  nombre: string;
  cargo: string;
}

type SpeakersSection = {
  speakers: Speakers[];
}

function SpeakersSection({ speakers }: SpeakersSection) {

  return (
    <section className='bg-purple-200 flex flex-col gap-12 p-4 smd:p-16 md:p-8'>
      <h2 className='text-4xl font-AbhayaLibre px-12 text-center'>Speakers</h2>
      <div className='grid grid-cols-1 gap-y-16 gap-x-4 items-center justify-items-center xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {speakers.map((speaker) => <Speaker key={speaker.nombre} {...speaker} />)}
      </div>
    </section>

  )
}

function Speaker({ nombre, cargo }: Speakers) {
  return (
    <div className='flex flex-col gap-2 w-40 h-44 smd:w-56 smd:h-48  bg-gradient-to-b from-pink-500 
    to-blue-700 text-white items-center justify-center relative rounded-lg'>
      <img src={defaultSpeaker} alt='Speaker' className='size-24 absolute top-[-3rem] rounded-full' />

      <span className='mt-4'>
        <h4 className='font-bold text-2xl'>{nombre}</h4>
        <p className='text-lg'>{cargo}</p>
      </span>
    </div>
  )
}