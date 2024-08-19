import { useState } from 'react';
import './Select.scss';
import { Group } from '../Group/Group';
import { OperationGroup } from '../../../types';
import { FaAngleDown } from 'react-icons/fa';


interface SelectProps {
    label: string;
    value: string;
    options: OperationGroup[];
    onChangeFn: Function;
    selected: string | undefined;
}

export const Select = (props: SelectProps) => {
    const { label, selected, options, onChangeFn } = props
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const selectOptions = options.map(option => {
        return (
            <div key={option.value} onClick={() => handleSelect((option.value))}>
                <Group className={'option'} key={option.value} group={option} />
            </div>

        )
    })

    const handleSelect = (option: string) => {
        onChangeFn(option)
        toggleOpen()
    }

    return (
        <div className='select'>
            <label className='label' htmlFor="">{label}</label>
            <div className='dropdown'>
                <div onClick={toggleOpen} className="dropdown__trigger trigger">
                    {selected}
                    <FaAngleDown className='down-arrow' />
                </div>
                {isOpen && (
                    <div className="dropdown__content content">
                        {selectOptions}
                    </div>
                )}
            </div>
        </div>
    )
}