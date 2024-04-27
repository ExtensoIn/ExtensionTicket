import { Link } from '@tanstack/react-router';
import bg from '../../assets/home/backgroundHome.webp'
import {CardEvent} from "../../connection/types/event.types.ts";

export interface CardProps {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    date: Date;
}


const Card = (props: CardEvent) => {
    return (
        <Link resetScroll href={`/event/${props.id}`} to="/event/$eventId" params={{ eventId: props.id.toString() }} className='bg-white rounded-md cursor-pointer'>
            <img src={props.banner || bg} alt={props.title} className='w-full h-56 object-cover rounded-t-md' />
            <div className='bg-white rounded-md flex'>
                <div className='w-1/5'>
                    <div className='p-5 rounded-md'>
                        <p className='text-center text-blue-700'>{
                            props.startDate.toLocaleString('default', { month: 'short' }).toUpperCase()
                        }</p>
                        <p className='text-center font-extrabold text-2xl'>{
                            props.startDate.getDate()
                        }
                        </p>
                    </div>
                </div>

                <div className='w-4/5 p-4'>
                    <h1 className='text-2xl font-bold font-DMSans text-blue-950'>{props.title}</h1>
                    <p className='text-gray-500'>
                        {props.shortDescription}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default Card