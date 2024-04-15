import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../shared/components/ImageLinear'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <ImageLinear height='100vh'>
            <div className='flex flex-col h-full justify-center items-center'>
                <h1 className='text-white text-4xl font-AbrilFatface font-light'>Welcome to ExtensionTicket</h1>
                <p className='text-white text-lg font-DMSans'>The best place to find events and buy tickets</p>
            </div>
        </ImageLinear>
    )
}