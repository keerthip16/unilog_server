/**
 * @author Keerthi
 */
let express = require('express');
let router = express.Router();
const {getDbClientConnection} = require("../mongodb/mongo-connection");
const {getLog} = require("../mongodb/mongo-db-dao");
/**
 * get Function to get the latest process matrics
 */
router.get('/:kioskId/:key', async function (request, response) {
    console.log("REQUEST Params", request.params.kioskId);
    let requestParam = request.params;
    try {
        const kioskId = requestParam.kioskId;
        const key = requestParam.key;
        if (!kioskId || !key) {
            return response.status(400).send("Invalid input kiosk id and key is required path parameter");
        }
        getDbClientConnection().then(dbclient => {
            getLog(dbclient, kioskId, key).then(result => {
                return response.status(200).send(result);
            }).catch(error => {
                return response.status(500).send(error);
            });
        }).catch(error => {
            return response.status(500).send(error);
        });
    } catch (error) {
        console.log("error", error)
        return response.status(500).send(error);
    }
});

module.exports = router;