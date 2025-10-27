import { useState, useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    const handleClearError = () => setError(null);

    useEffect(() => {
        async function getExpenses() {
            try {
                const fetchedExpenses = await fetchExpenses();
                expensesContext.setExpenses(fetchedExpenses);
            } catch {
                setError("Could not fetch expenses!");
            } finally {
                setIsLoading(false);
            }
        }

        getExpenses();
    }, []);

    if (isLoading) return <LoadingOverlay />;

    if (!isLoading && error) return <ErrorOverlay message={error} onConfirm={handleClearError} />;

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 days"
            fallbackText="No expenses registered for the last 7 days."
        />
    );
}

export default RecentExpenses;
