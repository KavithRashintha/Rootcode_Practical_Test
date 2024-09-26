const ExpenseModel = require('../models/expenseSchema');

const addExpense = async (req,res) => {
    const {title,description,date,category,amount} = req.body;

    const newExpense = new ExpenseModel({
        title,
        description,
        date,
        category,
        amount
    });

    try {
        const result = await newExpense.save();
        res.status(200).json(result);
    }catch (error){
        res.status(422).json(error)
    }
}

module.exports = {
    addExpense
}