import { Link } from '@tanstack/react-router'
import ticketIcon from '../../../assets/ticketIcon.svg'
import CustomButton from '../Button'
import { aboutUs, planEvents } from '../../../data/footer/footer.data'

function Footer() {
    return (
        <footer className='flex flex-col items-center gap-8 bg-blue-900 font-DMSans text-white p-10'>
            <div className='flex flex-col gap-4 md:flex-row md:gap-32 md:py-10 justify-center'>
                <Link to='/'>
                    <span className='flex text-white gap-1 items-center py-2 xs:py-0'>
                        <img src={ticketIcon} alt="ExtensionTicket" className='hidden xs:block' />
                        <h1 className='flex font-AbrilFatface font-light'><span className='font-bold'>Extension</span>Ticket</h1>
                    </span>
                </Link>
                <div className='flex flex-col gap-4 lg:flex-row lg:gap-32'>
                    <FooterSection title='Plan Events' links={planEvents} />
                    <FooterSection title='ExtensionTicket' links={aboutUs} />
                </div>
                <Link>
                    <CustomButton>Create Event</CustomButton>
                </Link>
            </div>
            <div className='w-full flex-col flex items-center gap-2'>
                <span className='w-[80%] h-[1px] bg-slate-100 md:'></span>
                <p className='w-full text-center text-sm font-AbhayaLibre'>Copyright © 2024 ExtensoIn</p>
            </div>
        </footer>
    )
}

export default Footer

type FooterProps = {
    title: string,
    links: { name: string, link: string }[]
}

function FooterSection({ title, links }: FooterProps) {
    return (
        <div className='flex flex-col gap-2'>
            <h4 className='text-xl font-bold'>{title}</h4>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.link} className='hover:underline decoration-pink-400 decoration-[3px]'>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
