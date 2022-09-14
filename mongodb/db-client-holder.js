/**
 * @author ramkishore
 */

const dbClientHolder = {
    dbClient : "",
    set setDbClient(newDbClient) {
        this.dbClient = newDbClient;
    },
    get getDbClient() {
        return this.dbClient;
    }
};


module.exports = {dbClientHolder};