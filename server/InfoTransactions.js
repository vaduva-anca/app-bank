const Database = require('./Database.js');

class InfoTransactions{
    constructor(clientId, sourceAccountCode, destinationAccountCode, amount) {
        this.clientId = clientId;
        this.sourceAccountCode = sourceAccountCode;
        this.destinationAccountCode = destinationAccountCode;
        this.amount = amount;
    }

    async  getTransactionsBetweenDates(startDate, endDate) {

        console.log(`startDate ${startDate}`);
        console.log(`endDate ${endDate}`);
        console.log(`clientId ${this.clientId}`);
        const sql = `
            SELECT *
            FROM Transactions
            WHERE clientId = ?
            AND transactionDate BETWEEN ? AND ?;
        `;

        const [rows] = await Database.query(sql, [this.clientId, startDate, endDate]);
        return rows;
    }


    async  getTransactionsGreaterThanDate(fromDate) {
        try {
            const sql = `
                SELECT *
                FROM Transactions
                WHERE clientId = ?
                AND transactionDate > ?;
            `;
    
            const [rows] = await Database.query(sql, [this.clientId, fromDate]);
            return rows;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
}

async  getTransactionsLowerThanDate(toDate) {
    try {
        const sql = `
            SELECT *
            FROM Transactions
            WHERE clientId = ?
            AND transactionDate < ?;
        `;

        const [rows] = await Database.query(sql, [this.clientId, toDate]);
        return rows;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async  getTransactionsByAmountRange( minAmount, maxAmount) {
    try {
        const sql = `
            SELECT *
            FROM Transactions
            WHERE clientId = ?
            AND transactionAmount BETWEEN ? AND ?;
        `;

        const [rows] = await Database.query(sql, [this.clientId, minAmount, maxAmount]);
        return rows;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
async  getTransactionsLowerThanAmount(amount) {
    try {
        const sql = `
            SELECT *
            FROM Transactions
            WHERE clientId = ?
            AND transactionAmount < ?;
        `;

        const [rows] = await Database.query(sql, [this.clientId, amount]);
        return rows;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
async  getTransactionsGreaterThanAmount( amount) {
    try {
        const sql = `
            SELECT *
            FROM Transactions
            WHERE clientId = ?
            AND transactionAmount > ?;
        `;

        const [rows] = await Database.query(sql, [this.clientId, amount]);
        return rows;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
}
module.exports = InfoTransactions;
