"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DatabaseMongo {
    constructor() {
    }
    static updateCostFacturacion(costo, callback) {
        if (!(typeof costo === 'string')) {
            costo = '' + costo;
        }
        mongodb_1.MongoClient.connect(DatabaseMongo.url, (err, client) => {
            let costoCol = client.db(DatabaseMongo.dbName).collection('costo');
            costoCol.insert({ "value": costo }, () => callback());
            // costoCol.drop(() => client.db(DatabaseMongo.dbName).collection('costo').insert({"value": costo}, () => callback()));
        });
    }
}
DatabaseMongo.url = 'mongodb://localhost:27017';
DatabaseMongo.dbName = 'meteor';
exports.DatabaseMongo = DatabaseMongo;
