import express from "express";
import SpreadModule from "./spread/SpreadModule";

const app = express();
const spreadModule = new SpreadModule();

app.use("/spread", spreadModule.getRouter());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
