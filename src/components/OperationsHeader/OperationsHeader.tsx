import { useEffect } from 'react';
import { PeriodType } from '../../pages';
import { Input, InputType } from '../common';
import './OperationsHeader.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


interface OperationsHeaderProps {
    periodType: PeriodType | undefined;
    periodeBalance: number;
    startDate: Date;
    endDate: Date;
    setStartDate: Function;
    setEndDate: Function;
    setPeriodType: Function;
}

export const OperationsHeader = (props: OperationsHeaderProps) => {
    const { periodType, periodeBalance, startDate, endDate, setEndDate, setStartDate, setPeriodType } = props;
    const { balance } = useSelector((store: RootState) => store.balance)


    useEffect(() => {

        const getFirstAndLastDayOfWeek = () => {
            const currentDate = new Date();
            const currentDayOfWeek = currentDate.getDay();

            const firstDayOfWeek = new Date(currentDate);
            firstDayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);

            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

            setStartDate(firstDayOfWeek);
            setEndDate(lastDayOfWeek)
        }

        const getFirstAndLastDayOfMonth = () => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();

            const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
            setStartDate(firstDayOfMonth);
            setEndDate(lastDayOfMonth)
        }

        const getFirstAndLastDayOfYear = () => {
            const currentYear = new Date().getFullYear();

            const firstDayOfYear = new Date(currentYear, 0, 1);
            const lastDayOfYear = new Date(currentYear + 1, 0, 0);
            setStartDate(firstDayOfYear);
            setEndDate(lastDayOfYear)
        }

        const getToday = () => {
            setStartDate(new Date());
            setEndDate(new Date())
        }

        switch (periodType) {
            case PeriodType.day:
                getToday()
                break;
            case PeriodType.week:
                getFirstAndLastDayOfWeek()
                break;
            case PeriodType.month:
                getFirstAndLastDayOfMonth()
                break;
            case PeriodType.year:
                getFirstAndLastDayOfYear()
                break;
        }
    }, [periodType, setEndDate, setStartDate])





    const handleChangeStartDate = (date: string) => {
        setStartDate(new Date(date));
        setPeriodType(undefined)
    }

    const handleChangeEndDate = (date: string) => {
        setEndDate(new Date(date));
        setPeriodType(undefined)
    }

    const strBalance = ((String)((balance / 100).toFixed(2))).replace('.', ',')
    const strPeriodeBalance = ((String)((periodeBalance / 100).toFixed(2))).replace('.', ',')

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

    return (
        <div className='operations-header'>
            <div className='operations-header__balance'>
                Saldo: <span>{insertSpaces(strBalance)}</span> zł
            </div>
            <div className='operations-header__periode-balance'>
                Suma: <span>{insertSpaces(strPeriodeBalance)}</span> zł
            </div>
            <div className='operations-header__inputs'>
                <Input className='operations-header__input' type={InputType.date} value={`${startDate?.getFullYear()}-${String(startDate?.getMonth() + 1).padStart(2, '0')}-${String(startDate?.getDate()).padStart(2, '0')}`} onChangeFn={handleChangeStartDate} /> -
                <Input className='operations-header__input' type={InputType.date} value={`${endDate?.getFullYear()}-${String(endDate?.getMonth() + 1).padStart(2, '0')}-${String(endDate?.getDate()).padStart(2, '0')}`} onChangeFn={handleChangeEndDate} />
            </div>

        </div>
    )
}