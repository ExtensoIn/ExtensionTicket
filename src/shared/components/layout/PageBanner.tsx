import { ReactNode } from "react";
import mainPhoto from '../../../assets/home/backgroundHome.webp'

type PageBannerProps = {
    imgSrc?: string;
    children: ReactNode;
    title: string;
    description: string;
    imgMaxWidth?: 'normal' | 'large';
}

const ImgBannerType = {
    normal: 'w-48 md:w-52 lg:w-80 ',
    large: 'w-48 sm:w-52 md:w-72 smd:w-96 lg:w-[24rem]',
}

function PageBanner({ imgSrc, children, title, description, imgMaxWidth = 'normal' }: PageBannerProps) {
    return (
        <section className='w-full flex flex-col gap-4 smd:gap-8 md:gap-16 smd:flex-row justify-between xl:gap-24 xl:justify-center items-center px-10 md:px-20 lg:px-40'>
            <img className={`${ImgBannerType[imgMaxWidth]}`} src={imgSrc || mainPhoto} alt="Extension Ticket Pet" />
            <span className='max-w-96 flex flex-col gap-6 text-center smd:text-left'>
                <h1 className='text-4xl font-AbhayaLibre font-light'>{title}</h1>
                <p className='font-AbhayaLibre text-lg text-pretty'>{description}</p>
                {children}
            </span>
        </section>
    )
}

export default PageBanner
