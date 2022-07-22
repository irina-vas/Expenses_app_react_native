import { StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";

export const AllExpenses = () => {
  return (
    <ExpensesOutput expensesPeriod="Total" />
  )
};

const styles = StyleSheet.create({
  container: {

  },
});