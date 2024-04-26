import { Button } from "@nextui-org/react"

type CustomButtonProps = {
    type?: 'primary' | 'secondary' | 'action'
    onClick?: () => void
    children?: React.ReactNode
}

const buttonType = {
    base: 'm-0 text-white font-bold rounded-[2rem] py-6 px-10 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[103%]',
    primary: 'bg-pink-500',
    secondary: 'bg-transparent border-2 border-white',
    action: 'bg-white text-blue-600 border-2 border-blue-600',
}

function CustomButton({ onClick, children, type = 'primary' }: CustomButtonProps) {
    return (
        <Button className={`${buttonType.base} ${buttonType[type]}`} onPress={onClick}>
            {children}
        </Button>
    )
}

export default CustomButton
