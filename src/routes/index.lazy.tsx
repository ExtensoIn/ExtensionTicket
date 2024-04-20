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
        <div className='flex flex-col'>
            <ImageLinear height='100vh'>
                <div className='flex flex-col h-full w-full justify-center items-center'>
                    <section className='w-full flex justify-between items-center px-40'>
                        <div className="relative">
                            <img src={petIcon} alt="Extension Ticket Pet" className="" />
                            <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t 
                            from-black to-transparent rounded-full shadow-md transform -skew-y-3  z-0
                            translate-x-3 translate-y-2 blur-xl"></div>
                        </div>

                        <span className='max-w-96 flex flex-col gap-6'>
                            <h1 className='text-4xl font-AbhayaLibre font-light'>Unlock the blockchain power, one ticket at a time</h1>
                            <p className='font-AbhayaLibre text-lg'>Secure your spot now and join the digital revolution! Tickets selling fast – don't miss out!</p>
                            <span className='flex gap-4 w-full'>
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