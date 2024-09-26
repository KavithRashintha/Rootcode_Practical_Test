const express = require('express');
const {addExpense, updateExpense, getAllExpenses} = require('../controllers/expenseController');

const route = express.Router();

route.post('/addExpense', addExpense);
route.put('/updateExpense/:id', updateExpense);
route.get('/getAllExpenses', getAllExpenses);

module.exports = route;