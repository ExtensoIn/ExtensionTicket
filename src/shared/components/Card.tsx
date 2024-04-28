import { Link } from '@tanstack/react-router';
import bg from '../../assets/home/backgroundHome.webp'
import {CardEvent} from "../../connection/types/event.types.ts";

const Card = ({ title, id, startDate, shortDescription}:CardEvent) => {
    return (
        <Link resetScroll href={`/event/${id}`} to="/event/$eventId" params={{ eventId: id.toString() }} className='bg-white rounded-md cursor-pointer'>
            <img src={bg} alt={title} className='w-full h-56 object-cover rounded-t-md' />
            <div className='bg-white rounded-md flex'>
                <div className='w-1/5'>
                    <div className='p-5 rounded-md'>
                        <p className='text-center text-blue-700'>{
                            startDate.toLocaleString('default', { month: 'short' }).toUpperCase()
                        }</p>
                        <p className='text-center font-extrabold text-2xl'>{
                            startDate.getDate()
                        }
                        </p>
                    </div>
                </div>

                <div className='w-4/5 p-4'>
                    <h1 className='text-2xl font-bold font-DMSans text-blue-950'>{title}</h1>
                    <p className='text-gray-500'>
                        {shortDescription}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default Card