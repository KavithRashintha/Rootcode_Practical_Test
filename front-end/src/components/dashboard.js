import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Expense from '../components/expense';
import AddExpenseModal from '../modal/addExpenseModal';
import UpdateExpenseModal from '../modal/updateExpenseModal';
import { Box, Button, FormControl, Select, MenuItem } from '@mui/material';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [category, setCategory] = useState('All');

    const categories = ['Food', 'Household', 'Social Life', 'Transportation', 'Health', 'Miscellaneous'];

    const fetchExpenses = async () => {
        const url = category === 'All'
            ? 'http://localhost:5000/expenses/getAllExpenses'
            : `http://localhost:5000/expenses/getExpensesByCategory/${category}`;

        try {
            const response = await axios.get(url);
            if (response.data.length === 0) {
                alert(`No expenses found for the category: ${category}`);
            }
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            alert("An error occurred while fetching expenses. Please try again.");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [category]);

    const handleAddExpense = async (newExpense) => {
        setModalOpen(false);
        await fetchExpenses();
    };

    const handleUpdateExpense = async (updatedExpense) => {
        setUpdateModalOpen(false);
        await fetchExpenses();
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ margin: 2 }}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
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
                            key={expense.id}
                            {...expense}
                            onEdit={(expenseData) => {
                                setSelectedExpense(expenseData);
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
