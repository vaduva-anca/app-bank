const Database = require('./Database.js');

class TransactionDetails{



    async  getTransactionsBetweenDates(startDate, endDate) {

        const sql = `
            SELECT *
            FROM Transactions WHERE
         
           transactionDate BETWEEN ? AND ?;
        `;

        const [rows] = await Database.query(sql, [ startDate, endDate]);
        return rows;
    }


    async  getTransactionsGreaterThanDate(fromDate) {
        try {
            const sql = `
                SELECT *
                FROM Transactions
                WHERE 
                transactionDate > ?;
            `;
    
            const [rows] = await Database.query(sql, [fromDate]);
            return rows;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
}

async getTransactionsLowerThanDate(toDate) {
    try {
        const sql = `
            SELECT *
            FROM Transactions
            WHERE 
            transactionDate < ?;
        `;

        const [rows] = await Database.query(sql, [toDate]);
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
            WHERE 
            transactionAmount BETWEEN ? AND ?;
        `;

        const [rows] = await Database.query(sql, [ minAmount, maxAmount]);
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
            WHERE 
            AND transactionAmount < ?;
        `;

        const [rows] = await Database.query(sql, [ amount]);
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
            WHERE
             transactionAmount > ?;
        `;

        const [rows] = await Database.query(sql, [ amount]);
        return rows;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}



}
module.exports = TransactionDetails;