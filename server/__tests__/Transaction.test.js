const Database = require('../Database.js');
const Transaction = require('../Transaction.js');

jest.mock('../Database.js');

describe('Transaction', () => {
    let transaction;
  
    beforeEach(() => {
      transaction = new Transaction('123', 'srcAccount', 'destAccount', 100);
    });
  
    test('should fetch all transactions for a given client', async () => {
      const mockedRows = [
        { id: 1, amount: 100, date: '2024-01-05' },
        { id: 2, amount: 150, date: '2024-01-08' }
      ];
  
      Database.query.mockResolvedValue([mockedRows]);
  
      const resultPromise = transaction.getAllTransactions();
  
      await expect(resultPromise).resolves.toEqual(mockedRows);
  
      expect(Database.query).toHaveBeenCalledWith(
        'SELECT * FROM Transactions WHERE clientId = ?',
        ['123']
      );
    });
  
    test('should transfer money between accounts', async () => {
      const mockedConnection = {
        beginTransaction: jest.fn(),
        commit: jest.fn(),
        rollback: jest.fn(),
        release: jest.fn(),
        execute: jest.fn()
      };
  
      Database.getConnection.mockResolvedValue(mockedConnection);
  
      await transaction.transferMoney();
  
      expect(Database.getConnection).toHaveBeenCalled();
      expect(mockedConnection.beginTransaction).toHaveBeenCalled();
      expect(mockedConnection.commit).toHaveBeenCalled();
      expect(mockedConnection.rollback).not.toHaveBeenCalled();
      expect(mockedConnection.release).toHaveBeenCalled();
      expect(mockedConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('Transfer to'),
        ['srcAccount', -100, 'destAccount']
      );
      expect(mockedConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('Received from'),
        ['destAccount', 100, 'srcAccount']
      );
    });
  
    test('should deduct from source account', async () => {
      const mockedConnection = {
        execute: jest.fn()
      };
  
      await transaction.deductFromSourceAccount(mockedConnection);
  
      expect(mockedConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('Transfer to'),
        ['srcAccount', -100, 'destAccount']
      );
    });
  
    test('should add to destination account', async () => {
      const mockedConnection = {
        execute: jest.fn()
      };
  
      await transaction.addToDestinationAccount(mockedConnection);
  
      expect(mockedConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('Received from'),
        ['destAccount', 100, 'srcAccount']
      );
    });
  });