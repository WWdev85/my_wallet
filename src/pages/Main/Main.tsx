import { useEffect, useState } from 'react';
import { Select } from '../../components';
import './Main.scss';
import CanvasJSReact from '@canvasjs/react-charts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setOperations } from '../../redux/features/balance/balance-slice';
import { OperationType } from '../../types';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const Main = () => {


    const { operations } = useSelector((store: RootState) => store.balance)
    const [currentYear, setCurrentYear] = useState<string>((new Date().getFullYear() as unknown as string))
    const [monthsExpenses, setmonthsExpenses] = useState<number[]>([])
    const [monthsIncomes, setmonthsIncomes] = useState<number[]>([])
    const [operationYears, setOperationYears] = useState<string[]>([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setOperations(window.localStorage.getItem('operations') as string))
    }, [dispatch])

    useEffect(() => {
        const years: string[] = []
        operations.map((operation) => {
            const year = operation.date.getFullYear() as unknown as string
            if (!years.find(y => y === year)) {
                years.push(year)
            }
            return null
        })
        setOperationYears(years)
    }, [operations])



    const selectOptions = operationYears.map((operation) => {
        return {
            label: operation,
            value: operation
        }
    })



    useEffect(() => {

        const calculateMonthExpenses = () => {
            const expenses: number[] = []
            const op = operations.filter((operation) => {
                return operation.date.getFullYear() as unknown as string === currentYear && operation.type === OperationType.expense
            })

            for (let i = 0; i < 12; i++) {
                let amount = 0
                op.filter((operation) => {
                    return operation.date.getMonth() as unknown as string === i as unknown as string
                }).map((operation) => {
                    amount += operation.amount
                    return null
                })
                expenses[i] = Math.abs(amount / 100)
            }
            setmonthsExpenses(() => expenses)
        }

        const calculateMonthIncomes = () => {
            const incomes: number[] = []
            const op = operations.filter((operation) => {
                return operation.date.getFullYear() as unknown as string === currentYear && operation.type === OperationType.income
            })

            for (let i = 0; i < 12; i++) {
                let amount = 0
                op.filter((operation) => {
                    return operation.date.getMonth() as unknown as string === i as unknown as string
                }).map((operation) => {
                    amount += operation.amount
                    return null
                })
                incomes[i] = Math.abs(amount / 100)
            }
            setmonthsIncomes(() => incomes)
        }
        calculateMonthExpenses()
        calculateMonthIncomes()
    }, [currentYear, operations])





    const options = {
        title: {
            text: "Bilans wpływów i wydatków za rok: " + currentYear,
            fontFamily: "Open Sans",       // Ustawienie czcionki tytułu
            fontSize: 28,              // Ustawienie rozmiaru czcionki tytułu
            fontWeight: "normal",        // Ustawienie grubości czcionki
            fontColor: "#333333"
        },
        data: [{
            type: "column",
            name: "Wpływy",
            color: "#33A1FF",
            fontFamily: "Open Sans",
            showInLegend: true,
            dataPoints: [
                { label: "Styczeń", y: monthsIncomes[0] },
                { label: "Luty", y: monthsIncomes[1] },
                { label: "Marzec", y: monthsIncomes[2] },
                { label: "Kwiecień", y: monthsIncomes[3] },
                { label: "Maj", y: monthsIncomes[4] },
                { label: "Czerwiec", y: monthsIncomes[5] },
                { label: "Lipiec", y: monthsIncomes[6] },
                { label: "Sierpień", y: monthsIncomes[7] },
                { label: "Wrzesień", y: monthsIncomes[8] },
                { label: "Październik", y: monthsIncomes[9] },
                { label: "Listopad", y: monthsIncomes[10] },
                { label: "Grudzień", y: monthsIncomes[11] },
            ]
        },
        {
            type: "column",
            name: "Wydatki",
            color: "#FF5733",
            fontFamily: "Open Sans",
            showInLegend: true,
            dataPoints: [
                { label: "Styczeń", y: monthsExpenses[0] },
                { label: "Luty", y: monthsExpenses[1] },
                { label: "Marzec", y: monthsExpenses[2] },
                { label: "Kwiecień", y: monthsExpenses[3] },
                { label: "Maj", y: monthsExpenses[4] },
                { label: "Czerwiec", y: monthsExpenses[5] },
                { label: "Lipiec", y: monthsExpenses[6] },
                { label: "Sierpień", y: monthsExpenses[7] },
                { label: "Wrzesień", y: monthsExpenses[8] },
                { label: "Październik", y: monthsExpenses[9] },
                { label: "Listopad", y: monthsExpenses[10] },
                { label: "Grudzień", y: monthsExpenses[11] },
            ]
        }]
    }

    const handleChangeYear = (year: string) => {
        setCurrentYear(year);
    }

    return (
        <div className='main'>
            <div className='main__header'></div>
            <Select className={'main__select'} value={''} selectOptions={selectOptions} onChangeFn={handleChangeYear} selected={currentYear} />

            <CanvasJSChart options={options}
            />
        </div>
    )
}

