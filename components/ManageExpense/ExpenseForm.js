import { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export const ExpenseForm = ({ cancelHandler, submitButtonLabel, onSubmit }) => {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: '',
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((prev) => {
      return {
        ...prev,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  const submitHandler = () => {
    const expenseData ={
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    };
    onSubmit(expenseData);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.innerContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keboardType: 'decimal-pad',
            value: inputValues.amount,
            onChangeText: inputChangeHandler.bind(this, 'amount')
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputValues.date,
            onChangeText: inputChangeHandler.bind(this, 'date')
          }}
        />
      </View> 
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            autocorrect: false,
            value: inputValues.description,
            onChangeText: inputChangeHandler.bind(this, 'description')
          }}
        />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 24
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
});
