/**
 * @author ramkishore
 */

/**
 * Function to save the given payload to mogno db.
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

module.exports = {insertPayload}