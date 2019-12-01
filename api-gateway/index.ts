import * as express from "express";
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
const router = require('./routers/router')

const PORT = Number(process.env.PORT) || 8080;

const app = express();

app.use(cors({origin: true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get("/", async (req, res) =>{
    res.send("🎉 Hello ApiGateway 🎉");

});

app.use(router)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
