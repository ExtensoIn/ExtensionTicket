import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../../../shared/components/ImageLinear'

export const Route = createLazyFileRoute('/event/$eventId/')({
  component: () => <>
    <ImageLinear height='100vh'>
      <div className='flex flex-col h-full justify-center items-center'>
        <h1 className='text-white text-4xl font-AbrilFatface font-light'>Welcome to ExtensionTicket</h1>
      </div>
    </ImageLinear>
  </>
})