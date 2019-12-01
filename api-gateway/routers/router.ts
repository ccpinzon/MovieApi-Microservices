import * as express from "express";

const router = express.Router()

const movieApi = require('./movieapi.service')

router.use((req,res,next) => {
    console.log(`Call Service -> ${req.path}`)
    next()
})

router.use(movieApi)
module.exports = router
