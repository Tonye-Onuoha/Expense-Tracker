import { useState, useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import GlobalStyles from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { idGenerator } from "../utils/idGenerator";

function ManageExpense({ navigation, route }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const expensesContext = useContext(ExpensesContext);

    const expenseId = route.params?.expenseId;
    const selectedExpense = expensesContext.expenses.find((expense) => expense.id === expenseId);
    const isEditing = expenseId ? true : false;

    const handleClearError = () => setError(null);

    const handleDeleteExpense = async () => {
        setIsSubmitting(true);
        try {
            // await deleteExpense(expenseId);
            expensesContext.deleteExpense(expenseId);
            navigation.goBack();
        } catch {
            setError("Could not delete this expense!");
            setIsSubmitting(false);
        }
    };

    const handleCancelButton = () => {
        navigation.goBack();
    };

    const handleConfirmButton = async (expenseData) => {
        setIsSubmitting(true);
        if (isEditing) {
            try {
                // we wait for this operation to execute completely before navigating to the previous screen.
                // await updateExpense(expenseId, expenseData);
                expensesContext.updateExpense(expenseId, expenseData);
                navigation.goBack();
            } catch {
                setError("Could not update this expense!");
                setIsSubmitting(false);
            }
        } else {
            try {
                // we save to the database first in order to get the auto-created id.
                // const expenseId = await storeExpense(expenseData);
                expensesContext.addExpense({ ...expenseData, id: idGenerator() });
                navigation.goBack();
            } catch {
                setError("Could not register new expense!");
                setIsSubmitting(false);
            }
        }
    };

    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    if (isSubmitting) return <LoadingOverlay />;

    if (!isSubmitting && error) return <ErrorOverlay message={error} onConfirm={handleClearError} />;

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onCancel={handleCancelButton}
                onSubmit={handleConfirmButton}
                selectedExpense={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon={"trash"}
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={handleDeleteExpense}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
});
