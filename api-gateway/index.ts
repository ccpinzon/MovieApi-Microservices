import * as express from "express";
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as routerManager from "./routers/router"
const PORT = Number(process.env.PORT) || 8080;

const app = express();

app.use(cors({origin: true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get("/", async (req, res) =>{
    res.send("🎉 Hello ApiGateway 4 🎉");

});

app.use(routerManager.router)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
