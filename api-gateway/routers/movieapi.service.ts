import * as express from "express";
const apiAdapter = require("./api.adapter")
import * as envs from "../enviroments"

const router = express.Router()

const BASE_URL = envs.baseUrlTheMovieApi

const api = apiAdapter(BASE_URL)

// services

const getTrendingMovies = "/movies/trending"


api.interceptors.request.use((request) => {
    console.log(`Starting | Request OMS -> ${JSON.stringify(request)}`);
    return request;
});

api.interceptors.response.use((response) => {
    console.log(`Response OMS CODE -> : ${response.status}`);
    console.log(`Response OMS DATA -> : ${JSON.stringify(response.data)}`);
    return response;
});

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

module.exports = router

