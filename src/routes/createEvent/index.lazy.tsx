import { AnyContext, ReactNode, createLazyFileRoute } from '@tanstack/react-router'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import ImageLinear from '../../shared/components/ImageLinear';
import InputForm from '../../shared/components/form/InputForm';
import DateRangeForm from '../../shared/components/form/DateRangeForm';
import TimeForm from '../../shared/components/form/TimeForm';
import { Button, DateValue, RangeValue, TimeInputValue } from '@nextui-org/react';
import AutocompleteForm from '../../shared/components/form/AutocompleteForm';
import SelectForm from '../../shared/components/form/SelectForm';
import CustomButton from '../../shared/components/Button';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Event } from "../../connection/types/event.types"
import { IconoirProvider, Trash } from 'iconoir-react';

export const Route = createLazyFileRoute('/createEvent/')({
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

type CreateEventFirstForm = {
  title: string;
  shortDescription: string;
  longDescription?: string;
  place?: string;
  date: RangeValue<DateValue>;
  time: TimeInputValue;
  price: number;
  ticketsAmount: number;
  eventType: "OnSite" | "Online" | "Hybrid"
  categorias: string[];
}

type CreateEventSecondForm = {
  banner?: string;
  imagenPrincipal?: string;
}

type CreateEventThirdForm = {
  speakers: { name: string, position: string }[];
}

function CreateEvent() {
  const [step, setStep] = useState(0);
  const [firstForm, setFirstForm] = useState<CreateEventFirstForm>();
  const [secondForm, setSecondForm] = useState<CreateEventSecondForm>();
  const [thirdForm, setThirdForm] = useState<CreateEventThirdForm>();
  const onSubmitFirst = (data: CreateEventFirstForm) => {
    console.log(data);
    setFirstForm(data);
    setStep(1);
  }

  const onCancelSecond = () => {
    setStep(0);
  }

  const onSubmitSecond = (data: CreateEventSecondForm) => {
    console.log(data);
    setSecondForm(data);
    setStep(2);
  }
  const onSubmitThird = (data: CreateEventThirdForm) => {
    setThirdForm(data);
    console.log(data);
  }
  const onCancelThird = (data: CreateEventThirdForm) => {
    setThirdForm(data)
    setStep(1);
  }

  return (
    <ImageLinear height='100dvh'>
      <AnimatePresence mode='wait' initial={false}>
        {step === 0 && (
          <AnimateTransition animateKey="create-event-first">
            <CreateEventFirst onSubmit={onSubmitFirst} data={firstForm} />
          </AnimateTransition>
        )}
        {step === 1 && (
          <AnimateTransition animateKey="create-event-second">
            <CreateEventSecond data={secondForm} onSubmit={onSubmitSecond} onCancel={onCancelSecond} />
          </AnimateTransition>
        )}
        {step === 2 && (
          <AnimateTransition animateKey="create-event-third">
            <CreateEventThird onCancel={onCancelThird} data={thirdForm} onSubmit={onSubmitThird} />
          </AnimateTransition>
        )}
      </AnimatePresence>

    </ImageLinear>
  )
}

interface CreateEventFirstProps {
  onSubmit: (data: CreateEventFirstForm) => void;
  data: CreateEventFirstForm | undefined;
}

function CreateEventFirst({ onSubmit, data }: CreateEventFirstProps) {
  const methods = useForm<CreateEventFirstForm>();

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(onSubmit)}>
        <InputForm name='title' label="Event's name" type='text' />
        <div className='grid-cols-1 grid xs:grid-cols-2 gap-4'>
          <InputForm name='shortDescription' label='Short description' type='text' />
          <InputForm name='longDescription' label='Long description' type='text' />


          <DateRangeForm label='Event dates' name='date' />
          <TimeForm name='time' label='Event time' />

          <InputForm name='ticketsAmount' label='Number of tickets available' type='number' />
          <InputForm name='price' label="Ticket's Price" type='number' />

          <AutocompleteForm name='eventType' label='Event categories' items={[
            { value: 'OnSite', label: 'On Site' },
            { value: 'Online', label: 'Virtual' },
            { value: 'Hybrid', label: 'Hybrid' }
          ]} />
          <SelectForm name='categories' label='Event categories' items={[
            { value: 'music', label: 'Music' },
            { value: 'sports', label: 'Sports' },
            { value: 'theater', label: 'Theater' },
            { value: 'movies', label: 'Movies' },
            { value: 'technology', label: 'Technology' }
          ]} />
        </div>
        <CustomButton buttonType='submit'>{'Next ➡️'}</CustomButton>
      </form>
    </FormProvider>
  )
}

interface CreateEventSecondProps {
  onSubmit: (data: CreateEventSecondForm) => void;
  onCancel: () => void;
  data: CreateEventSecondForm | undefined;
}

function CreateEventSecond({ onSubmit, onCancel, data }: CreateEventSecondProps) {
  const methods = useForm<CreateEventSecondForm>();

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex w-full justify-end'>
          <CustomButton buttonType='button' type='action' onClick={onCancel}>{'Back ⬅️'}</CustomButton>
        </div>
        <div className='grid-cols-1 grid xs:grid-cols-2 gap-4'>
          <InputForm name='banner' label='Banner' type='media' />
          <InputForm name='imagenPrincipal' label='Main image' type='media' />
        </div>
        <CustomButton buttonType='submit'>{'Next ➡️'}</CustomButton>
      </form>
    </FormProvider>
  )
}


interface CreateEventThirdProps {
  onSubmit: (data: CreateEventThirdForm) => void;
  onCancel: (data: CreateEventThirdForm) => void;
  data: CreateEventThirdForm | undefined;
}

function CreateEventThird({ onSubmit, onCancel, data }: CreateEventThirdProps) {
  const methods = useForm<CreateEventThirdForm>();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'speakers'
  });
  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex w-full justify-end'>
          <CustomButton buttonType='button' type='action' onClick={() => onCancel(methods.getValues())}>{'Back ⬅️'}</CustomButton>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className='grid-cols-1 grid xs:grid-cols-[1fr_1fr_auto] gap-4'>
            <InputForm name={`speakers[${index}].name`} label='Speaker name' type='text' />
            <InputForm name={`speakers[${index}].position`} label='Speaker position' type='text' />
            <Button className='h-full ' onClick={() => remove(index)}>
              <IconoirProvider>
                <Trash className='text-red-500' />
              </IconoirProvider>
            </Button>
          </div>
        ))}
        <button className='grid place-items-center text-sm rounded-3xl border p-4 w-full self-center border-white' onClick={() => append({
          name: '',
          position: ''
        })}>Add Speaker 🗣️</button>
        <CustomButton buttonType='submit'>{'Finish 🚀'}</CustomButton>
      </form>
    </FormProvider>
  )
}



interface AnimateTransitionProps {
  children: ReactNode;
  animateKey: string;
}

function AnimateTransition(props: AnimateTransitionProps) {
  return (
    <motion.div
      key={props.animateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  )
}