"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const movieApi = require("./movieapi.service");
const favoriteApi = require("./favoriteapi.service");
exports.router = express.Router();
exports.router.use((req, res, next) => {
    console.log(`Call Service -> ${req.path}`);
    next();
});
exports.router.use(movieApi.router);
exports.router.use(favoriteApi.router);
