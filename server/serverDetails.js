const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const PORT = 3001;
const Client = require('./Client.js');
const Transaction = require('./Transaction.js');
const InfoTransactions = require('./InfoTransactions.js');
const TransactionDetails = require('./TransactionDetails.js');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'root',
    port: 3306
});

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

async function getTransactionBetweenDates(infoTransaction,startDate,endDate,res){
    const transactions = await infoTransaction.getTransactionsBetweenDates(startDate, endDate);
    res.json(transactions);
    

}
app.get('/transactions-details/between-dates', async (req, res) => {
    const { startDate, endDate} = req.query;
    const infoTransaction = new TransactionDetails();
    try {
        await getTransactionBetweenDates(infoTransaction,startDate,endDate,res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/transactions-details/greater-than-date', async (req, res) => {
    const { fromDate} = req.query;
    const infoTransaction = new TransactionDetails();
    try {
        await getTransactionsGreaterThanDateFunction(infoTransaction,fromDate,res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsGreaterThanDateFunction(infoTransaction,fromDate,res){
    const transactions = await infoTransaction.getTransactionsGreaterThanDate(fromDate);
    res.json(transactions);
    
}

app.get('/transactions-details/lower-than-date-info', async (req, res) => {
    const { fromDate} = req.query;
    const infoTransaction = new TransactionDetails();
    try {
        await   getTransactionsLowerThanDateFunction(infoTransaction,fromDate,res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsLowerThanDateFunction(infoTransaction,fromDate,res){
    const transactions = await infoTransaction.getTransactionsGreaterThanDate(fromDate);
    res.json(transactions);
}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
