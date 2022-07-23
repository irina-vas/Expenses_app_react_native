import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7Daysago = getDateMinusDays(today, 7);
    return expense.date > date7Daysago;
  })
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  )
};

const styles = StyleSheet.create({
  container: {

  },
});