import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ExpensesList } from "./ExpensesList";
import { ExpensesSummary } from "./ExpensesSummary";

export const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  const EmptyExpenses = () => {
    return (
      <Text style={styles.infoText}>{fallbackText}</Text>
    )
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {expenses.length > 0 ? 
        <ExpensesList expenses={expenses} /> : 
        <EmptyExpenses />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16
  }
});