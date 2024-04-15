import Card, { CardProps } from './Card'

interface EventsProps {
    title: string;
    events: CardProps[];
}

const Events = (props: EventsProps) => {
    return (
        <section className='flex flex-col items-center justify-center  bg-gray-100 p-20 md:p-40'>
            <h1 className='text-4xl font-light font-AbrilFatface text-left w-full text-blue-950'>{props.title}</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-20 w-full'>
                {
                    props.events.map((event, index) => {
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