"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Refund {
    constructor(id, refound_date, cause, product_state, stock_entry, units) {
        this.id = id;
        this.refound_date = refound_date;
        this.cause = cause;
        this.product_state = product_state;
        this.stock_entry = stock_entry;
        this.units = units;
    }
}
exports.Refund = Refund;
