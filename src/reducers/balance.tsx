import { createSlice } from '@reduxjs/toolkit'

export interface BalanceState {
    amount: number
}

const initialState: BalanceState = {
    amount: 0
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        balanceIncrease: (state, action) => {
            return {
                ...state,
                amount: state.amount + action.payload
            }
        },
        balanceDecrease: (state, action) => {
            return {
                ...state,
                amount: state.amount - action.payload
            }
        }}
    })

export default balanceSlice.reducer;
export const { balanceIncrease, balanceDecrease } = balanceSlice.actions;