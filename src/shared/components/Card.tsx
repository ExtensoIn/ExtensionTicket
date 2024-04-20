import bg from '../../assets/home/backgroundHome.webp'

export interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    date: Date;
}


const Card = (props: CardProps) => {
    return (
        <div className='bg-white rounded-md '>
            <img src={props.imageUrl || bg} alt={props.title} className='w-full h-56 object-cover rounded-t-md' />
            <div className='bg-white rounded-md flex'>
                <div className='w-1/5'>
                    <div className='p-5 rounded-md'>
                        <p className='text-center text-blue-700'>{
                            props.date.toLocaleString('default', { month: 'short' }).toUpperCase()
                        }</p>
                        <p className='text-center font-extrabold text-2xl'>{
                            props.date.getDate()
                        }
                        </p>
                    </div>
                </div>

                <div className='w-4/5 p-4'>
                    <h1 className='text-2xl font-bold font-DMSans text-blue-950'>{props.title}</h1>
                    <p className='text-gray-500'>
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card