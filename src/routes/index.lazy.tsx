import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../shared/components/ImageLinear'
import Events from '../shared/components/Events'

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
        <>
            <ImageLinear height='100vh'>
                <div className='flex flex-col h-full justify-center items-center'>
                    <h1 className='text-white text-4xl font-AbrilFatface font-light'>Welcome to ExtensionTicket</h1>
                </div>
            </ImageLinear>

            <Events
                title='Upcoming Events'
                events={events}
            />
        </>
    )
}