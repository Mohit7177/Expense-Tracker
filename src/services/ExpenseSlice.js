import { createSlice } from '@reduxjs/toolkit';
import * as ExpenseService from './ExpenseServices'

/**
 * Initial state loaded from localStorage via ExpenseService
 */
const initialState = {
  items: ExpenseService.getExpenses(),
};

/**
 * Redux slice to manage expenses with add, update, delete reducers.
 */
const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    /**
     * Add a new expense and persist to localStorage.
     * Current state of expenses
     */
    addExpense(state, action) {
      // Add new expense to current state
      state.items.push(action.payload);
      // Persist updated expenses to localStorage
      ExpenseService.addExpense(action.payload);
    },

    /**
     * Update an existing expense by id and persist.
     * Current state of expenses
     */
    updateExpense(state, action) {
      // Find index of expense to be updated
      const index = state.items.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        // Replace the existing expense with the updated one
        state.items[index] = action.payload;
        // Persist updated expenses to localStorage
        ExpenseService.updateExpense(action.payload);
      }
    },

    /**
     * Delete an expense by id and persist.
     * Current state of expenses
     */
    deleteExpense(state, action) {
      // Filter out the expense to delete by id
      state.items = state.items.filter(expense => expense.id !== action.payload);
      // Persist updated expenses to localStorage
      ExpenseService.deleteExpense(action.payload);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
