import cors from "cors";
import express from "express";
import jwt from "../services/authentication/middleware/jwt.js";

export function registerPlugins(app) {
  app.use(cors());
  app.use(express.json());

  app.use(jwt);
}
