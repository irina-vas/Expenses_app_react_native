import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export const AllExpenses = () => {
  const expensesCts = useContext(ExpensesContext);
  return (
    <ExpensesOutput fallbackText="No registered expenses found" expenses={expensesCts.expenses} expensesPeriod="Total" />
  )
};

const styles = StyleSheet.create({
  container: {

  },
});