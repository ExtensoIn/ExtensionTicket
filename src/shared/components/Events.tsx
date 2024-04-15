import React from 'react'
import Card from './Card'

const Events = () => {
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
        <section className='flex flex-col items-center justify-center  bg-gray-100 p-20 md:p-40'>
            <h1 className='text-4xl font-light font-AbrilFatface text-left w-full text-blue-950'>Upcoming Events</h1>
            {/* responsive grid */}
            <div className='

            grid  md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-20 w-full'>
                {
                    events.map((event, index) => {
                        return (
                            <Card key={index} {...event} />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Events