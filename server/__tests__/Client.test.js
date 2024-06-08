const Database = require('../Database.js');
const Client = require('../Client.js'); // Adjust the path accordingly

jest.mock('../Database.js'); // Mock the database module

describe('Client class', () => {
  let client;

  beforeEach(() => {
    client = new Client('account123', '1234');
  });

  test('login method', async () => {
    // Mock the query result for login method
    Database.query.mockResolvedValue([[{ /* mocked row data */ }]]);
    
    const result = await client.login();

    expect(result).toEqual([{ /* expected result based on mocked data */ }]);
  });

  test('getBalance method', async () => {
    // Mock the query result for getBalance method
    Database.query.mockResolvedValue([[{ balance: 100 }]]);
    
    const result = await client.getBalance();

    expect(result).toEqual([{ balance: 100 }]);
  });


  test('withdraw method', async () => {
    // Mock the query result for the withdraw method
    Database.query.mockResolvedValue({ /* mocked result */ });

    const amount = 50;
    await client.withdraw(amount);

    // Check if the Database.query method was called with the correct arguments
    expect(Database.query).toHaveBeenCalledWith(
      'INSERT INTO Transactions (clientID, transactionDate, transactionAmount, description) VALUES ((SELECT clientID FROM Clients WHERE accountCode = ?), NOW(), ?, "Withdraw")',
      ['account123', amount]
    );
  });

  
  // Example test for updateClientInfo method
  test('updateClientInfo method', async () => {
    // Mock the query result for updateClientInfo method
    Database.query.mockResolvedValue({ /* mocked result */ });
    
    const newFirstName = 'John';
    const newLastName = 'Doe';
    const newPin = '4321';

    await client.updateClientInfo(newFirstName, newLastName, newPin);

    // Check if the Database.query method was called with the correct arguments
    expect(Database.query).toHaveBeenCalledWith(
      'UPDATE Clients SET firstName = ?, lastName = ?, pin = ? WHERE accountCode = ?',
      [newFirstName, newLastName, newPin, 'account123']
    );
  });
});

