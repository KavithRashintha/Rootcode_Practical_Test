const express = require('express');
const {addExpense} = require('../controllers/expenseController');

const route = express.Router();

route.post('/addExpense', addExpense);

module.exports = route;