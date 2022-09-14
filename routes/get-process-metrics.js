/**
 * @author Keerthi
 */
let express = require('express');
let router = express.Router();
const { getDbClientConnection } = require("../mongodb/mongo-connection");
const { getLatestMetrics } = require("../mongodb/mongo-db-dao");
/**
 * get Function to get the latest process matrics
 */
router.get('/:kioskId', async function (request, response) {
    console.log("REQUEST Params", request.params.kioskId);
    requestParam = request.params.kioskId;
    try {
        const kioskId = requestParam;
        if (!kioskId) {
            return response.status(400).send("Invalid input kiosk id is required path parameter");
        }
        getDbClientConnection().then(dbclient => {
            getLatestMetrics(dbclient, kioskId, 'process-statistics').then(result => {
                return response.status(200).send(result);
            }).catch(error => {
                return response.status(500).send(error);
            }).catch(error => {
                return response.status(500).send(error);
            })
        })
    } catch (error) {
        console.log("error", error)
        return response.status(500).send(error);
    }
});

module.exports = router;