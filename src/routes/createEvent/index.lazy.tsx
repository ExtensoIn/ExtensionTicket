import { ReactNode, createLazyFileRoute } from '@tanstack/react-router'
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
import { useMutation } from '@tanstack/react-query';
import { addEvent } from '../../connection/event';
import useAuth from '../../shared/hooks/useAuth';
import { toast } from "sonner";

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
    categories: string[];
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
    const { auth } = useAuth();
    const [firstForm, setFirstForm] = useState<CreateEventFirstForm>();
    const [secondForm, setSecondForm] = useState<CreateEventSecondForm>();
    const [thirdForm, setThirdForm] = useState<CreateEventThirdForm>();
    const createEventMutation = useMutation({
        mutationFn: (event: Event) => {
            const identity = auth.authClient.getIdentity();
            return addEvent(identity, event)
        },
        onMutate: () => {
            toast.loading('Creating Event...')
        },
        onSuccess: () => {
            toast.dismiss()
            toast.success('Event Created succsefully')
        },
    })
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
        const startDate = new Date(firstForm?.date.start.year || 2024, (firstForm?.date.start.month || 12) - 1, firstForm?.date.start.day);
        const endDate = new Date(firstForm?.date.end.year || 2024, (firstForm?.date.end.month || 12) - 1, firstForm?.date.end.day);
        startDate.setHours(firstForm?.time.hour || 0);
        startDate.setMinutes(firstForm?.time.minute || 0);
        createEventMutation.mutate({
            title: firstForm?.title as string,
            id: 0,
            shortDescription: firstForm?.shortDescription as string,
            startDate: startDate.getTime() * 1000000 as number,
            endDate: endDate.getTime() * 1000000 as number,
            ticketsAmount: firstForm?.ticketsAmount as number,
            status: "NotStarted",
            categories: Array.from(firstForm?.categories || []),
            eventType: firstForm?.eventType as "OnSite" | "Online" | "Hybrid",
            price: firstForm?.price as number,
            longDescription: firstForm?.longDescription as string,
            place: 'Bolivia',
            banner: secondForm?.banner as string,
            imagenPrincipal: secondForm?.imagenPrincipal as string,
            speakers: data.speakers
        })
    }
    const onCancelThird = (data: CreateEventThirdForm) => {
        setThirdForm(data)
        setStep(1);
    }

    return (
        <ImageLinear height={step < 2 ? 'auto' : '100dvh'} >
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
            <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl my-20 xs:my-0'
                onSubmit={methods.handleSubmit(onSubmit)}>
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
            <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl my-20 xs:my-0'
                onSubmit={methods.handleSubmit(onSubmit)}>
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
            <form className='bg-[#000000d9] backdrop-blur-[2px] flex flex-col p-4 py-8 xs:p-8 gap-4 rounded-xl self-center justify-self-center'
                onSubmit={methods.handleSubmit(onSubmit)}>
                <div className='flex w-full justify-end'>
                    <CustomButton buttonType='button' type='action'
                        onClick={() => onCancel(methods.getValues())}>{'Back ⬅️'}</CustomButton>
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
                <button
                    className='grid place-items-center text-sm rounded-3xl border p-4 w-full self-center border-white'
                    onClick={() => append({
                        name: '',
                        position: ''
                    })}>Add Speaker 🗣️
                </button>
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
