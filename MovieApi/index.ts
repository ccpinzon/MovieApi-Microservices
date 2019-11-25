import * as apiManager from "./managers/api.manager"
import * as express from "express";
import {timeWindowEnum} from "./models/timeWindow.enum";
import * as cors from 'cors'

const PORT = Number(process.env.PORT) || 8080;

const app = express();

app.use(cors({origin: true}))
app.get("/", async (req, res) =>{
  //res.send("🎉 Hello TypeScript! 🎉");

  const response = await apiManager.testManager();
  res.send(response);
});

app.get("/movies/trending/:time" , async (req, res) => {

  let timeAux:timeWindowEnum = timeWindowEnum.WEEK
  console.log('path params -> ' + JSON.stringify(req.params))
  if (req.params.time){

    const paramTime = req.params.time

    if (paramTime === timeWindowEnum.WEEK.toString()){
      timeAux = timeWindowEnum.WEEK
    }else if (paramTime === timeWindowEnum.DAY.toString()) {
      timeAux = timeWindowEnum.DAY
    }
  }
  try {
    console.log('find by -> ' + timeAux)
    const response = await apiManager.getTrendingMovies(timeAux)
    res.send(response)
  }catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
})

app.get("/movies/search/", async (req, res) => {
  let textToSearch:string = ""

  if (req.query){
    textToSearch = req.query.text
    console.log("Text to search in movie api -> " + textToSearch)

    try {
      const response = await apiManager.getMoviesBySearch(textToSearch)
      res.send(response)
    }catch (e) {
      console.error(e)
      res.status(400).send(e)
    }

  }

})

app.get("/movies/:id", async (req, res) => {

  try {
    const idMovie: number = Number(req.params.id)
    const response = await apiManager.getMovieById(idMovie)
    res.send(response)
  }catch (e) {
    console.error(e)
    res.status(400).send(e)
  }

})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
