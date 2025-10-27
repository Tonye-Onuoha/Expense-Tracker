import { useReducer, createContext } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {},
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: ({ id }) => {},
    updateExpense: (id, { description, amount, date }) => {}
});

function ExpensesReducer(state, action) {
    switch (action.type) {
        case "SET":
            const invertedPayload = action.payload.reverse();
            return invertedPayload;
        case "ADD":
            return [action.payload, ...state];
        case "UPDATE":
            const expenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const expense = state[expenseIndex];
            const updatedExpense = { ...expense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[expenseIndex] = updatedExpense;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesContextProvider = ({ children }) => {
    const [expenses, dispatch] = useReducer(ExpensesReducer, []);

    function setExpenses(expenses) {
        dispatch({ type: "SET", payload: expenses });
    }

    function addExpense(expenseData) {
        dispatch({ type: "ADD", payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    }

    const contextValue = {
        expenses: expenses,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext value={contextValue}>{children}</ExpensesContext>;
};

export default ExpensesContextProvider;
