import { View, FlatList, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
    const renderExpenseItem = ({ item }) => <ExpenseItem {...item} />;
    return <FlatList data={expenses} renderItem={renderExpenseItem} />;
}

export default ExpensesList;
