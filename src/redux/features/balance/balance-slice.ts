import { createSlice } from "@reduxjs/toolkit";
import { Operation } from "../../../types";

interface BalanceState {
    balance: number;
    operations: Operation[];
}

const initialState: BalanceState = {
    balance: 0,
    operations: []
}

interface SetOperations {
    payload: string
}

interface AddOperation {
    payload: Operation
}

interface EditOperation {
    payload: Operation
}
interface DeleteOperation {
    payload: string
}

export const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setBalance: (state) => {
            let balance = 0;
            for (let operation of state.operations) {
                balance += operation.amount
            }
            state.balance = balance
            window.localStorage.setItem('balance', state.balance as unknown as string)
        },
        setOperations: (state, action: SetOperations) => {
            const op = JSON.parse(action.payload)
            for (let p of op) {
                p.date = new Date(p.date)
            }
            state.operations = op
            setBalance()

        },
        addOperation: (state, action: AddOperation) => {
            state.operations.push(action.payload)
            window.localStorage.setItem('operations', JSON.stringify(state.operations))
            setBalance()
        },
        editOperation: (state, action: EditOperation) => {
            const index = state.operations.findIndex(op => op.id === action.payload.id);
            if (index !== -1) {
                state.operations[index] = action.payload;
            }
            window.localStorage.setItem('operations', JSON.stringify(state.operations))
            setBalance()
        },
        deleteOperation: (state, action: DeleteOperation) => {
            state.operations = state.operations.filter(op => op.id !== action.payload);
            window.localStorage.setItem('operations', JSON.stringify(state.operations))
            setBalance()
        }
    }
})

export const { setBalance, setOperations, addOperation, editOperation, deleteOperation } = balanceSlice.actions;