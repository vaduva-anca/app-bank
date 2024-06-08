const Database = require('../Database');
const TransactionDetails = require('../TransactionDetails');

jest.mock('../Database', () => ({
  query: jest.fn(),
}));

describe('TransactionDetails', () => {
  let transactionDetails;

  beforeEach(() => {
    jest.clearAllMocks();

    transactionDetails = new TransactionDetails();
  });

  describe('getTransactionsBetweenDates', () => {
    test('should fetch transactions between two dates', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-01-10';
      const mockedRows = [{ id: 1, amount: 100, date: '2024-01-05' }];
      
      Database.query.mockResolvedValue([mockedRows]);
    
      const resultPromise = transactionDetails.getTransactionsBetweenDates(startDate, endDate);
    
      await expect(resultPromise).resolves.toEqual(mockedRows);
      
      expect(Database.query).toHaveBeenCalledWith(
        expect.stringMatching(/\s*SELECT \*\s*FROM Transactions WHERE\s*transactionDate BETWEEN \? AND \?;\s*/), 
        [startDate, endDate]
      );
    });
    test('should fetch transactions greater than a given date', async () => {
      // Set up your mock data and Database.query function here
      const fromDate = '2024-01-01';
      const mockedRows = [{ id: 1, amount: 100, date: '2024-01-05' }];
      
      // Mock the Database.query function
      Database.query.mockResolvedValue([mockedRows]);
  
      // Call the method you want to test
      const resultPromise = transactionDetails.getTransactionsGreaterThanDate(fromDate);
  
      // Use .resolves to await the promise and check the result
      await expect(resultPromise).resolves.toEqual(mockedRows);
      
      // Check if the Database.query function was called with the expected parameters
      expect(Database.query).toHaveBeenCalledWith(
        expect.any(String),  // Use expect.any(String) instead of expect.stringMatching
        [fromDate]
      );
    });
    test('should fetch transactions lower than a given date', async () => {
      const toDate = '2024-01-10';
      const mockedRows = [{ id: 1, amount: 100, date: '2024-01-05' }];
      
      Database.query.mockResolvedValue([mockedRows]);
  
      const resultPromise = transactionDetails.getTransactionsLowerThanDate(toDate);
  
      await expect(resultPromise).resolves.toEqual(mockedRows);
      
      expect(Database.query).toHaveBeenCalledWith(
        expect.any(String),  
        [toDate]
      );
    });
    test('should fetch transactions within a given amount range', async () => {
      const minAmount = 50;
      const maxAmount = 200;
      const mockedRows = [
        { id: 1, amount: 100, date: '2024-01-05' },
        { id: 2, amount: 150, date: '2024-01-08' }
      ];
      
      Database.query.mockResolvedValue([mockedRows]);
  
      const resultPromise = transactionDetails.getTransactionsByAmountRange(minAmount, maxAmount);
  
      await expect(resultPromise).resolves.toEqual(mockedRows);
      
      expect(Database.query).toHaveBeenCalledWith(
        expect.any(String),  
        [minAmount, maxAmount]
      );
    });
    test('should fetch transactions lower than a given amount', async () => {
      const amount = 100;
      const mockedRows = [
        { id: 1, amount: 50, date: '2024-01-05' },
        { id: 2, amount: 75, date: '2024-01-08' }
      ];
  
      Database.query.mockResolvedValue([mockedRows]);
  
      const resultPromise = transactionDetails.getTransactionsLowerThanAmount(amount);
  
      await expect(resultPromise).resolves.toEqual(mockedRows);
      
      expect(Database.query).toHaveBeenCalledWith(
        expect.any(String),  
        [amount]
      );
    });
    test('should fetch transactions greater than a given amount', async () => {
      const amount = 100;
      const mockedRows = [
        { id: 1, amount: 150, date: '2024-01-05' },
        { id: 2, amount: 200, date: '2024-01-08' }
      ];
  
      Database.query.mockResolvedValue([mockedRows]);
  
      const resultPromise = transactionDetails.getTransactionsGreaterThanAmount(amount);
  
      await expect(resultPromise).resolves.toEqual(mockedRows);
      
      expect(Database.query).toHaveBeenCalledWith(
        expect.any(String), 
        [amount]
      );
    });

    
  });
  });

  // Add similar test cases for other methods like getTransactionsGreaterThanDate, getTransactionsLowerThanDate, etc.

  // Remember to test error scenarios as well


  // Add similar test cases for other methods like getTransactionsGreaterThanDate, getTransactionsLowerThanDate, etc.

  // Remember to test error scenarios as well
  // describe('getTransactionsGreaterThanDate', () => {
  //   it('should fetch transactions greater than date', async () => {
  //     // Mock Database.query to return a sample result
  //     Database.query.mockResolvedValue([
  //       { id: 1, amount: 100, date: '2024-01-05' },
  //       { id: 2, amount: 150, date: '2024-01-08' },
  //       // Add more sample data as needed
  //     ]);
   
  //     const fromDate = '2024-01-01';
   
  //     const result = await transactionDetails.getTransactionsGreaterThanDate(fromDate);
   
  //     expect(Database.query).toHaveBeenCalledWith(expect.stringMatching(/\s*SELECT \*\s*FROM Transactions WHERE\s*transactionDate > \?;\s*/), [fromDate]);
  //     expect(result).toEqual([[/* expected mock data here */]]);
  //   });
  // });

  // describe('getTransactionsLowerThanDate', () => {
  //   it('should fetch transactions lower than date', async () => {
  //     // Mock Database.query to return a sample result
  //     Database.query.mockResolvedValue([
  //       { id: 1, amount: 100, date: '2024-01-05' },
  //       { id: 2, amount: 150, date: '2024-01-08' },
  //       // Add more sample data as needed
  //     ]);
   
  //     const toDate = '2024-01-01';
   
  //     const result = await transactionDetails.getTransactionsLowerThanDate(toDate);
   
  //     expect(Database.query).toHaveBeenCalledWith(expect.stringMatching(/\s*SELECT \*\s*FROM Transactions WHERE\s*transactionDate < \?;\s*/), [toDate]);
  //     expect(result).toEqual([[/* expected mock data here */]]);
  //   });
  // });

  // describe('getTransactionsByAmountRange', () => {
  //   it('should fetch transactions within amount range', async () => {
  //     // Mock Database.query to return a sample result
  //     Database.query.mockResolvedValue([
  //       { id: 1, amount: 100, date: '2024-01-05' },
  //       { id: 2, amount: 150, date: '2024-01-08' },
  //       // Add more sample data as needed
  //     ]);
   
  //     const minAmount = 50;
  //     const maxAmount = 150;
   
  //     const result = await transactionDetails.getTransactionsByAmountRange(minAmount, maxAmount);
   
  //     expect(Database.query).toHaveBeenCalledWith(expect.stringMatching(/\s*SELECT \*\s*FROM Transactions WHERE\s*transactionAmount BETWEEN \? AND \?;\s*/), [minAmount, maxAmount]);
  //     expect(result).toEqual([[/* expected mock data here */]]);
  //   });
  // });

  // Add similar test cases for other methods like getTransactionsLowerThanAmount, getTransactionsGreaterThanAmount, etc.

  // Remember to test error scenarios as well
