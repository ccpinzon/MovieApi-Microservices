import * as express from "express";
import * as movieApi from "./movieapi.service"
import * as favoriteApi from "./favoriteapi.service"

export const router = express.Router()

router.use((req,res,next) => {
    console.log(`Call Service -> ${req.path}`)
    next()
})

router.use(movieApi.router)
router.use(favoriteApi.router)

