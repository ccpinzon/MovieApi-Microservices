import * as express from "express";
import * as cors from 'cors'

const PORT = Number(process.env.PORT) || 8080;

const app = express();

app.use(cors({origin: true}))

app.get("/", async (req, res) =>{
    res.send("🎉 Hello TypeScript! 🎉");

});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
