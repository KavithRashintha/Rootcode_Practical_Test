import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Expense from '../components/expense';
import AddExpenseModal from '../modals/addExpenseModal';
import UpdateExpenseModal from '../modals/updateExpenseModal';
import { Box, Button, FormControl, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [response, setResponse] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [category, setCategory] = useState('All');
    const selectedExpenseId = useSelector((state) => state.expense.selectedExpenseId);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const categories = ['Food', 'Household', 'Social Life', 'Transportation', 'Health', 'Miscellaneous'];

    const fetchExpenses = async () => {
        const url = category === 'All'
            ? 'http://localhost:5000/expenses/getAllExpenses'
            : `http://localhost:5000/expenses/getExpensesByCategory/${category}`;

        try {
            const response = await axios.get(url);
            setResponse(response);
            setExpenses(response.data);
        } catch (error) {
            console.log(response.status);
            if (response.status === 200) {
                alert(`No expenses found for the category: ${category}`);
            }
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [category]);

    useEffect(() => {
        if (selectedExpenseId) {
            const expenseToUpdate = expenses.find(exp => exp._id === selectedExpenseId);
            setSelectedExpense(expenseToUpdate);
        }
    }, [selectedExpenseId, expenses]);

    const handleAddExpense = async (newExpense) => {
        setModalOpen(false);
        await fetchExpenses();
    };

    const handleUpdateExpense = async () => {
        setUpdateModalOpen(false);
        await fetchExpenses();
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ margin: 2, paddingLeft: 5, paddingTop: 4, paddingRight: 5 }}>
                <FormControl variant="outlined" sx={{ minWidth: 220 }}>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="All">All Categories</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                >
                    Create Expense
                </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                {expenses.length > 0 ? (
                    expenses.map(expense => (
                        <Expense
                            key={expense._id}
                            id={expense._id}
                            {...expense}
                            onEdit={(expenseData) => {
                                setUpdateModalOpen(true);
                            }}
                        />
                    ))
                ) : (
                    <p>No expenses to display. Please add some expenses.</p>
                )}
            </Box>
            <AddExpenseModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleAddExpense={handleAddExpense}
            />
            <UpdateExpenseModal
                open={updateModalOpen}
                handleClose={() => setUpdateModalOpen(false)}
                expenseData={selectedExpense}
                handleUpdateExpense={handleUpdateExpense}
            />
        </>
    );
}

export default Dashboard;
