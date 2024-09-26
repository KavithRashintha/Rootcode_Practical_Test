const express = require('express');
const {addExpense, updateExpense, getAllExpenses, deleteExpense} = require('../controllers/expenseController');

const route = express.Router();

route.post('/addExpense', addExpense);
route.put('/updateExpense/:id', updateExpense);
route.get('/getAllExpenses', getAllExpenses);
route.delete('/deleteExpense/:id', deleteExpense);

module.exports = route;