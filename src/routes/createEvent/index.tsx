import { AnyContext, ReactNode, createFileRoute } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { Speakers } from '../event/$eventId/index.lazy';
import ImageLinear from '../../shared/components/ImageLinear';
import InputForm from '../../shared/components/form/InputForm';
import DateRangeForm from '../../shared/components/form/DateRangeForm';
import TimeForm from '../../shared/components/form/TimeForm';
import { DateValue, RangeValue, TimeInputValue } from '@nextui-org/react';
import AutocompleteForm from '../../shared/components/form/AutocompleteForm';
import SelectForm from '../../shared/components/form/SelectForm';
import CustomButton from '../../shared/components/Button';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Route = createFileRoute('/createEvent/')({
  component: CreateEvent
})

// type CustomDate = {
//   day: number;
//   month: number;
//   year: number;
// }

// type CustomTime = {
//   hour: number;
//   minute: number;
//   second: number;
//   millisecond: number;
// }

interface CreateEventForm {
  titulo: string;
  shortDescription: string;
  hora: TimeInputValue;
  precio: number;
  banner: string;
  imagenPrincipal: string;
  tipoEvento: 'presencial' | 'virtual' | 'hibrido';
  categorias: string[];
  tickets: number;
  date: RangeValue<DateValue>
  speakers?: Speakers[];
  longDescription?: string;
  location?: string;
}

function CreateEvent() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CreateEventForm>();

  const onsubmitFirst = (data: CreateEventForm) => {
    console.log(data);
    setForm(data);
    setStep(1);
  }

  const oncancelSecond = () => {
    setStep(0);
  }

  const onsubmitSecond = (data: AnyContext) => {
    console.log(data);
    // addEvent(auth.authClient.getIdentity(), {
    //   title: data.titulo,
    //   shortDescription: data.shortDescription,
    //   price: data.precio,
    //   eventType: data.tipoEvento,
    //   categories: data.categorias,
    //   startDate: data.date.start,
    //   endDate: data.date.end,
    //   id: 1,
    //   status: 'NotStarted'
    // })
  }

  return (
    <ImageLinear height='100dvh'>
      <AnimatePresence mode='wait' initial={false}>
        {step === 0 && (
          <AnimateTransition key="create-event-first">
            <CreateEventFirst onsubmit={onsubmitFirst} data={form} />
          </AnimateTransition>
        )}
        {step === 1 && (
          <AnimateTransition key="create-event-second">
            <CreateEventSecond onsubmit={onsubmitSecond} oncancel={oncancelSecond} />
          </AnimateTransition>
        )}
      </AnimatePresence>
    </ImageLinear>
  )
}

interface CreateEventFirstProps {
  onsubmit: (data: CreateEventForm) => void;
  data: CreateEventForm | undefined;
}

function CreateEventFirst(props: CreateEventFirstProps) {
  const methods = useForm<CreateEventForm>();

  useEffect(() => {
    if (props.data) {
      methods.reset(props.data);
    }
  })

  return (
    <FormProvider {...methods}>
      <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(props.onsubmit)}>
        <InputForm name='titulo' label="Event's name" type='text' />
        <div className='grid-cols-1 grid xs:grid-cols-2 gap-4'>
          <InputForm name='shortDescription' label='Short description' type='text' />
          <InputForm name='longDescription' label='Long description' type='text' />


          <DateRangeForm label='Event dates' name='date' />
          <TimeForm name='hora' label='Event time' />

          <InputForm name='tickets' label='Number of tickets available' type='number' />
          <InputForm name='precio' label="Ticket's Price" type='number' />

          <AutocompleteForm name='tipoEvento' label='Event categories' items={[
            { value: 'presencial', label: 'On Site' },
            { value: 'virtual', label: 'Virtual' },
            { value: 'hibrido', label: 'Hybrid' }
          ]} />
          <SelectForm name='categorias' label='Event categories' items={[
            { value: 'music', label: 'Music' },
            { value: 'sports', label: 'Sports' },
            { value: 'theater', label: 'Theater' },
            { value: 'movies', label: 'Movies' },
            { value: 'technology', label: 'Technology' }
          ]} />
        </div>
        <CustomButton buttonType='submit'>{'Next ->'}</CustomButton>
      </form>
    </FormProvider>
  )
}

interface CreateEventSecondProps {
  onsubmit: (data: CreateEventForm) => void;
  oncancel: () => void;
}

function CreateEventSecond(props: CreateEventSecondProps) {
  const methods = useForm<CreateEventForm>();

  return (
    <FormProvider {...methods}>
      <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(props.onsubmit)}>
        <div className='flex w-full justify-end'>
          <CustomButton buttonType='button' type='action' onClick={props.oncancel}>{'<-'}</CustomButton>
        </div>
        <div className='grid-cols-1 grid xs:grid-cols-2 gap-4'>
          <InputForm name='banner' label='Banner' type='media' />
          <InputForm name='imagenPrincipal' label='Main image' type='media' />
        </div>
        <CustomButton buttonType='submit'>{'Next ->'}</CustomButton>
      </form>
    </FormProvider>
  )
}


// interface CreateEventThirdProps {
//   onsubmit: (data: CreateEventForm) => void;
// }


// function CreateEventThird(props: CreateEventThirdProps) {
//   const methods = useForm<CreateEventForm>();

//   return (
//     <FormProvider {...methods}>
//       <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(props.onsubmit)}>
//         <InputForm name='titulo' label="Event's name" type='text' />
//         <CustomButton buttonType='submit'>{'Next ->'}</CustomButton>
//       </form>
//     </FormProvider>
//   )
// }

interface AnimateTransitionProps {
  children: ReactNode;
  key: string;
}

function AnimateTransition(props: AnimateTransitionProps) {
  return (
    <motion.div
      key={props.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  )
}