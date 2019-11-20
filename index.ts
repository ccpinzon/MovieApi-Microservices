import {getTrendingMovies, testManager} from "./managers/api.manager";
import * as express from "express";
import {timeWindowEnum} from "./models/timeWindow.enum";

const PORT = Number(process.env.PORT) || 8080;

const app = express();

app.get("/", async (req, res) => {
  //res.send("🎉 Hello TypeScript! 🎉");

  const response = await testManager();
  res.send(response);
});

app.get("/movies/trending/:time" , async (req, res) => {

  // TODO: FIX DAY AND WEEK PATH! OR USE QUERY IS MORE EASY
  let timeAux = timeWindowEnum.WEEK
  if (req.path){
    console.log('path -> ' + JSON.stringify(req.path))
    if (req.path === timeWindowEnum.WEEK.toString()){
      timeAux = timeWindowEnum.WEEK
    }else if (req.path === timeWindowEnum.DAY.toString()) {
      timeAux = timeWindowEnum.DAY
    }
  }
  try {
    const response = await getTrendingMovies(timeAux)
    res.send(response)
  }catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
