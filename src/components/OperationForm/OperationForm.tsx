import { useEffect, useState } from 'react';
import { Operation, OperationGroup, OperationType } from '../../types';
import './OperationForm.scss';
import { Button, Input, InputType, Select } from '../common';
import { groups } from '../../constants';

interface OperationFormProps {
    operation?: Operation;
};

export const OperationForm = (props: OperationFormProps) => {
    //const { id } = props;
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<OperationType>();
    const [date, setDate] = useState<Date>(new Date());
    const [group, setGroup] = useState<OperationGroup | undefined>();
    const [amount, setAmount] = useState<number>(0.00);

    useEffect(() => {
        if (!type) {
            setType(OperationType.expense)
        }
    }, [type]);

    const handleChangeName = (name: string) => {
        setName(name)
    }

    const handleChangeType = (type: OperationType) => {
        setType(type);
        setGroup(undefined)
    }

    const handleChangeDate = (date: string) => {
        setDate(new Date(date));
    }

    const handleChangeAmount = (amount: number) => {
        setAmount(amount);
    }

    const handleChangeGroup = (group: string) => {
        setGroup(groups.find(g => g.value === group))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <form className='operation-form' onSubmit={handleSubmit}>
            <div className='operation-form__type'>
                <div className={type === OperationType.income ? 'type-button active' : 'type-button'} onClick={() => { handleChangeType(OperationType.income) }}>{OperationType.income}</div>
                <div className={type === OperationType.expense ? 'type-button active' : 'type-button'} onClick={() => { handleChangeType(OperationType.expense) }}>{OperationType.expense}</div>
            </div>
            <div className='operation-form__body'>
                <Input type={InputType.text} label='nazwa' value={name} onChangeFn={handleChangeName} />
                <Select onChangeFn={handleChangeGroup} label={'Kategoria'} value={''} options={groups.filter(group => group.type === type)} selected={group?.label} />
                <Input type={InputType.date} label='data' value={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`} onChangeFn={handleChangeDate} />
                <Input type={InputType.number} label='kwota' value={amount} onChangeFn={handleChangeAmount} />
                <Button className='save-button' name={'Zapisz'} type="submit" />
            </div>

        </form>
    );
}