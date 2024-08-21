import { useEffect, useState } from 'react';
import { Operation, OperationGroup, OperationType } from '../../types';
import './OperationForm.scss';
import { Button, Input, InputType, Select } from '../common';
import { addOperation, editOperation, deleteOperation } from "../../redux/features/balance/balance-slice";
import { groups } from '../../constants';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';

interface OperationFormProps {
    operation?: Operation;
    closeFn: Function
};

export const OperationForm = (props: OperationFormProps) => {
    const { closeFn, operation } = props;
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<OperationType>();
    const [date, setDate] = useState<Date>(new Date());
    const [group, setGroup] = useState<OperationGroup | undefined>();
    const [amount, setAmount] = useState<number>(0.00);
    const dispatch = useDispatch();

    useEffect(() => {
        if (operation) {
            setName(operation.name)
            setType(operation.type)
            setGroup(groups.find(g => g.value === operation.group))
            setDate(operation.date)
            setAmount(Math.abs(operation.amount / 100))
        } else {
            setType(OperationType.expense)
        }
    }, [operation])

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

        const newOperation: Operation = {
            id: operation ? operation.id : uuid(),
            name,
            type: type as OperationType,
            group: group?.value as string,
            date: date as Date,
            amount: (type === OperationType.income ? amount : -amount) * 100,
        }
        if (operation) {
            dispatch(editOperation(newOperation))
        } else {
            dispatch(addOperation(newOperation))
        }
        closeFn()
    }

    const handleDelete = () => {
        if (operation?.id) {
            dispatch(deleteOperation(operation?.id))
        }

    }

    return (
        <form className='operation-form' >
            <div className='operation-form__type'>
                <div className={type === OperationType.income ? 'type-button active' : 'type-button'} onClick={() => { handleChangeType(OperationType.income) }}>{OperationType.income}</div>
                <div className={type === OperationType.expense ? 'type-button active' : 'type-button'} onClick={() => { handleChangeType(OperationType.expense) }}>{OperationType.expense}</div>
            </div>
            <div className='operation-form__body'>
                <Input type={InputType.text} label='nazwa' value={name} onChangeFn={handleChangeName} />
                <Select onChangeFn={handleChangeGroup} label={'Kategoria'} value={''} options={groups.filter(group => group.type === type)} selected={group?.label} />
                <Input type={InputType.date} label='data' value={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`} onChangeFn={handleChangeDate} />
                <Input type={InputType.number} label='kwota' value={amount} onChangeFn={handleChangeAmount} />
                <Button className='save-button' name={'Zapisz'} disabled={!(name !== '' && group !== undefined)} onClickFn={handleSubmit} />
                {operation && <Button className='save-button delete' name={'Usuń'} onClickFn={handleDelete} />}
            </div>

        </form>
    );
}