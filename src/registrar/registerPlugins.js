import cors from "cors";
import express from "express";

export function registerPlugins(app) {
  app.use(cors());
  app.use(express.json());
}
