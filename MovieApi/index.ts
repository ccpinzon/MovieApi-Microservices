import * as apiManager from "./managers/api.manager"
import * as express from "express"
import {timeWindowEnum} from "./models/timeWindow.enum"
import * as cors from 'cors'
import {TypeMovieEnum} from "./models/typeMovie.enum";

const PORT = Number(process.env.PORT) || 8080

const app = express()

app.use(cors({origin: true}))
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});
app.get("/", async (req, res) => {
    //res.send("🎉 Hello TypeScript! 🎉");

    const response = await apiManager.testManager()
    res.send(response)
})


/**
 * trending movies and show tv
 */
app.get("/:type/trending/:time", async (req, res) => {

    let timeAux: timeWindowEnum = timeWindowEnum.WEEK
    console.log('path params -> ' + JSON.stringify(req.params))
    if (req.params.time) {

        const paramTime = req.params.time

        if (paramTime === timeWindowEnum.WEEK.toString()) {
            timeAux = timeWindowEnum.WEEK
        } else if (paramTime === timeWindowEnum.DAY.toString()) {
            timeAux = timeWindowEnum.DAY
        }
    }
    try {
        console.log('find by -> ' + timeAux)
        const typeMovie = req.params.type
        let response = await apiManager.getTrendingMovies(timeAux)
        if (typeMovie === TypeMovieEnum.MOVIE.toString() ) {
            response = await apiManager.getTrendingMovies(timeAux)
        }else if ( typeMovie === TypeMovieEnum.TV.toString() ){
            response = await apiManager.getTrendingTv(timeAux)
        }
        res.send(response)
    } catch (e) {
        console.error(e)
        res.status(400).send(e)
    }
})




/**
 * search movies or series
 */
app.get("/:type/search/", async (req, res) => {
    let textToSearch: string = ""

    if (req.query) {
        textToSearch = req.query.text
        console.log("Text to search in movie api -> " + textToSearch)

        try {
            const typeMovie = req.params.type
            let response;
            if ( typeMovie === TypeMovieEnum.MOVIE.toString() ){
                response = await apiManager.getMoviesBySearch(textToSearch)
            }else if ( typeMovie === TypeMovieEnum.TV.toString() ) {
                response = await apiManager.getTvsBySearch(textToSearch)
            }

            //console.log('response ->' + JS0ON.stringify(response))
            res.setHeader('Content-Type', 'application/json');
            res.json(response)

        } catch (e) {
            console.error(e)
            res.status(400).send(e)
        }

    }else {
        res.status(400).send('no data search')
    }


})

app.get("/:type/:id", async (req, res) => {

    try {
        const typeMovie = req.params.type
        const id: number = Number(req.params.id)
        let response;
        if ( typeMovie === TypeMovieEnum.MOVIE.toString() ){
            response = await apiManager.getMovieById(id)
        }else if ( typeMovie === TypeMovieEnum.TV.toString() ) {
            response = await apiManager.getTvById(id)
        }
        res.send(response)
    } catch (e) {
        console.error(e)
        res.status(400).send(e)
    }

})



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
