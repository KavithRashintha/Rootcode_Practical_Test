const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        date: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['Food', 'Household', 'Social Life', 'Transportation', 'Health', 'Miscellaneous']
        },
        amount: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('wallet', expenseSchema);