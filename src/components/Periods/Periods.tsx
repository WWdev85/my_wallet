import { ReactElement } from 'react';
import { PeriodType } from '../../pages';
import './Periods.scss';

interface PeriodsProps {
    period: PeriodType | undefined,
    setPeriodType: Function;
}

export const Periods = (props: PeriodsProps) => {
    const { period, setPeriodType } = props

    let periods: ReactElement[] = [];

    for (let per in PeriodType) {
        const value = PeriodType[per as keyof typeof PeriodType]
        periods.push(<div key={value} className={value !== period ? 'period' : 'period active'} onClick={() => handleChange(value)}>{value}</div>);
    }

    const handleChange = (period: PeriodType) => {
        setPeriodType(period)
    }

    return (
        <div className='periods'>
            {periods}
        </div>
    )
}