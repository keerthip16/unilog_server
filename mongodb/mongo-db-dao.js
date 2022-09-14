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
    return new Promise(async (resolve, reject) => {
        try {
            let collectionDataList = await client.db("unilog").listCollections().toArray();
            let collectionNameList = collectionDataList.map(data => data["name"]);
            if(!collectionNameList.includes(collection)){
                reject(new Error("Invalid collection"));
            }
            if(!client){
                reject(new Error("DB connect exception"));
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