import { Button } from "@nextui-org/react"

type CustomButtonProps = {
    type?: 'primary' | 'secondary'
    onClick?: () => void
    children?: React.ReactNode
}

const buttonType = {
    base: 'm-0 text-white font-bold rounded-[2rem] py-6 px-10',
    primary: 'bg-pink-500',
    secondary: 'bg-transparent border-2 border-white',
}

function CustomButton({ onClick, children, type = 'primary' }: CustomButtonProps) {
    return (
        <Button className={`${buttonType.base} ${type === 'primary' ? buttonType.primary : buttonType.secondary}`} onPress={onClick}>
            {children}
        </Button>
    )
}

export default CustomButton
