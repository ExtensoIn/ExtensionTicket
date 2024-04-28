import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../../../shared/components/ImageLinear'
import defaultBanner from '../../../assets/home/backgroundHome.webp'
import defaultEvent from '../../../assets/events/defaultEvent.jpg'
import defaultSpeaker from '../../../assets/events/dafaultSpeaker.png'
import CustomButton from '../../../shared/components/Button'
import { useEffect, useState } from 'react';
import PageBanner from '../../../shared/components/layout/PageBanner';
import CountDown from '../../../shared/components/CountDown';
import { IconoirProvider, MapPin } from 'iconoir-react';
import { getEvent } from "../../../connection/event.ts";
import { useQuery } from "@tanstack/react-query";
import { Speaker } from "../../../connection/types/event.types.ts";

// interface EventProps {
//   eventId: number;
//   title: string;
//   description: string;
//   eventDate: Date;
//   imageUrl?: string;
//   backgroundImageUrl?: string;
// }

export const Route = createLazyFileRoute('/event/$eventId/')({
  component: EventPage
})

function EventPage() {
  const { eventId } = Route.useParams()

  const eventQuery = useQuery({
    queryKey: ['singleEvent', eventId],
    queryFn: () => getEvent(Number(eventId)),
    refetchOnWindowFocus: false,
  })
  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  useEffect(() => {
    if (eventQuery.data) {
      setEndDate(new Date(Math.trunc(eventQuery.data.endDate / 1000000)));
      setStartDate(new Date(Math.trunc(eventQuery.data.startDate / 1000000)));
    }
  }, [eventQuery.data]);



  const setTimeInterval = () => {
    const now = new Date();
    const interval = startDate.getTime() - now.getTime();
    if (interval < 0) return
    setTime({
      days: Math.floor(interval / (1000 * 60 * 60 * 24)),
      hours: Math.floor((interval / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((interval / 1000 / 60) % 60),
      seconds: Math.floor((interval / 1000) % 60),
    })
  }
  setInterval(setTimeInterval, 1000)



  return (<div className='flex flex-col'>
    <ImageLinear height='100dvh'>
      <PageBanner imgSrc={defaultBanner} title={eventQuery.data?.title || 'Event Title'} description={eventQuery.data?.shortDescription || 'Event Description'} imgMaxWidth='large'>
        <span className='w-full flex flex-col gap-4'>
          <CustomButton>Get Tickets</CustomButton>
          <CountDown days={time.days} hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
        </span>
      </PageBanner>
    </ImageLinear>
    <AboutEvent description={eventQuery.data?.longDescription || 'Event Long Description'} days={Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} speakers={eventQuery.data?.speakers?.length || 0} location={eventQuery.data?.place || 'La Paz,Bolivia'} />
    <SpeakersSection speakers={eventQuery.data?.speakers || []} />
    {/* TODO Add the upcoming events section here */}
  </div>)
}
type AboutEventProps = {
  description: string;
  location?: string;
  speakers?: number;
  days: number;
}

function AboutEvent({ description, location, speakers, days }: AboutEventProps) {
  return (
    <section className='text-blue-950 p-4 smd:p-8 md:p-16'>
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

type SpeakersSection = {
  speakers: Speaker[];
}

function SpeakersSection({ speakers }: SpeakersSection) {

  return (
    <section className='bg-purple-200 flex flex-col gap-12 py-8 px-4'>
      <h2 className='text-4xl font-AbhayaLibre px-12 text-center'>Speakers</h2>
      <div className='grid grid-cols-1 gap-y-16 gap-x-4 items-center justify-items-center xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {speakers.map((speaker) => <SpeakerCard key={speaker.name} {...speaker} />)}
      </div>
    </section>

  )
}

function SpeakerCard({ name, position }: Speaker) {
  return (
    <div className='flex flex-col gap-2 w-40 h-44 smd:w-56 smd:h-48  bg-gradient-to-b from-pink-500 
    to-blue-700 text-white items-center justify-center relative rounded-lg'>
      <img src={defaultSpeaker} alt='Speaker' className='size-24 absolute top-[-3rem] rounded-full' />

      <span className='mt-4'>
        <h4 className='font-bold text-2xl'>{name}</h4>
        <p className='text-lg'>{position}</p>
      </span>
    </div>
  )
}