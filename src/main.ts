import express from "express";
import SpreadModule from "./spread/SpreadModule";

const app = express();
const spreadModule = new SpreadModule();

const apiPrefix = "/api/v1";

app.use(`${apiPrefix}/spread`, spreadModule.getRouter());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
