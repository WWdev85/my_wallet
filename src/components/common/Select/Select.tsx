import { useState } from 'react';
import './Select.scss';
import { Group } from '../Group/Group';
import { OperationGroup } from '../../../types';
import { FaAngleDown } from 'react-icons/fa';

export interface SelectOptions {
    label: string,
    value: string,
}


interface SelectProps {
    label?: string;
    value: string;
    options?: OperationGroup[];
    selectOptions?: SelectOptions[]
    onChangeFn: Function;
    selected: string | undefined;
    className?: string;
}

export const Select = (props: SelectProps) => {
    const { label, selected, options, onChangeFn, selectOptions, className } = props
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const selOptions = !selectOptions ? options?.map(option => {
        return (
            <div key={option.value} onClick={() => handleSelect((option.value))}>
                <Group className={'option'} key={option.value} group={option} />
            </div>

        )
    }) : selectOptions?.map(option => {
        return (
            <div key={option.label} onClick={() => handleSelect((option.value))}>
                <div className={'option'} key={option.label} >{option.value}</div>
            </div>

        )
    })

    const handleSelect = (option: string) => {
        onChangeFn(option)
        toggleOpen()
    }

    return (
        <div className={'select ' + className} >
            <label className='label' htmlFor="">{label}</label>
            <div className='dropdown'>
                <div onClick={toggleOpen} className="dropdown__trigger trigger">
                    {selected}
                    <FaAngleDown className='down-arrow' />
                </div>
                {isOpen && (
                    <div className="dropdown__content content">
                        {selOptions}
                    </div>
                )}
            </div>
        </div>
    )
}