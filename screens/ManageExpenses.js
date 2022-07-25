import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, postExpense, updateExpense } from "../util/http";
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setError] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add expense'
    })
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsFetching(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch {
      setError('Could not delete expense - please try again later');
      setIsFetching(false);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = async (expenseData) => {
    setIsFetching(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await postExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch {
      setError('Could not save data - please try again later');
      setIsFetching(false);
    }
  }

  const errorHandler = () => {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error && ! isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        cancelHandler={cancelHandler}
        submitButtonLabel={ isEditing ? 'Update' : 'Add' }
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors. primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
});