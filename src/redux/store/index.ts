import { configureStore } from "@reduxjs/toolkit";
import { balanceSlice } from "../features/balance/balance-slice";

export const store = configureStore({
    reducer: {
        balance: balanceSlice.reducer,
        operations: balanceSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>