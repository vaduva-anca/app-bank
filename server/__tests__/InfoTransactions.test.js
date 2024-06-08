const Database = require('../Database.js');
const InfoTransactions = require('../InfoTransactions.js');

jest.mock('../Database.js'); // Mock the database module

describe('InfoTransactions class', () => {
  let infoTransactions;

  beforeEach(() => {
    infoTransactions = new InfoTransactions(123, 'sourceAccount', 'destinationAccount', 100);
  });

  test('getTransactionsBetweenDates method', async () => {
    // Mock the query result for getTransactionsBetweenDates method
    const mockedTransactions = [{ /* mocked transaction data */ }];
    Database.query.mockResolvedValueOnce([mockedTransactions]);

    const startDate = '2024-01-01';
    const endDate = '2024-01-31';
    const result = await infoTransactions.getTransactionsBetweenDates(startDate, endDate);

    // Check if the result matches the expected value based on the mocked data
    expect(result).toEqual(mockedTransactions);
  });

  test('getTransactionsGreaterThanDate method', async () => {
    const fromDate = '2024-01-01';
    const mockedTransactions = [{ /* mocked transaction data */ }];
    Database.query.mockResolvedValueOnce([mockedTransactions]);

    const result = await infoTransactions.getTransactionsGreaterThanDate(fromDate);

    expect(result).toEqual(mockedTransactions);
  });

  test('getTransactionsLowerThanDate method', async () => {
    const toDate = '2024-01-31';
    const mockedTransactions = [{ /* mocked transaction data */ }];
    Database.query.mockResolvedValueOnce([mockedTransactions]);

    const result = await infoTransactions.getTransactionsLowerThanDate(toDate);

    expect(result).toEqual(mockedTransactions);
  });

  test('getTransactionsByAmountRange method', async () => {
    const minAmount = 50;
    const maxAmount = 150;
    const mockedTransactions = [{ /* mocked transaction data */ }];
    Database.query.mockResolvedValueOnce([mockedTransactions]);

    const result = await infoTransactions.getTransactionsByAmountRange(minAmount, maxAmount);

    expect(result).toEqual(mockedTransactions);
  });

  test('getTransactionsLowerThanAmount method', async () => {
    const amount = 50;
    const mockedTransactions = [{ /* mocked transaction data */ }];
    Database.query.mockResolvedValueOnce([mockedTransactions]);

    const result = await infoTransactions.getTransactionsLowerThanAmount(amount);

    expect(result).toEqual(mockedTransactions);
  });

  test('getTransactionsGreaterThanAmount method', async () => {
    const amount = 150;
    const mockedTransactions = [{ /* mocked transaction data */ }];
    Database.query.mockResolvedValueOnce([mockedTransactions]);

    const result = await infoTransactions.getTransactionsGreaterThanAmount(amount);

    expect(result).toEqual(mockedTransactions);
  });
});
