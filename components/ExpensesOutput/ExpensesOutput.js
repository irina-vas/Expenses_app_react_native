import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ExpensesList } from "./ExpensesList";
import { ExpensesSummary } from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: 'el1',
    descriptio: 'a dress',
    amount: 59.99,
    date: new Date('2022-07-15')
  },
  {
    id: 'el2',
    descriptio: 'sneakers',
    amount: 129.99,
    date: new Date('2022-07-18')
  },
  {
    id: 'el3',
    descriptio: 'a pair of trousers',
    amount: 40.00,
    date: new Date('2022-07-18')
  }, 
  {
    id: 'el4',
    descriptio: 'a book',
    amount: 14.99,
    date: new Date('2022-07-19')
  },
  {
    id: 'el5',
    descriptio: 'mobile phone',
    amount: 200.99,
    date: new Date('2022-07-19')
  },
  {
    id: 'el6',
    descriptio: 'soap',
    amount: 0.99,
    date: new Date('2022-07-19')
  },
  {
    id: 'el7',
    descriptio: 'shapoo',
    amount: 5.99,
    date: new Date('2022-07-20')
  },
  {
    id: 'el8',
    descriptio: 'jeans',
    amount: 48.79,
    date: new Date('2022-07-20')
  },
  {
    id: 'el9',
    descriptio: 'cd camera',
    amount: 350.99,
    date: new Date('2022-07-22')
  },
]

export const ExpensesOutput = ({ expenses, expensesPeriod }) => {

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} expensesPeriod={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
});