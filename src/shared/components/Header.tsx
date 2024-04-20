import { useEffect, useState } from 'react';
import icon from '../../assets/icon.svg'
import { Link } from '@tanstack/react-router'

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
        <header className="bg-transparent fixed w-full top-4 z-30 px-40 flex text-white">
            <div style={isScrolled ? {
                backgroundColor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'background-color 0.5s',
                borderRadius: '3rem'
            } : {
                transition: 'background-color border-radius 0.5s',
            }} className='flex w-full py-2 px-8 justify-between rounded-[3rem] items-center'>
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
            </div>

        </header>
    )
}

export default Header
