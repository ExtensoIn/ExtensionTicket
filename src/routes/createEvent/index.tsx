import { ReactNode, createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/createEvent/')({
  component: CreateEvent
})

type CustomDate = {
  day: number;
  month: number;
  year: number;
}

type CustomTime = {
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

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
  const methods = useForm<CreateEventForm>();
  const onsubmit = (data: CreateEventForm) => {
    console.log(data);
  }
  return (
    <ImageLinear height='100dvh'>
      <FormProvider {...methods}>
        <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl' onSubmit={methods.handleSubmit(onsubmit)}>
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
          <CustomButton buttonType='submit'>Create Event 🤩</CustomButton>
        </form>
      </FormProvider>
    </ImageLinear>
  )
}

type DoubleInputProps = {
  children: ReactNode;
}

function DoubleInput({ children }: DoubleInputProps) {
  return (
    <div className='flex flex-col xs:flex-row gap-4'>
      {children}
    </div>
  )
}