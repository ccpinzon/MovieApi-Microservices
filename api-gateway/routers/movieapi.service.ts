import * as express from "express";
import * as envs from "../enviroments"
import * as apiAdapter from "./api.adapter"

export const router = express.Router()

const api = apiAdapter.apiAdapter(envs.baseUrlTheMovieApi)

// services

const getTrendingMovies = "/movie/trending"
const getMovieById = "/movie"

const getTvById = "/tv"
const getTrendingTv = "/tv/trending"

api.interceptors.request.use((request) => {
    console.log(`Starting | Request api -> ${JSON.stringify(request)}`);
    return request;
});

api.interceptors.response.use((response) => {
    console.log(`Response api CODE -> : ${response.status}`);
    console.log(`Response api DATA -> : ${JSON.stringify(response.data)}`);
    return response;
});

/**
 * trending movies
 */

router.get(getTrendingMovies.concat('/:time'), (req, res) => {
    console.log("get trending movies")

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

})


/**
 * movie by id and search
 */
router.get(getMovieById.concat('/:id'), (req, res) => {
    console.log("get movie by id")

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

})


// series tv

/**
 * trending movies
 */

router.get(getTrendingTv.concat('/:time'), (req, res) => {
    console.log("get trending")

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

})


/**
 * movie by id and search
 */
router.get(getTvById.concat('/:id'), (req, res) => {
    console.log("get by id")

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

})


