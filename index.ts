import {testManager} from "./managers/api.manager";

const PORT = Number(process.env.PORT) || 8080;
import * as express from "express";

const app = express();

app.get("/", async (req, res) => {
  //res.send("🎉 Hello TypeScript! 🎉");

  const response = await testManager();
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
