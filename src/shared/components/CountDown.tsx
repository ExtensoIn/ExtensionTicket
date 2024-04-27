type CountDownProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountDown({ days, hours, minutes, seconds }: CountDownProps) {
  return (
    <div>
      <div className='flex gap-4 w-full justify-center lg:justify-around'>
        <CountDownElement unit='Days' value={days} />
        <CountDownElement unit='Hours' value={hours} />
        <CountDownElement unit='Minutes' value={minutes} />
        <CountDownElement unit='Seconds' value={seconds} />
      </div>
    </div>
  )
}

export default CountDown

type CountDownElementProps = {
  unit: string;
  value: number;
}

function CountDownElement({ unit, value }: CountDownElementProps) {
  return (
    <div className="flex flex-col items-center">
      <span className='text-xl xs:text-6xl font-AbhayaLibre font-extrabold'>{value}</span>
      <span className='text-base xs:text-lg md:text-2xl font-AbhayaLibre font-semibold'>{unit}</span>
    </div>
  )
}