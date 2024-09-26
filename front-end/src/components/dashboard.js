import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Expense from '../components/expense';
import AddExpenseModal from '../modal/addExpenseModal';
import { Box, Typography, Button } from '@mui/material';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/expenses/getAllExpenses');
                setExpenses(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching expenses:', err);
            }
        };

        fetchExpenses();
    }, []);

    const handleAddExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

        // Optionally, send a POST request to add the expense to the server
        // await axios.post('http://localhost:5000/expenses/addExpense', newExpense);
    };

    return (
        <>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Expense Dashboard
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ position: 'absolute', top: 16, right: 16 }}
                onClick={() => setModalOpen(true)}
            >
                Create Expense
            </Button>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                {expenses.length > 0 ? (
                    expenses.map(expense => (
                        <Expense
                            key={expense.id}
                            title={expense.title}
                            date={expense.date}
                            description={expense.description}
                            category={expense.category}
                            amount={expense.amount}
                        />
                    ))
                ) : (
                    <Typography variant="body1" sx={{ margin: 2 }}>
                        No expenses available.
                    </Typography>
                )}
            </Box>
            <AddExpenseModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleAddExpense={handleAddExpense}
            />
        </>
    );
}

export default Dashboard;
