const EXPENSES_STORAGE_KEY = 'expenses';

/**
 * Retrieves expenses array from localStorage.
 */
export const getExpenses = () => {
  const data = localStorage.getItem(EXPENSES_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

/**
 * Saves the provided expenses array to localStorage.
 */
export const saveExpenses = (expenses) => {
  localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
};

/**
 * Adds a single expense to localStorage persisted list.
 */
export const addExpense = (expense) => {
  const expenses = getExpenses();
  const newExpense = {
    ...expense,
    id: Date.now().toString(),
    paymentMode: expense.paymentMode || '',
    status: expense.status || ''
  };
  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  return newExpense;
};

/**
 * Updates an expense by id in localStorage.
 */
export const updateExpense = (updatedExpense) => {
  let expenses = getExpenses();
  // Replace matching expense with updated one
  expenses = expenses.map(expense =>
    expense.id === updatedExpense.id ? updatedExpense : expense
  );
  saveExpenses(expenses);
};

/**
 * Deletes an expense by id from localStorage.
 */
export const deleteExpense = (id) => {
  let expenses = getExpenses();
  // Remove expense by filtering out matching id
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses(expenses);
};
