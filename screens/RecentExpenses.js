import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7Daysago = getDateMinusDays(today, 7);
    return expense.date > date7Daysago;
  })

  useEffect(() => {
    const gettingExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch {
        setError('Coul not fetch expenses!')
      }
      setIsFetching(false);
    }
    gettingExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      fallbackText="No expenses registered for the last 7 days"
      expenses={recentExpenses} expensesPeriod="Last 7 Days"
    />
  )
};

const styles = StyleSheet.create({
  container: {

  },
});