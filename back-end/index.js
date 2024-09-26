const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;
const mongodb = process.env.MONGODB;

const ExpenseRoute = require('./routes/expenseRoute');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect(mongodb).then(()=>{
    app.listen(port, ()=>{
        console.log(`WalletApp server is running at port : ${port}`);
    })
}).catch((error)=>{
    console.log(error);
});

app.use('/expenses', ExpenseRoute);