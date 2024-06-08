const Database = require('../Database.js');
const ClientInfo = require('../ClientInfo.js'); // Adjust the path accordingly

jest.mock('../Database.js'); // Mock the database module

describe('ClientInfo class', () => {
  let clientInfo;

  beforeEach(() => {
    clientInfo = new ClientInfo();
  });
  test('getClientBasedOnId method', async () => {
    // Mock the query result for getClientBasedOnId method
    const mockedClientData = { clientId: 123, firstName: 'John', lastName: 'Doe' };
    Database.query.mockResolvedValueOnce([mockedClientData]);
  
    const clientId = 123;
    const result = await clientInfo.getClientBasedOnId(clientId);
  
    // Check if the result matches the expected value based on the mocked data
    const expectedData = { clientId: 123, firstName: 'John', lastName: 'Doe' };
  
    expect(result).toEqual(expectedData);  // Directly compare the objects
  });
});
