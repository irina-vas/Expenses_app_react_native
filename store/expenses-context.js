import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'el1',
    description: 'a dress',
    amount: 59.99,
    date: new Date('2022-07-15')
  },
  {
    id: 'el2',
    description: 'sneakers',
    amount: 129.99,
    date: new Date('2022-07-18')
  },
  {
    id: 'el3',
    description: 'a pair of trousers',
    amount: 40.00,
    date: new Date('2022-07-18')
  }, 
  {
    id: 'el4',
    description: 'a book',
    amount: 14.99,
    date: new Date('2022-07-19')
  },
  {
    id: 'el5',
    description: 'mobile phone',
    amount: 200.99,
    date: new Date('2022-07-19')
  },
  {
    id: 'el6',
    description: 'soap',
    amount: 0.99,
    date: new Date('2022-07-19')
  },
  {
    id: 'el7',
    description: 'shapoo',
    amount: 5.99,
    date: new Date('2022-07-10')
  },
  {
    id: 'el8',
    description: 'jeans',
    amount: 48.79,
    date: new Date('2022-06-20')
  },
  {
    id: 'el9',
    description: 'cd camera',
    amount: 350.99,
    date: new Date('2022-05-22')
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {}
});

const expensesReduser = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
      default:
        return state;
  }
}

export const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch ] = useReducer(expensesReduser, DUMMY_EXPENSES);
  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  }
  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }
  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }})
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }
  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}
