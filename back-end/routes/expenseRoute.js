const express = require('express');
const {addExpense, updateExpense, getAllExpenses, deleteExpense, filterExpense} = require('../controllers/expenseController');

const route = express.Router();

route.post('/addExpense', addExpense);
route.put('/updateExpense/:id', updateExpense);
route.get('/getAllExpenses', getAllExpenses);
route.delete('/deleteExpense/:id', deleteExpense);
route.get('/getExpensesByCategory/:category', filterExpense);

module.exports = route;