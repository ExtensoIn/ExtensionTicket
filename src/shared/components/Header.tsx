import icon from '../../assets/icon.svg'
import { Link } from '@tanstack/react-router'

function Header() {
    const linkList = [
        { name: 'Schedule', url: '/schedule' },
        { name: 'Events', url: '/events' },
        { name: 'Contact', url: '/contact' },
    ]
    return (
        <header className="bg-transparent absolute w-full top-0 z-10 flex justify-between py-4 px-12 gap-4 items-center text-white">
            <span className='flex gap-1 items-center'>
                <img src={icon} alt="ExtensionTicket" />
                <h1 className='font-AbrilFatface font-light'><span className='font-bold'>Extension</span>Ticket</h1>
            </span>
            <ul className='flex gap-2 font-DMSans items-center'>
                {linkList.map((link: { name: string, url: string }) => (
                    <Link key={link.url} to={link.url} className='hover:underline'>{link.name}</Link>
                ))}
                <Link to='/login' className='hover:bg-white hover:text-purple-800 border-1 border-white rounded-[2rem] px-4 py-2'>Login</Link>
            </ul>
        </header>
    )
}

export default Header
