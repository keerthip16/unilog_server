/**
 * @author ramkishore
 */

const {getDbClientConnection} = require("./mongodb/mongo-connection");
const {insertPayload} = require("./mongodb/mongo-db-dao");

let payLoad = [
    {
        "data": [
            {
                "id": 1,
                "attributes": {
                    "patientId": "2293",
                    "doctorId": "2508",
                    "slot": "9:30 AM - 10:30 AM",
                    "date": "2022-09-13 09:30:00",
                    "createdAt": "2022-09-14T06:17:54.552Z",
                    "updatedAt": "2022-09-14T06:18:26.702Z",
                    "publishedAt": "2022-09-14T06:18:26.700Z"
                }
            }
        ],
        "meta": {
            "pagination": {
                "page": 1,
                "pageSize": 25,
                "pageCount": 1,
                "total": 1
            }
        }
    }
]
getDbClientConnection().then(dbClient => {
    insertPayload(dbClient, payLoad).then(result => {
        console.log(result);
    })
})