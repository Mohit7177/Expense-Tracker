import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './ExpenseSlice';

/**
 * Redux store setup with expenses reducer.
 */
const store = configureStore({
  reducer: { expenses: expensesReducer },
});


export default store;
