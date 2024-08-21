
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Modal, OperationForm, OperationsHeader, Periods } from "../../components";
import './Operations.scss';
import { Operation as OperationComponent } from "../../components/Operation/Operation";
import { useDispatch, useSelector } from "react-redux";
import { setBalance, setOperations } from "../../redux/features/balance/balance-slice";
import { RootState } from "../../redux/store";

export enum PeriodType {
    day = "dzień",
    week = "tydzień",
    month = "miesiac",
    year = "rok",
}

export const Operations = () => {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const [periodType, setPeriodType] = useState<PeriodType | undefined>(PeriodType.month)
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const { operations } = useSelector((store: RootState) => store.balance)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBalance())
        dispatch(setOperations(window.localStorage.getItem('operations') as string))
    }, [dispatch])

    const handleOpenModal = () => {
        setIsModalOpened(() => !isModalOpened)
    }

    useEffect(() => {
        dispatch(setBalance())
    },[operations])

    let periodBalance = 0;

    const filterOperations = () => {
        const t1 = startDate.setHours(0, 0, 0, 0) as unknown as Date
        const t2 = endDate.setHours(0, 0, 0, 0) as unknown as Date
        let pBalance = 0;
        return operations.filter((operation) => {
            const t3 = operation.date.setHours(0, 0, 0, 0) as unknown as Date
            return (t3 >= t1 && t3 <= t2)

        }).map((operation) => {
            periodBalance += operation.amount
            return (<li key={operation.id}><OperationComponent key={operation.id} operation={operation} /></li>)
        })
    }

    const filteredOperations = filterOperations()


    return (
        <div className='operations'>
            <OperationsHeader periodType={periodType} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} setPeriodType={setPeriodType} periodeBalance={periodBalance} />
            <ul className='operations__list'>
                {filteredOperations}
            </ul>
            <div className='operations__filter'>
                <Periods period={periodType} setPeriodType={setPeriodType} />
            </div>
            <FaCirclePlus className="operations__add-button" onClick={handleOpenModal} />
            {isModalOpened && <Modal title='Nowa Operacja' setIsModalOpened={setIsModalOpened} children={<OperationForm closeFn={handleOpenModal} />} />}

        </div>
    )
}