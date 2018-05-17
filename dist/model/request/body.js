"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Body {
    constructor(url, operation, cost) {
        this.url = url;
        if (cost)
            this.cost = cost;
        if (operation)
            this.operation = operation;
    }
}
exports.Body = Body;
