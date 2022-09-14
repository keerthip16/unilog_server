/**
 * @author ramkishore
 */

/**
 * Function to save the given payload to mongo db.
 *
 * @param client
 * @param jsonPayload
 * @param collection
 * @returns {Promise<unknown>}
 */
function insertPayload (client, jsonPayload, collection) {
    return new Promise((resolve, reject) => {
        try {
            if(!client){
                reject(new Error("DB connect exception"));
            }
            if(!collection){
                reject(new Error("Invalid collection"));
            }
            const result = client.db("unilog").collection(collection).insertMany(jsonPayload);
            resolve(result);
        } catch (exception) {
            console.error(`MESSAGE : ${exception.message}, ERROR-STACK : ${exception.stack}`);
            reject(exception);
        }
    });
}

function getLatestMetrics (client, kioskId, collection) {
    return new Promise((resolve, reject) => {
        try {
            if(!client){
                reject(new Error("DB connect exception"));
            }
            if(!collection){
                reject(new Error("Invalid collection"));
            }
            const query = {"kioskId": kioskId};
            const options = {};
            const result = client.db("unilog").collection(collection).find(query, options).sort({_id:-1}).limit(1).toArray();
            resolve(result);
        } catch (exception) {
            console.error(`MESSAGE : ${exception.message}, ERROR-STACK : ${exception.stack}`);
            reject(exception);
        }
    });
}
//TODO
function getLog (client, kioskId, key) {
    return new Promise((resolve, reject) => {
        try {
            if(!client){
                reject(new Error("DB connect exception"));
            }
            const query = {$and:[{"kioskId": kioskId},
                {"key" : key}]}
            const options = {};
            const result = client.db("unilog").collection("collection").findOne(query, options);
            resolve(result);
        } catch (exception) {
            console.error(`MESSAGE : ${exception.message}, ERROR-STACK : ${exception.stack}`);
            reject(exception);
        }
    });
}
module.exports = {insertPayload, getLatestMetrics, getLog}