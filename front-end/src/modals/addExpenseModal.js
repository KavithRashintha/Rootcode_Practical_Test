import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const categories = ['Food', 'Household', 'Social Life', 'Transportation', 'Health', 'Miscellaneous'];

const AddExpenseModal = ({ open, handleClose, handleAddExpense }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    const handleSubmit = async () => {
        const newExpense = {
            title,
            description,
            category,
            amount: parseFloat(amount),
            date,
        };

        try {
            const response = await axios.post('http://localhost:5000/expenses/addExpense', newExpense);
            handleAddExpense(response.data);
            handleClose();

            setTitle('');
            setDescription('');
            setCategory('');
            setAmount('');
            setDate(new Date().toISOString().slice(0, 10));
        } catch (err) {
            console.error('Error adding expense:', err);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: '600px',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    Create Expense
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Category"
                        select
                        fullWidth
                        margin="normal"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        sx={{ mr: 2 }}
                    >
                        Close
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddExpenseModal;
