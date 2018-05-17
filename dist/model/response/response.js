"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(timeStamp, message, url) {
        this.timeStamp = timeStamp;
        this.message = message;
        if (url)
            this.url = url;
    }
}
exports.Response = Response;
