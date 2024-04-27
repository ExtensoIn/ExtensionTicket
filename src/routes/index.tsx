import ImageLinear from '../shared/components/ImageLinear'
import Events from '../shared/components/Events'
import petIcon from '../assets/home/petIcon.svg'
import CustomButton from '../shared/components/Button'
import dogIcon from '../assets/home/dogIcon.svg'
import spotify from '../assets/home/brands/spotify.png'
import grab from '../assets/home/brands/grab.png'
import google from '../assets/home/brands/google.png'
import microsoft from '../assets/home/brands/microsoft.png'
import zoom from '../assets/home/brands/zoom.png'
import youtube from '../assets/home/brands/youtube.png'
import medium from '../assets/home/brands/medium.png'
import stripe from '../assets/home/brands/stripe.png'
import uber from '../assets/home/brands/uber.png'
import PageBanner from '../shared/components/layout/PageBanner'
import { Link, createFileRoute } from '@tanstack/react-router'
import {useQuery} from "@tanstack/react-query";
import {getEvents} from "../connection/event.ts";

export const Route = createFileRoute('/')({
    component: Home,

})

async function Home() {

    const {data} = useQuery({
        queryKey: ['events'],
        queryFn: () => getEvents(10, 0, undefined)
    })
    return (
        <div className='flex flex-col'>
            <ImageLinear height='100vh'>
                <HomeBanner/>
            </ImageLinear>
            <Events
                title='Upcoming Events'
                events={data||[]}
                showImage={true}
            />
            <CreateEvent/>
            <Brands/>
        </div>
    )
}

function HomeBanner() {
    const homeInfo = {
        imgSrc: petIcon,
        title: 'Unlock the blockchain power, one ticket at a time',
        description: "Secure your spot now and join the digital revolution! Tickets selling fast – don\'t miss out!",
    }
    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <PageBanner imgSrc={homeInfo.imgSrc} title={homeInfo.title} description={homeInfo.description}>
                <span className='flex gap-4 w-full flex-col justify-center xs:flex-row md:justify-start'>
                    <Link to='/createEvent'>
                        <CustomButton>Create event</CustomButton>
                    </Link>
                    <CustomButton type='secondary'>Get Tickets</CustomButton>
                </span>
            </PageBanner>
        </div>
    )
}

function CreateEvent() {
    return (
        <section className='font-DMSans bg-purple-200 w-full flex flex-col gap-4 md:gap-10 justify-center items-center px-6 pb-6 md:max-h-64 md:flex-row'>
            <img className='relative md:bottom-20' src={dogIcon} alt="Dog banner icon" />
            <span className='flex flex-col gap-2 text-center md:text-left'>
                <h3 className='text-3xl font-bold '>Make your own event</h3>
                <p>Start creating your own event and sell tickets</p>
                <CustomButton>Create event</CustomButton>
            </span>
        </section>
    )
}

function Brands() {
    const images = [
        spotify,
        grab,
        google,
        microsoft,
        zoom,
        youtube,
        medium,
        stripe,
        uber
    ]
    return (
        <section className='flex flex-col gap-4 items-center justify-center p-8'>
            <span className='text-center flex flex-col gap-4'>
                <h3 className='text-4xl font-AbhayaLibre font-semibold'>
                    Join these brands
                </h3>
                <p className='text-xl font-DMSans'>We've had the pleasure of working with industry-defining brands. These are just some of them. </p>
            </span>
            <span className='grid grid-cols-2 md:grid-cols-3 
            lg:grid-cols-5 items-center content-center justify-items-center auto-rows-fr gap-2'>
                {images.map((image, index) => (
                    <img className='w-full xs:w-auto' key={index} src={image} alt="Brand" />
                ))}
            </span>
        </section>
    )
}