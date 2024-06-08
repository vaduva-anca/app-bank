const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const PORT = 3000;
const Client = require('./Client.js');
const Transaction = require('./Transaction.js');
const InfoTransactions = require('./InfoTransactions.js');
let infoTransactions = new InfoTransactions();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'root',
    port: 3306
});

app.use(cors());



// Transfer money route handler
app.post('/transfer/:sourceAccountCode/:destinationAccountCode/:amount', handleTransfer);

//withdraw money
app.post('/transfer/:sourceAccountCode/:amount', handleWithdraw);

// Get all transactions route handler
app.get('/transactions/:clientID', handleGetTransactions);

// Update client information route handler
app.put('/update-client/:accountCode', handleUpdateClientInfo);
async function handleWithdraw(req,res){
    const { sourceAccountCode,  amount } = req.params;
    console.log(sourceAccountCode);
    console.log(amount);
    const transaction = new Transaction(" ", sourceAccountCode, " ", amount);
    try {
        await transaction.withdrawMoney();
        res.json({ message: "Withdraw completed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to withdraw money' });
    }
}
async function handleTransfer(req, res) {
    const { sourceAccountCode, destinationAccountCode, amount } = req.params;
    const transaction = new Transaction(" ", sourceAccountCode, destinationAccountCode, amount);
    try {
        await transaction.transferMoney();
        res.json({ message: "Transfer completed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to transfer money' });
    }
}
app.get('/client/accounts',async(req,res)=>{
    const {firstName,lastName,accountCode} = req.query;
    console.log(firstName);
    console.log(lastName);
    console.log(accountCode);

    const client = new Client(accountCode,' ');
    try{
        const dataAccounts = await client.getAccounts(firstName,lastName,accountCode);
        console.log(JSON.stringify(dataAccounts));
        res.json(dataAccounts);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
    
})
async function handleGetTransactions(req, res) {
    const transaction = new Transaction(req.params.clientID);

    console.log(`clientId ${req.params.clientID}`);

    try {
        const dataTransaction = await transaction.getAllTransactions();
        console.log(JSON.stringify(dataTransaction));
        res.json(dataTransaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

async function handleUpdateClientInfo(req, res) {
    const { accountCode } = req.params;

    // Ensure that req.body exists before destructuring
    if (!req.body) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const { newFirstName, newLastName, newPin } = req.body;
    const client = new Client(accountCode);

    try {
        // Check if the client exists before attempting to update
        const existingClient = await client.login();
        if (!existingClient || existingClient.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Update client information
        await client.updateClientInfo(newFirstName, newLastName, newPin);

        res.json({ message: 'Client information updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update client information' });
    }
}

app.get('/balance/:accountCode', async (req, res) => {
    console.log(`hereee ${req.params.accountCode}`);
    const client = new Client(req.params.accountCode);
    try {
        const balance = await client.getBalance();
        res.json(balance);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.get('/login', async (req, res) => {
    const client = new Client(req.query.accountCode, req.query.pin);
    try {
        const loginData = await client.login();

        res.json(loginData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }


});


// API endpoint to get transactions between dates
app.get('/transactions-info/between-dates', async (req, res) => {
    const { startDate, endDate,clientID } = req.query;
    const infoTransaction = new InfoTransactions(clientID, "", "", "");
    try {
        await  infoTransactions.getTransactionBetweenDates(infoTransaction,startDate,endDate,res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/transactions-details/between-dates', async (req, res) => {
    const { startDate, endDate} = req.query;
    const infoTransaction = new TransactionDetails();
    try {
        await  getTransactionBetweenDatesDetailsFunction(infoTransaction,startDate,endDate,res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getTransactionBetweenDatesDetailsFunction(transactionDetails,startDate,endDate,res){
    const transactions = await transactionDetails.getTransactionsBetweenDates(startDate, endDate);
    res.json(transactions);
    

}
// API endpoint to get transactions greater than a date
app.get('/transactions-info/greater-than-date', async (req, res) => {
    const { fromDate,clientID } = req.query;
    const infoTransaction = new InfoTransactions(clientID, "", "", "");
    try {
        await    getTransactionsGreaterThanDateFunction(infoTransaction,fromDate,res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsGreaterThanDateFunction(infoTransaction,fromDate,res){
    const transactions = await infoTransaction.getTransactionsGreaterThanDate(fromDate);
    res.json(transactions);
    

}
app.get('/transactions-info/lower-than-date', async (req, res) => {
    const { fromDate,clientID } = req.query;
    const infoTransaction = new InfoTransactions(clientID, "", "", "");
    try {
        await  getTransactionsLowerThanDateFunction(infoTransaction,fromDate,res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsLowerThanDateFunction(infoTransaction,fromDate,res){
    const transactions = await infoTransaction.getTransactionsGreaterThanDate(fromDate);
    res.json(transactions);
}
app.get('/transactions-info/amount-range', async (req, res) => {
    const { minAmount,maxAmount,clientID } = req.query;
    const infoTransaction = new InfoTransactions(clientID, "", "", "");
    try {
        await   getTransactionsByAmountRangeFunction(infoTransaction,minAmount,maxAmount,res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsByAmountRangeFunction(infoTransaction,minAmount,maxAmount,res){
    const transactions = await infoTransaction.getTransactionsByAmountRange(minAmount,maxAmount);
    res.json(transactions);
}
app.get('/transactions-info/lower-than-amount', async (req, res) => {
    const { amount,clientID } = req.query;
    const infoTransaction = new InfoTransactions(clientID, "", "", "");
    console.log(`ammount ${amount},and clientId ${clientID}`);
    try {
        await getTransactionsLowerThanAmountFunction(infoTransaction,amount,res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsLowerThanAmountFunction(infoTransaction,amount,res){
    const transactions = await infoTransaction.getTransactionsLowerThanAmount(amount);
    res.json(transactions);
}
app.get('/transactions-info/grater-than-amount', async (req, res) => {
    const { amount,clientID } = req.query;
    const infoTransaction = new InfoTransactions(clientID, "", "", "");
    console.log(`ammount ${amount},and clientId ${clientID}`);
    try {
        await getTransactionsGreaterThanAmountFunction(infoTransaction,amount,res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
async function getTransactionsGreaterThanAmountFunction(infoTransaction,amount,res){
    const transactions = await infoTransaction.getTransactionsGreaterThanAmount(amount);
        res.json(transactions);
}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
