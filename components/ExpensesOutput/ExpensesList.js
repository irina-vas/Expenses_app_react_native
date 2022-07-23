import { View, StyleSheet, FlatList, Text } from "react-native";
import { ExpensesItem } from "./ExpenseItem";

export const ExpensesList = ({ expenses }) => {
  const renderExpenseItem = (itemData) => {
    const props = itemData.item;
    return <ExpensesItem {...props} />
  }

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  )
};

const styles = StyleSheet.create({
  container: {

  },
});