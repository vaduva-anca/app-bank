
const Database = require('./Database.js');
class Client {

    constructor(accountCode,pin) {
        this.pin = pin;
        this.accountCode = accountCode;
    }

     
    async login() {
        const sql = 'select * from Clients where accountCode= ? and pin = ?';

        const values = [this.accountCode, this.pin];
        const [rows] = await Database.query(sql,values);



        return rows;
    }
    async getAccounts(firstName,lastName,accountCode){
        const sql = 'SELECT * from clients where firstName = ? and lastName = ? and accountCode != ?';
    
        const values = [firstName,lastName,accountCode];
        console.log(values +'hereeeeeeee');
        const [rows] = await Database.query(sql,values);

        return rows;
    }
    async getBalance(){
        const sql = 'SELECT  SUM(t.transactionAmount) AS balance FROM Clients c LEFT JOIN Transactions t ON c.clientID = t.clientID WHERE c.accountCode = ? GROUP BY c.clientID, c.firstName, c.lastName;';
        const accountCode = this.accountCode;
        const [rows] = await Database.query(sql, [accountCode]);

    return rows;
    }

    async deposit(amount) {
        const depositSql = 'INSERT INTO Transactions (clientID, transactionDate, transactionAmount, description) VALUES ((SELECT clientID FROM Clients WHERE accountCode = ?), NOW(), ?, "Deposit")';
        const depositValues = [this.accountCode, amount];
        await Database.query(depositSql, depositValues);
    }

    async withdraw(amount) {
        const withdrawSql = 'INSERT INTO Transactions (clientID, transactionDate, transactionAmount, description) VALUES ((SELECT clientID FROM Clients WHERE accountCode = ?), NOW(), ?, "Withdraw")';
        const withdrawValues = [this.accountCode, amount];
        await Database.query(withdrawSql, withdrawValues);
    }

    async getTransactions() {
        const transactionSql = 'SELECT * FROM Transactions WHERE clientID = (SELECT clientID FROM Clients WHERE accountCode = ?)';
        const [transactions] = await Database.query(transactionSql, [this.accountCode]);
        console.log('Transactions:', transactions); 

        return transactions;
    }
    async updateClientInfo(newFirstName, newLastName, newPin) {
        const updateSql = 'UPDATE Clients SET firstName = ?, lastName = ?, pin = ? WHERE accountCode = ?';
        const updateValues = [newFirstName, newLastName, newPin, this.accountCode];
        await Database.query(updateSql, updateValues);
    }
}
module.exports = Client;
