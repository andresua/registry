import {Request, Response} from '../model/model';
import * as X from 'express';
import { Database } from './pgPool';

export class Registry {

    constructor() {

    }

    static updateUrl(request: Request, req: X.Request, response: X.Response, callback: any) {
        console.log(request);
        let url = request.Body.url;
        let cost = request.Body.cost;
        let operation = request.Body.operation;
        let id: number = Math.floor(Math.random() * 999999998 + 1);
        let correlationId: string = request.HeaderData.correlationId;
        let message: string;
        
        let a = () => {
        Database.getDB().pool.query(
            'select * from variables where url=$1', [url],
            (err, resultId) => {
                if(err) {
                    console.log(err);
                    message = "Problemas al registrar el url en el Marketplace";  
                    id = null;
                    callback(req, response, new Response(new Date(),
                            message));
                } else {console.log("-----1");
                        if(resultId.rows[0].length > 0) {
                            Database.getDB().pool.query(
                                'UPDATE "variables" ' +
                                'SET cost = $1 ' +
                                'WHERE url = $2', [cost, url],
                                (err, result) => {
                                    if(err) {
                                        console.log(err);
                                        message = "Problemas al registrar la url en el Marketplace";  
                                        id = null;
                                        callback(req, response, new Response(new Date(),
                                                message));
                                    } else {console.log("-----2");
                                        message = "La url se registró de forma exitosa";
                                            callback(req, response, new Response(new Date(),
                                                message));
                                    }
                            });
                        } else {
                            Database.getDB().pool.query(
                                'INSERT INTO "variables" ' +
                                '(id, url, cost, operation) ' +
                                'VALUES($1, $2, $3, $4)', [new Date().getUTCDate(), url, cost, operation],
                                (err, result) => {
                                    if(err) {
                                        console.log(err);
                                        message = "Problemas al registrar la url en el Marketplace";  
                                        id = null;
                                        callback(req, response, new Response(new Date(),
                                                message));
                                    } else {console.log("-----2");
                                        message = "La url se registró de forma exitosa";
                                            callback(req, response, new Response(new Date(),
                                                message));
                                    }
                            });
                        }
                }
        });
        };
        a();
    }

    static getUrl(request: Request, req: X.Request, response: X.Response, callback: any) {
        console.log(request);
        let url = request.Body.url;
        let cost = request.Body.cost;
        let operation = request.Body.operation;
        let id: number = Math.floor(Math.random() * 999999998 + 1);
        let correlationId: string = request.HeaderData.correlationId;
        let message: string;
        
        let a = () => {
        Database.getDB().pool.query(
            'select * from variables where operation=$1 ORDER BY cost DESC', [operation],
            (err, resultId) => {
                if(err) {
                    console.log(err);
                    message = "Problemas al leer el url en el Marketplace";  
                    id = null;
                    callback(req, response, new Response(new Date(),
                            message));
                } else {console.log("-----1");
                        if(resultId.rows[0].length > 0) {
                            Database.getDB().pool.query(
                                'UPDATE "variables" ' +
                                'SET cost = $1 ' +
                                'WHERE url = $2', [cost, url],
                                (err, result) => {
                                    if(err) {
                                        console.log(err);
                                        message = "Problemas al registrar la url en el Marketplace";  
                                        id = null;
                                        callback(req, response, new Response(new Date(),
                                                message));
                                    } else {console.log("-----2");
                                        message = "La url se registró de forma exitosa";
                                        callback(req, response, new Response(new Date(),
                                            message));
                                    }
                            });
                        } else {
                            callback(req, response, new Response(new Date(),
                                                message));
                        }
                }
        });
        };
        a();
    }

}