"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/*jshint esversion: 6 */
const pg_1 = require("pg");
class Database {
    constructor() {
        this.pool = new pg_1.Pool(Database.config);
    }
    static getDB() {
        if (Database.db == null) {
            Database.db = new Database();
        }
        return Database.db;
    }
}
Database.config = {
    user: 'admin',
    host: '35.199.91.206',
    database: 'arti',
    password: 'admin123',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};
exports.Database = Database;
__export(require("pg"));
