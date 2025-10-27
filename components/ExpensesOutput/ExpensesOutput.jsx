import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import GlobalStyles from "../../constants/styles";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    const content = <Text style={styles.infoText}>{fallbackText}</Text>;

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {expenses.length > 0 ? <ExpensesList expenses={expenses} /> : content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        marginTop: 32,
        fontSize: 16,
        textAlign: "center",
        color: "white"
    }
});
