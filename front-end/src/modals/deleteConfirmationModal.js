import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import {clearSelectedExpenseId} from "../redux/expenseSlice";
import {useDispatch} from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const DeleteConfirmModal = ({ open, handleClose, expenseId }) => {

    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/expenses/deleteExpense/${expenseId}`);
            console.log(response.data);

            if (response.status === 200) {
                alert('Expense deleted successfully');
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("An error occurred while deleting the expense. Please try again.");
        } finally {
            handleClose();
            dispatch(clearSelectedExpenseId());
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Confirm Deletion
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Are you sure you want to delete this expense?
                </Typography>
                <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        No
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteConfirmModal;
