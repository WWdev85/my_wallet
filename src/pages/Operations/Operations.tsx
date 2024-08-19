
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import { Modal, OperationForm, OperationsHeader, Periods } from "../../components";
import './Operations.scss';
import { Operation, OperationType } from "../../types";
import { Operation as OperationComponent } from "../../components/Operation/Operation";

const o: Operation[] = [
    {
        id: "21",
        name: "Kiełbasa",
        type: OperationType.expense,
        group: 'food',
        date: new Date(),
        amount: -54154,
    }
]


export enum PeriodType {
    day = "dzień",
    week = "tydzień",
    month = "miesiac",
    year = "rok",
}

export const Operations = () => {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    //const [operations, setOperations] = useState<Operation[]>([])
    const [periodType, setPeriodType] = useState<PeriodType | undefined>(PeriodType.month)
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    const handleOpenModal = () => {
        setIsModalOpened(() => !isModalOpened)
    }

    const balance = 535898700
    const periodeBalance = -52478
    return (
        <div className='operations'>
            <OperationsHeader periodType={periodType} balance={balance} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} setPeriodType={setPeriodType} periodeBalance={periodeBalance} />
            <ul className='operations__list'>
                <OperationComponent operation={o[0]} />
            </ul>
            <div className='operations__filter'>
                <Periods period={periodType} setPeriodType={setPeriodType} />
            </div>
            <FaCirclePlus className="operations__add-button" onClick={handleOpenModal} />
            {isModalOpened && <Modal title='Operacja' setIsModalOpened={setIsModalOpened} children={<OperationForm />} />}

        </div>
    )
}