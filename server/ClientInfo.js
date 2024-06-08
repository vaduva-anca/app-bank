const Database = require('./Database.js');

class ClientInfo{
    // constructor(){

    // }


    async getClientBasedOnId(clientId){
        const sql = `
        select * from Clients 
        where clientID = ?;
    `;
    const [rows] = await Database.query(sql,[clientId]);
    return rows;
    }
}
module.exports=ClientInfo;