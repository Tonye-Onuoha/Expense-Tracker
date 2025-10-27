import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import GlobalStyles from "../../constants/styles";
import { getFormatted } from "../../utils/date";

function ExpenseForm({ submitButtonLabel, selectedExpense, onCancel, onSubmit }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: selectedExpense ? selectedExpense.amount.toString() : "",
            isValid: true // this simply prevents us from getting initial error-text when adding a new expense
        },
        date: {
            value: selectedExpense ? getFormatted(selectedExpense.date) : "",
            isValid: true // this simply prevents us from getting initial error-text when adding a new expense
        },
        description: {
            value: selectedExpense ? selectedExpense.description : "",
            isValid: true // this simply prevents us from getting initial error-text when adding a new expense
        }
    });

    const handleInputChange = (inputIdentifier, enteredValue) =>
        // In our approach here we set "isValid" to true by default (even though it might be false) because we can always validate it again when the form is submitted.
        setInputs((prevInputs) => ({ ...prevInputs, [inputIdentifier]: { value: enteredValue, isValid: true } }));

    const handleSubmitForm = () => {
        const expenseData = {
            amount: +inputs.amount.value, // unary operator (converts the amount string to a number)
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (amountIsValid && dateIsValid && descriptionIsValid) {
            onSubmit(expenseData);
        } else {
            setInputs((prevInputs) => ({
                amount: { value: prevInputs.amount.value, isValid: amountIsValid },
                date: { value: prevInputs.date.value, isValid: dateIsValid },
                description: { value: prevInputs.description.value, isValid: descriptionIsValid }
            }));
        }
    };

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        value: inputs.amount.value,
                        keyboardType: "decimal-pad",
                        onChangeText: (changedText) => handleInputChange("amount", changedText)
                    }}
                    style={styles.rowInput}
                    invalid={!inputs.amount.isValid}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        value: inputs.date.value,
                        keyboardType: "decimal-pad",
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: (changedText) => handleInputChange("date", changedText)
                    }}
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                />
            </View>

            <Input
                label="Description"
                textInputConfig={{
                    value: inputs.description.value,
                    placeholder: "Enter an expense.",
                    multiline: true,
                    onChangeText: (changedText) => handleInputChange("description", changedText)
                }}
                invalid={!inputs.description.isValid}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid input values - please re-enter valid input data</Text>
            )}
            <View style={styles.buttonsContainer}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={handleSubmitForm} style={styles.button}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    title: {
        marginVertical: 24,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        margin: 8,
        textAlign: "center",
        color: GlobalStyles.colors.error500
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
});
