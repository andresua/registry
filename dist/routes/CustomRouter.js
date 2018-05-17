"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("../model/model");
const model = require("../model/model");
class CustomRouter {
    /**
    * Initialize the CustomRouter
    */
    constructor() {
        this.router = express_1.Router();
        this.controller = new model_1.Controller();
        this.init();
    }
    registrarDevolucion(req, res, next) {
        let response;
        try {
            new model_1.Controller().registrarDevolucion(req, res, response, (req, res, response) => {
                console.log(response.timeStamp);
                console.log(response.id);
                console.log(response.correlationId);
                console.log(response.stockId);
                console.log(response.productsIds);
                console.log(response.message);
                try {
                    if (response.id == null) {
                        res.status(409);
                    }
                    else {
                        res.status(201);
                    }
                }
                catch (e) {
                    console.log(e);
                    res.status(500);
                    response = new model.Response(new Date(), null, null, null, null, "Error interno del servidor");
                }
                finally {
                    res.json(response ? response : {});
                    res.send(res);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            response = new model.Response(new Date(), null, null, null, null, "Error interno del servidor");
            res.json(response ? response : {});
            res.send(res);
        }
        finally {
        }
    }
    init() {
        this.router.post('/', this.registrarDevolucion);
        this.router.post('/arti-4208/inventory/api/v1_0_0/enroll_return', this.registrarDevolucion);
    }
}
exports.CustomRouter = CustomRouter;
const customRoutes = new CustomRouter();
customRoutes.init();
exports.default = customRoutes.router;
