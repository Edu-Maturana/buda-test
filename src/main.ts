import express from "express";
import bodyParser from "body-parser";
import SpreadModule from "./spread/SpreadModule";

const app = express();
const spreadModule = new SpreadModule();

const apiPrefix = "/api/v1";

app.use(bodyParser.json());

app.use(`${apiPrefix}/spread`, spreadModule.getRouter());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
