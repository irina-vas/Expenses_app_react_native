import { Text, View, StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";

export const RecentExpenses = () => {
  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" />
  )
};

const styles = StyleSheet.create({
  container: {

  },
});