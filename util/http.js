import axios from "axios";

const BACKEND_URL = 'https://react-native-app-aedcf-default-rtdb.firebaseio.com/';

export const postExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + 'expenses.json',
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(BACKEND_URL + 'expenses.json');
  const expenses = [];
  console.log('response.data',response.data)
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export const updateExpense = async (id, expenseData) => {
  return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}

export const deleteExpense = async (id) => {
  return axios.delete(BACKEND_URL + `expenses/${id}.json`);
}

