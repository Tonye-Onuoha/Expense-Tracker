import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);
    return (
        <ExpensesOutput
            expenses={expensesContext.expenses}
            expensesPeriod="Total"
            fallbackText="No registered expenses found."
        />
    );
}

export default AllExpenses;
