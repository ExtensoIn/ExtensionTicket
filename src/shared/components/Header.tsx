import { useEffect, useState } from 'react';
import ticketIcon from '../../assets/ticketIcon.svg'
import { Link } from '@tanstack/react-router'
import { IconoirProvider, Menu } from 'iconoir-react';

function Header() {
    const linkList = [
        { name: 'Schedule', url: '/schedule' },
        { name: 'Events', url: '/events' },
        { name: 'Contact', url: '/contact' },
    ]
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 30;
            setIsScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header className="bg-transparent fixed w-full top-4 z-30 flex text-white px-10 md:px-20 lg:px-40">
            <div style={isScrolled ? {
                backgroundColor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'background-color 0.5s',
                borderRadius: '3rem'
            } : {
                transition: 'background-color border-radius 0.5s',
            }} className='flex w-full px-6 py-2 xs:px-8 justify-between rounded-[3rem] items-center'>
                <Link to='/'>
                    <span className='flex gap-1 items-center py-2 xs:py-0'>
                        <img src={ticketIcon} alt="ExtensionTicket" className='hidden xs:block' />
                        <h1 className='flex font-AbrilFatface font-light'><span className='font-bold'>Extension</span>Ticket</h1>
                    </span>
                </Link>
                <ul className='hidden sm:flex gap-2 font-DMSans items-center'>
                    {linkList.map((link: { name: string, url: string }) => (
                        <Link key={link.url} to={link.url} className='hover:underline'>{link.name}</Link>
                    ))}
                    <Link to='/login' className='hover:bg-white hover:text-purple-800 border-1 border-white rounded-[2rem] px-4 py-2'>Login</Link>
                </ul>
                <button className='sm:hidden w-6 h-6'>
                    <IconoirProvider>
                        <Menu />
                    </IconoirProvider>
                </button>
            </div>
            <div>

            </div>
        </header>
    )
}

export default Header
