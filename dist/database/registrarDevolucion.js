"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model/model");
const pgPool_1 = require("./pgPool");
class RegistrarDevolucion {
    constructor() {
    }
    static registrarDevolucion(request, req, response, callback) {
        console.log(request);
        let stock = request.Body.stock;
        let refund = request.Body.refund;
        let products = request.Body.products;
        let id = Math.floor(Math.random() * 999999998 + 1);
        let correlationId = request.HeaderData.correlationId;
        let stockId;
        let refundId;
        let productsIds = [];
        let message;
        let a = () => {
            pgPool_1.Database.getDB().pool.query('select coalesce(max(id), 0) + 1 id from stock', [], (err, resultId) => {
                if (err) {
                    console.log(err);
                    message = "Problemas al registrar la devolución en el Marketplace";
                    id = null;
                    callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                }
                else {
                    console.log("-----1");
                    pgPool_1.Database.getDB().pool.query('INSERT INTO "stock" ' +
                        '(id, units) ' +
                        'VALUES($1, $2)', [resultId.rows[0].id, stock.units], (err, result) => {
                        if (err) {
                            console.log(err);
                            message = "Problemas al registrar la devolución en el Marketplace";
                            id = null;
                            callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                        }
                        else {
                            console.log("-----2");
                            message = "La solicitud de devolución se registró de forma exitosa";
                            stockId = resultId.rows[0].id;
                            b();
                        }
                    });
                }
            });
        };
        let b = () => {
            pgPool_1.Database.getDB().pool.query('select coalesce(max(id), 0) + 1 id from refund', [], (err, resultId) => {
                if (err) {
                    console.log(err);
                    message = "Problemas al registrar la devolución en el Marketplace";
                    id = null;
                    callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                }
                else {
                    console.log("-----3");
                    pgPool_1.Database.getDB().pool.query('INSERT INTO "refund" ' +
                        '(id, refound_date, stock_entry, units) ' +
                        'VALUES($1, $2, $3, $4)', [resultId.rows[0].id, refund.refundDate, 1, refund.units], (err, result) => {
                        if (err) {
                            console.log(err);
                            message = "Problemas al registrar la devolución en el Marketplace";
                            id = null;
                            callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                        }
                        else {
                            console.log("-----4");
                            message = "La solicitud de devolución se registró de forma exitosa";
                            refundId = resultId.rows[0].id;
                            c();
                        }
                    });
                }
            });
        };
        let c = () => {
            products.forEach((product, index) => {
                pgPool_1.Database.getDB().pool.query('select coalesce(max(id), 0) + 1 id from product', [], (err, resultId) => {
                    if (err) {
                        console.log(err);
                        message = "Problemas al registrar la devolución en el Marketplace";
                        id = null;
                        callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                    }
                    else {
                        console.log("-----5");
                        pgPool_1.Database.getDB().pool.query('INSERT INTO "product" ' +
                            '(id, name, description, weight, width, height, information) ' +
                            'VALUES($1, $2, $3, $4, $5, $6, $7)', [parseFloat(resultId.rows[0].id) + index, product.name, product.description, product.weight, product.width, product.height, product.information], (err, result) => {
                            if (err) {
                                console.log(err);
                                message = "Problemas al registrar la devolución en el Marketplace";
                                id = null;
                                callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                            }
                            else {
                                console.log("-----6");
                                message = "La solicitud de devolución se registró de forma exitosa";
                                productsIds.push(parseFloat(resultId.rows[0].id) + index);
                                pgPool_1.Database.getDB().pool.query('select coalesce(max(id), 0) + 1 id from stock_list', [], (err, resultIdSL) => {
                                    if (err) {
                                        console.log(err);
                                        message = "Problemas al registrar la devolución en el Marketplace";
                                        id = null;
                                        callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                                    }
                                    else {
                                        console.log("-----7");
                                        pgPool_1.Database.getDB().pool.query('INSERT INTO "stock_list" ' +
                                            '(id, id_stock, id_product, id_refound) ' +
                                            'VALUES($1, $2, $3, $4)', [resultIdSL.rows[0].id, stockId, resultId.rows[0].id + index, refundId], (err, result) => {
                                            if (err) {
                                                console.log(err);
                                                message = "Problemas al registrar la devolución en el Marketplace";
                                                id = null;
                                                callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                                            }
                                            else {
                                                console.log("-----8");
                                                message = "La solicitud de devolución se registró de forma exitosa";
                                                if (index >= products.length - 1) {
                                                    if (id != null) {
                                                        correlationId = correlationId ? correlationId : id + '';
                                                    }
                                                    callback(req, response, new model_1.Response(new Date(), id, parseFloat(correlationId), stockId, productsIds, message));
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        };
        a();
    }
}
exports.RegistrarDevolucion = RegistrarDevolucion;
