import express from "express";
import dotenv from "dotenv";
import { initialize } from "./bootsrap/initialize.js";

dotenv.config();

let app = express();

initialize(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on PORT " + PORT);
});
