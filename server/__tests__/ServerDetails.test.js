const express = require('express');
const supertest = require('supertest');
const TransactionDetails = require('../TransactionDetails.js');
const app = express();

jest.mock('../TransactionDetails.js');

const mockGetTransactionsBetweenDates = jest.fn();
const mockGetTransactionsGreaterThanDate = jest.fn();
const mockGetTransactionsLowerThanDate = jest.fn();

TransactionDetails.prototype.getTransactionsBetweenDates = mockGetTransactionsBetweenDates;
TransactionDetails.prototype.getTransactionsGreaterThanDate = mockGetTransactionsGreaterThanDate;
TransactionDetails.prototype.getTransactionsLowerThanDate = mockGetTransactionsLowerThanDate;

const PORT = 3001;

app.get('/transactions-details/between-dates', async (req, res) => {
    const { startDate, endDate } = req.query;
    const infoTransaction = new TransactionDetails();
    await infoTransaction.getTransactionsBetweenDates(startDate, endDate);
    res.json({}); 
});

app.get('/transactions-details/greater-than-date', async (req, res) => {
    const { fromDate } = req.query;
    const infoTransaction = new TransactionDetails();
    await infoTransaction.getTransactionsGreaterThanDate(fromDate);
    res.json({}); 
});

app.get('/transactions-details/lower-than-date-info', async (req, res) => {
    const { toDate } = req.query;
    const infoTransaction = new TransactionDetails();
    await infoTransaction.getTransactionsLowerThanDate(toDate);
    res.json({});
});

describe('Express App with TransactionDetails', () => {
    test('should handle /transactions-details/between-dates route', async () => {
        await supertest(app)
            .get('/transactions-details/between-dates')
            .query({ startDate: '2024-01-01', endDate: '2024-01-31' })
            .expect(200);

        expect(mockGetTransactionsBetweenDates).toHaveBeenCalledWith('2024-01-01', '2024-01-31');
    });

    test('should handle /transactions-details/greater-than-date route', async () => {
        await supertest(app)
            .get('/transactions-details/greater-than-date')
            .query({ fromDate: '2024-01-01' })
            .expect(200);

        expect(mockGetTransactionsGreaterThanDate).toHaveBeenCalledWith('2024-01-01');
    });

    test('should handle /transactions-details/lower-than-date-info route', async () => {
        await supertest(app)
            .get('/transactions-details/lower-than-date-info')
            .query({ toDate: '2024-01-01' })
            .expect(200);

        expect(mockGetTransactionsLowerThanDate).toHaveBeenCalledWith('2024-01-01');
    });
});


