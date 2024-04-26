import { useEffect, useState } from 'react';
import ticketIcon from '../../assets/ticketIcon.svg'
import { Link } from '@tanstack/react-router'
import { IconoirProvider, Menu } from 'iconoir-react';
import { AnimatePresence, motion } from 'framer-motion';

function Header() {
    const linkList = [
        { name: 'Schedule', url: '/schedule' },
        { name: 'Events', url: '/events' },
        { name: 'Contact', url: '/contact' },
        { name: 'Login', url: '/login' }
    ]
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const animation = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
    };

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
            }} className='flex w-full gap-1 px-4 py-2 xs:px-6 justify-between rounded-[3rem] items-center'>
                <Link to='/'>
                    <span className='flex gap-1 items-center py-2 xs:py-0'>
                        <img src={ticketIcon} alt="ExtensionTicket" className='hidden xs:block' />
                        <h1 className='flex font-AbrilFatface font-light'><span className='font-bold'>Extension</span>Ticket</h1>
                    </span>
                </Link>
                <ul className='hidden sm:flex gap-2 font-DMSans items-center'>
                    {linkList.map((link: { name: string, url: string }) => (
                        link.name === 'Login' ? <Link key={link.url} to={link.url} className='hover:bg-white hover:text-purple-800 border-1 border-white rounded-[2rem] px-4 py-2'>{link.name}</Link> :
                            <Link key={link.url} to={link.url} className='hover:underline decoration-purple-800 decoration-[3px]'>{link.name}</Link>
                    ))}

                </ul>
                <button onClick={() => setMenuOpen(true)} className='sm:hidden w-6 h-6'>
                    <IconoirProvider>
                        <Menu className='w-[1.25rem] h-[1.25rem] xs:w-6 xs:h-6' />
                    </IconoirProvider>
                </button>
            </div>
            <AnimatePresence mode='sync'>
                {menuOpen && <div onClick={() => setMenuOpen(false)} className='fixed top-0 right-0 flex bg-[#0000004d] backdrop-blur-[2px] justify-end w-full h-[100dvh]'>
                    <motion.div variants={animation}
                        initial="hidden"
                        animate="visible"
                        exit="exit" onClick={(event) => event.stopPropagation()} className='w-[70%] 2xs:w-[45%] relative left-2 bg-[#000000b3] rounded-l-[1.5rem] backdrop-blur-[2px] h-[100dvh] shadow-2xl'>
                        <ul className='flex flex-col gap-2 items-center h-full p-8 '>
                            {linkList.map((link: { name: string, url: string }) => (
                                <Link key={link.url} to={link.url} className='hover:underline decoration-purple-800 decoration-[3px]'>{link.name}</Link>
                            ))}
                        </ul>
                    </motion.div>
                </div>}
            </AnimatePresence>
        </header>
    )
}

export default Header
