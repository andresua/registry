"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registrarDevolucion_1 = require("../database/registrarDevolucion");
class Controller {
    constructor() {
    }
    registrarDevolucion(request, res, response, callback) {
        let req = request.body;
        registrarDevolucion_1.RegistrarDevolucion.registrarDevolucion(req, request, res, callback);
    }
}
exports.Controller = Controller;
