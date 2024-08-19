import { groups } from '../../constants';
import { OperationGroup, Operation as OperationInterface, OperationType } from '../../types';
import { Group } from '../common';
import './Operation.scss';

interface OperationProps {
    operation: OperationInterface;
}

export const Operation = (props: OperationProps) => {
    const { operation } = props;

    const strAmount = ((String)((operation.amount / 100).toFixed(2))).replace('.', ',')
    const insertSpaces = (str: string) => {
        let length = str.length;
        if (length >= 9) {
            str = str.slice(0, length - 9) + ' ' + str.slice(length - 9);
            length++;
        }
        if (length >= 6) {
            str = str.slice(0, length - 6) + ' ' + str.slice(length - 6);
        }
        return str;
    }

    const date = `${String(operation.date.getDate()).padStart(2, '0')}-${String(operation.date.getMonth() + 1).padStart(2, '0')}-${operation.date.getFullYear()}`
    return (
        <div className='operation'>
            <Group className='operation__group' group={(groups.find((g) => g.value === operation.group)) as OperationGroup} />
            <div className='operation__name'>{operation.name}</div>
            <div className='operation__date'>{date}</div>
            <div className={operation.type === OperationType.expense ? 'operation__amount' : 'operation__amount income'}>{insertSpaces(strAmount)} zł</div>
        </div>
    )
}