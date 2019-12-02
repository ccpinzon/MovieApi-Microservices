"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const envs = require("../enviroments");
const apiAdapter = require("./api.adapter");
exports.router = express.Router();
const api = apiAdapter(envs.baseUrlTheMovieApi);
// services
const getTrendingMovies = "/movies/trending";
const getMovieById = "/movies";
api.interceptors.request.use((request) => {
    console.log(`Starting | Request OMS -> ${JSON.stringify(request)}`);
    return request;
});
api.interceptors.response.use((response) => {
    console.log(`Response OMS CODE -> : ${response.status}`);
    console.log(`Response OMS DATA -> : ${JSON.stringify(response.data)}`);
    return response;
});
/**
 * trending movies
 */
exports.router.get(getTrendingMovies.concat('/:time'), (req, res) => {
    console.log("get trending movies");
    api.get(req.path, {
        // enviar parametros
        params: req.query,
    }).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        res.status(error.response.status);
        res.send(error.response.data);
        res.status(400).send('Something broke!');
    });
});
/**
 * movie by id and search
 */
exports.router.get(getMovieById.concat('/:id'), (req, res) => {
    console.log("get movie by id");
    api.get(req.path, {
        // enviar parametros
        params: req.query,
    }).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        res.status(error.response.status);
        res.send(error.response.data);
        res.status(400).send('Something broke!');
    });
});
