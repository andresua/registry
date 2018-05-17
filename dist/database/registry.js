"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model/model");
const pgPool_1 = require("./pgPool");
class Registry {
    constructor() {
    }
    static updateUrl(request, req, response, callback) {
        console.log(request);
        let url = request.Body.url;
        let cost = request.Body.cost;
        let operation = request.Body.operation;
        let id = Math.floor(Math.random() * 999999998 + 1);
        let correlationId = request.HeaderData.correlationId;
        let message;
        let a = () => {
            pgPool_1.Database.getDB().pool.query('select * from variables where url=$1', [url], (err, resultId) => {
                if (err) {
                    console.log(err);
                    message = "Problemas al registrar el url en el Marketplace";
                    id = null;
                    callback(req, response, new model_1.Response(new Date(), message));
                }
                else {
                    console.log("-----1");
                    if (resultId.rows.length > 0) {
                        pgPool_1.Database.getDB().pool.query('UPDATE "variables" ' +
                            'SET cost = $1 ' +
                            'WHERE url = $2', [cost, url], (err, result) => {
                            if (err) {
                                console.log(err);
                                message = "Problemas al registrar la url en el Marketplace";
                                id = null;
                                callback(req, response, new model_1.Response(new Date(), message));
                            }
                            else {
                                console.log("-----2");
                                message = "La url se registró de forma exitosa";
                                callback(req, response, new model_1.Response(new Date(), message));
                            }
                        });
                    }
                    else {
                        pgPool_1.Database.getDB().pool.query('INSERT INTO "variables" ' +
                            '(id, url, cost, operation) ' +
                            'VALUES($1, $2, $3, $4)', [new Date().getTime(), url, cost, operation], (err, result) => {
                            if (err) {
                                console.log(err);
                                message = "Problemas al registrar la url en el Marketplace";
                                id = null;
                                callback(req, response, new model_1.Response(new Date(), message));
                            }
                            else {
                                console.log("-----2");
                                message = "La url se registró de forma exitosa";
                                callback(req, response, new model_1.Response(new Date(), message));
                            }
                        });
                    }
                }
            });
        };
        a();
    }
    static getUrl(request, req, response, callback) {
        console.log(request);
        let url = request.Body.url;
        let cost = request.Body.cost;
        let operation = request.Body.operation;
        let id = Math.floor(Math.random() * 999999998 + 1);
        let correlationId = request.HeaderData.correlationId;
        let message;
        let a = () => {
            pgPool_1.Database.getDB().pool.query('select * from variables where operation=$1 ORDER BY cost ASC', [operation], (err, resultId) => {
                if (err) {
                    console.log(err);
                    message = "Problemas al leer el url en el Marketplace";
                    id = null;
                    callback(req, response, new model_1.Response(new Date(), message));
                }
                else {
                    console.log("-----1");
                    if (resultId.rows.length > 0) {
                        message = "La url se leyó de forma exitosa";
                        url = resultId.rows[0].url;
                        callback(req, response, new model_1.Response(new Date(), message, url));
                    }
                    else {
                        message = "No se encontró url actualizar";
                        callback(req, response, new model_1.Response(new Date(), message));
                    }
                }
            });
        };
        a();
    }
}
exports.Registry = Registry;
