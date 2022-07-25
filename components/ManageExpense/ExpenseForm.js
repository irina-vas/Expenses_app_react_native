import { useState } from "react"
import { View, StyleSheet, Text, Alert } from "react-native"
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export const ExpenseForm = ({ cancelHandler, submitButtonLabel, onSubmit, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: !!defaultValues
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: !!defaultValues
    },
    description:  {
      value: defaultValues ? defaultValues.description:  '',
      isValid: !!defaultValues
    }
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true
        },
      };
    });
  }

  const submitHandler = () => {
    const expenseData ={
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid ) {
      //Alert.alert('Invalid input', 'Please check your input values');
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: { value: currentInputs.description.value, isValid: descriptionIsValid },
        }
      })
      return;
    }
    onSubmit(expenseData);
  }

  const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.innerContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keboardType: 'decimal-pad',
            value: inputs.amount.value,
            onChangeText: inputChangeHandler.bind(this, 'amount')
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChangeHandler.bind(this, 'date')
          }}
        />
      </View> 
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //autocorrect: false,
          value: inputs.description.value,
          onChangeText: inputChangeHandler.bind(this, 'description')
        }}
      />
      { formIsValid && <Text>Invalid input values. Please check your data!</Text> }
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
