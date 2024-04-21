import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../shared/components/ImageLinear'
import Events from '../shared/components/Events'
import petIcon from '../assets/home/petIcon.svg'
import CustomButton from '../shared/components/Button'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const events = [
        {
            title: 'Event 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            date: new Date(),
        },
        {
            title: 'Event 2',
            description: 'Description 2',
            date: new Date(),
            imageUrl: 'https://via.placeholder.com/1000x600',
        },
        {
            title: 'Event 3',
            description: 'Description 3',
            date: new Date(),
            imageUrl: 'https://via.placeholder.com/1000x600',
        },
        {
            title: 'Event 1',
            description: 'Description 1',
            date: new Date(),
            imageUrl: 'https://via.placeholder.com/1000x600',
        },
        {
            title: 'Event 2',
            description: 'Description 2',
            date: new Date(),
            imageUrl: 'https://via.placeholder.com/1000x600',
        },

    ]
    return (
        <div className='flex flex-col relative'>
            <ImageLinear height='100vh'>
                <div className='flex flex-col h-full w-full justify-center items-center'>
                    <section className='w-full flex flex-col gap-4 md:flex-row justify-between items-center px-10 md:px-20 lg:px-40'>
                        <img className='w-48 md:w-96' src={petIcon} alt="Extension Ticket Pet" />
                        <span className='max-w-96 flex flex-col gap-6 text-center md:text-left'>
                            <h1 className='text-4xl font-AbhayaLibre font-light'>Unlock the blockchain power, one ticket at a time</h1>
                            <p className='font-AbhayaLibre text-lg'>Secure your spot now and join the digital revolution! Tickets selling fast – don't miss out!</p>
                            <span className='flex gap-4 w-full flex-col justify-center xs:flex-row md:justify-start'>
                                <CustomButton>Get Tickets</CustomButton>
                                <CustomButton type='secondary'>Learn More</CustomButton>
                            </span>
                        </span>
                    </section>
                </div>
            </ImageLinear>

            <Events
                title='Upcoming Events'
                events={events}
                showImage={true}
            />
        </div>
    )
}