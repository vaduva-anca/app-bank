const Database = require('./Database.js');

class Transaction {
    constructor(clientId, sourceAccountCode, destinationAccountCode, amount) {
        this.clientId = clientId;
        this.sourceAccountCode = sourceAccountCode;
        this.destinationAccountCode = destinationAccountCode;
        this.amount = amount;
    }

    async getAllTransactions() {
        const clientId = this.clientId;

        console.log(`clientId from class: ${clientId}`);
        const sql = 'SELECT * FROM Transactions WHERE clientId = ?';
        const [rows] = await Database.query(sql, [clientId]);
        console.log(`clientId from class: ${clientId}`);
        return rows;
    }
    async withdrawMoney(){
        const connection = await Database.getConnection();
        try {
            await connection.beginTransaction();

            await this.deductFromSourceAccount(connection);

            await connection.commit();
        } catch (err) {
            console.log(`error for this ${err}`);
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
    async transferMoney() {
        const connection = await Database.getConnection();

        try {
            await connection.beginTransaction();

            await this.deductFromSourceAccount(connection);
            await this.addToDestinationAccount(connection);

            await connection.commit();
        } catch (err) {
            console.log(`error for this ${err}`);
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    async deductFromSourceAccount(connection) {
        const deductSql = `
            INSERT INTO Transactions (clientID, transactionDate, transactionAmount, description)
            VALUES (
                (SELECT clientID FROM Clients WHERE accountCode = ?),
                CURDATE(),
                ?,
                CONCAT('Transfer to ', ?)
            );
        `;

        await connection.execute(deductSql, [this.sourceAccountCode, -this.amount, this.destinationAccountCode]);
    }

    async addToDestinationAccount(connection) {
        const addSql = `
            INSERT INTO Transactions (clientID, transactionDate, transactionAmount, description)
            VALUES (
                (SELECT clientID FROM Clients WHERE accountCode = ?),
                CURDATE(),
                ?,
                CONCAT('Received from ', ?)
            );
        `;

        await connection.execute(addSql, [this.destinationAccountCode, this.amount, this.sourceAccountCode]);
    }
}

module.exports = Transaction;
