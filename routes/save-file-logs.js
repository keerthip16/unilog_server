/**
 * @author ramkishore
 */

let express = require('express');
const {getDbClientConnection} = require("../mongodb/mongo-connection");
const {insertPayload} = require("../mongodb/mongo-db-dao");
let router = express.Router();


router.post('/', async function(req, res, next) {
    let requestBody = req.body;
    let dbClient = await getDbClientConnection();
    if(!Array.isArray(requestBody)){
        requestBody = Array.of(requestBody);
    }
    let writeResult = await insertPayload(dbClient, requestBody, "log-file-stash");
    res.send(writeResult);
});

module.exports = router;
