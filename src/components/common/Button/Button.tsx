import './Button.scss';

interface ButtonProps {
    name: string;
    className?: string;
    onClickFn?: Function;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

export const Button = (props: ButtonProps) => {
    const { name, onClickFn, type, className } = props

    const handleClick = () => {
        if (onClickFn)
            onClickFn()
    }

    return (
        <button type={type} onClick={handleClick} className={`button ${className}`}>{name}</button>
    )
}