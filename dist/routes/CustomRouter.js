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
    updateUrl(req, res, next) {
        let response;
        try {
            new model_1.Controller().updateUrl(req, res, response, (req, res, response) => {
                console.log(response.timeStamp);
                console.log(response.message);
                try {
                    res.status(201);
                }
                catch (e) {
                    console.log(e);
                    res.status(500);
                    response = new model.Response(new Date(), "Error interno del servidor");
                }
                finally {
                    res.json(response ? response : {});
                    //res.send(res);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            response = new model.Response(new Date(), "Error interno del servidor");
            res.json(response ? response : {});
            //res.send(res);
        }
        finally {
        }
    }
    getUrl(req, res, next) {
        let response;
        try {
            new model_1.Controller().getUrl(req, res, response, (req, res, response) => {
                console.log(response.timeStamp);
                console.log(response.message);
                try {
                    res.status(201);
                }
                catch (e) {
                    console.log(e);
                    res.status(500);
                    response = new model.Response(new Date(), "Error interno del servidor");
                }
                finally {
                    res.json(response ? response : {});
                    //res.send(res);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            response = new model.Response(new Date(), "Error interno del servidor");
            res.json(response ? response : {});
            //res.send(res);
        }
        finally {
        }
    }
    init() {
        this.router.post('/', this.getUrl);
        this.router.post('/arti-4208/registry', this.getUrl);
        this.router.post('/arti-4208/registry/setUrl', this.updateUrl);
    }
}
exports.CustomRouter = CustomRouter;
const customRoutes = new CustomRouter();
customRoutes.init();
exports.default = customRoutes.router;
