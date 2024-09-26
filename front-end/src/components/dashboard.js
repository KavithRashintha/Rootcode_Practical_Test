import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Expense from '../components/expense';
import { Box, Typography } from '@mui/material';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);

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

    return (
        <>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Expense Dashboard
            </Typography>
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
        </>
    );
}

export default Dashboard;
