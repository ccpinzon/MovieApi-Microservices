"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
exports.apiAdapter = (baseURL) => axios_1.default.create({
    baseURL,
});
