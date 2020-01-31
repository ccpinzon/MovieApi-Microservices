"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const envs = require("../enviroments");
const apiAdapter = require("./api.adapter");
exports.router = express.Router();
const api = apiAdapter.apiAdapter(envs.baseUrlFavoriteApi);
// services
const getToSee = "/user/movies/toSee";
const getFavorites = "/user/movies/favorite";
const createUser = "/user";
const saveFavoriteMovie = "/movie/favorite";
const saveToSee = "/movie/toSee";
const saveTvToFavorite = "/tv/favorite";
const saveTvToSee = "/tv/toSee";
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
 *  get to see movies
 */
exports.router.get(getToSee.concat('/:userId'), (req, res) => {
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
 * get favorites movies
 */
exports.router.get(getFavorites.concat('/:userId'), (req, res) => {
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
 * create user
 */
exports.router.post(createUser, (req, res) => {
    api.post(req.path, {
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
 *  save favorite movie
 */
exports.router.post(createUser, (req, res) => {
    api.post(req.path, {
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
 * save favorite movie
 */
exports.router.post(saveFavoriteMovie, (req, res) => {
    const { body } = req;
    api.post(req.path, body).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        res.status(error.response.status);
        res.send(error.response.data);
        res.status(400).send('Something broke!');
    });
});
/**
 * save favorite TV
 */
exports.router.post(saveTvToFavorite, (req, res) => {
    const { body } = req;
    api.post(req.path, body).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        res.status(error.response.status);
        res.send(error.response.data);
        res.status(400).send('Something broke!');
    });
});
/**
 * save toSee Movie
 */
exports.router.post(saveToSee, (req, res) => {
    const { body } = req;
    api.post(req.path, body).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        res.status(error.response.status);
        res.send(error.response.data);
        res.status(400).send('Something broke!');
    });
});
/**
 * save toSee Tv
 */
exports.router.post(saveTvToSee, (req, res) => {
    const { body } = req;
    api.post(req.path, body).then((resp) => {
        res.send(resp.data);
    }).catch((error) => {
        res.status(error.response.status);
        res.send(error.response.data);
        res.status(400).send('Something broke!');
    });
});
