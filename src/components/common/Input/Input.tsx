import './input.scss';

export enum InputType {
    text = 'text',
    date = 'date',
    number = 'number',
    month = 'month',
    year = 'year',
}

interface InputProps {
    type: InputType;
    label?: string;
    value: string | number;
    onChangeFn: Function;
    className?: string;
    placeholder?: string;
}

export const Input = (props: InputProps) => {
    const { type, label, value, onChangeFn, className, placeholder } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: React.ChangeEvent<HTMLInputElement> | string | number
        value = e.target.value
        onChangeFn(value)
    }

    return (
        <div className={`input-container ${className}`}>
            {label && <label className='label' htmlFor="">{label}</label>}
            <input className='input' type={type} min="0" value={value} step="0.01" onChange={handleChange} placeholder={placeholder} />
        </div>
    )
}