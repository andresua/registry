"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../database/registry");
class Controller {
    constructor() {
    }
    updateUrl(request, res, response, callback) {
        let req = request.body;
        registry_1.Registry.updateUrl(req, request, res, callback);
    }
    getUrl(request, res, response, callback) {
        let req = request.body;
        registry_1.Registry.getUrl(req, request, res, callback);
    }
}
exports.Controller = Controller;
