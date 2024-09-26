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

const updateExpense = async (req,res) => {
    const { id } = req.params;
    const { title, description, date, category, amount } = req.body;

    try{
        const updatedExpense = await ExpenseModel.findByIdAndUpdate(
            id,
            { title, description, date, category, amount }
        );

        if(!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json('Successfully Updated');
    }catch (error){
        res.status(422).json({ error: 'Failed to update the expense', details: error });
    }
}

const getAllExpenses = async (req,res) => {

    try{
        const expenses = await ExpenseModel.find();

        if(!expenses){
            return res.status(404).json({ message: 'Expenses not found' });
        }

        res.status(200).json(expenses);
    }catch (error){
        res.status(500).json({ error: 'Failed to fetch expenses', details: error });
    }
}

const deleteExpense = async (req,res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await ExpenseModel.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the expense', details: error });
    }
}

module.exports = {
    addExpense,
    updateExpense,
    getAllExpenses,
    deleteExpense
}