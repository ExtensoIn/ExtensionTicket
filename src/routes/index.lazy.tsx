import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../shared/components/ImageLinear'
import Events from '../shared/components/Events'
import petIcon from '../assets/home/petIcon.svg'
import CustomButton from '../shared/components/Button'
import dogIcon from '../assets/home/dogIcon.svg'
import { events } from '../data/home/home.data'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {

    return (
        <div className='flex flex-col relative'>
            <ImageLinear height='100vh'>
                <HomeBanner />
            </ImageLinear>

            <Events
                title='Upcoming Events'
                events={events}
                showImage={true}
            />

            <CreateEvent />
        </div>
    )
}

function HomeBanner() {
    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <section className='w-full flex flex-col gap-4 md:flex-row justify-between items-center px-10 md:px-20 lg:px-40'>
                <img className='w-48 md:w-64 lg:w-80' src={petIcon} alt="Extension Ticket Pet" />
                <span className='max-w-96 flex flex-col gap-6 text-center md:text-left'>
                    <h1 className='text-4xl font-AbhayaLibre font-light'>Unlock the blockchain power, one ticket at a time</h1>
                    <p className='font-AbhayaLibre text-lg'>Secure your spot now and join the digital revolution! Tickets selling fast – don't miss out!</p>
                    <span className='flex gap-4 w-full flex-col justify-center xs:flex-row md:justify-start'>
                        <CustomButton>Create event</CustomButton>
                        <CustomButton type='secondary'>Get Tickets</CustomButton>
                    </span>
                </span>
            </section>
        </div>
    )
}

function CreateEvent() {
    return (
        <section className='bg-purple-200 w-full flex flex-col justify-center items-center px-6 pb-6 md:max-h-64 md:flex-row'>
            <img className='relative md:bottom-20' src={dogIcon} alt="Dog banner icon" />
            <span className='flex flex-col gap-2 text-center md:text-left'>
                <h3 className='text-3xl font-bold '>Make your own event</h3>
                <p>Start creating your own event and sell tickets</p>
                <CustomButton>Create event</CustomButton>
            </span>
        </section>
    )
}