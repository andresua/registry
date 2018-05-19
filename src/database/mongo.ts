import {MongoClient, Db, MongoError, MongoCallback, FilterQuery} from 'mongodb';

export class DatabaseMongo {
    private static url: string = 'mongodb://localhost:27017';
    private static dbName: string = 'meteor';
    
    constructor() {
    }
    
    public static updateCostFacturacion(costo: string | number, callback: any) : any {
        if(!(typeof costo === 'string')) {
            costo = '' + costo;
        }
        
        MongoClient.connect(DatabaseMongo.url, (err, client) => {
            let costoCol = client.db(DatabaseMongo.dbName).collection('costo');
            costoCol.drop(() => client.db(DatabaseMongo.dbName).collection('costo').insert({"value": costo}, () => callback()));
        });
    }
}