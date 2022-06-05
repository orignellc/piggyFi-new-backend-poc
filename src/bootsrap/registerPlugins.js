import cors from "cors";
import express from "express";
import jwt from "../modules/user/middleware/jwt.js";
import dotenv from "dotenv";

export function registerPlugins(app) {
  dotenv.config();
  app.use(cors());
  app.use(express.json());

  app.use(jwt);
}
