import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        selectedExpenseId: null,
    },
    reducers: {
        setSelectedExpenseId: (state, action) => {
            state.selectedExpenseId = action.payload;
        },
        clearSelectedExpenseId: (state) => {
            state.selectedExpenseId = null;
        },
    },
});

export const { setSelectedExpenseId, clearSelectedExpenseId } = expenseSlice.actions;

export default expenseSlice.reducer;
