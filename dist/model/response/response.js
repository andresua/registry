"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(timeStamp, id, correlationId, stockId, productsIds, message) {
        this.timeStamp = timeStamp;
        this.id = id;
        this.correlationId = correlationId;
        this.stockId = stockId;
        this.productsIds = productsIds;
        this.message = message;
    }
}
exports.Response = Response;
