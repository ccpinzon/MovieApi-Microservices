import * as express from "express";

const router = express.Router()

const movieApi = require('./movieapi.service')
const favoriteApi = require('./favoriteapi.service')

router.use((req,res,next) => {
    console.log(`Call Service -> ${req.path}`)
    next()
})

router.use(movieApi)
router.use(favoriteApi)
module.exports = router
