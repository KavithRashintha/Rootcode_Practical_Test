import { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
    const [currentExpenseId, setCurrentExpenseId] = useState(null);

    return (
        <ExpenseContext.Provider value={{ currentExpenseId, setCurrentExpenseId }}>
            {children}
        </ExpenseContext.Provider>
    );
};
