/**
 * @author ramkishore
 */

const {MongoClient} = require("mongodb");
const {dbClientHolder} = require("./db-client-holder");



/**
 * Function to establish a connection with Mongo DB.
 */
function getDbClientConnection () {
    return new Promise(async (resolve) => {
        try {
            if(!dbClientHolder.getDbClient){
                let uri = "mongodb+srv://unilog:Unilog123@hackathon.nuruzip.mongodb.net/admin?authSource=admin&replicaSet=atlas-nza59q-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
                const clientObject = new MongoClient(uri);
                dbClientHolder.setDbClient = await clientObject.connect();
            }
            resolve(dbClientHolder.getDbClient);
        }
        catch (exception) {
            console.error(`MESSAGE : ${exception.message}, ERROR-STACK : ${exception.stack}`);
        }
    });
}

module.exports = {getDbClientConnection};







