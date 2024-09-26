import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Expense = ({ title, date, description, category, amount }) => {
    const handleEditClick = () => {
        console.log('Edit clicked');
    };

    const handleDeleteClick = () => {
        console.log('Delete clicked');
    };

    return (
        <Card sx={{ width: 300, margin: 2, padding: 2, position: 'relative' }}>
            <CardContent>
                {/* Title and Date in the same line */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {new Date(date).toLocaleDateString()}
                    </Typography>
                </Box>

                {/* Description and Category */}
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {description}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Category: {category}
                </Typography>

                {/* Amount */}
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                    ${amount !== undefined ? amount.toFixed(2) : '0.00'}
                </Typography>
            </CardContent>

            {/* Edit and Delete Icons */}
            <Box display="flex" justifyContent="flex-end" sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                <IconButton aria-label="edit" onClick={handleEditClick}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default Expense;
