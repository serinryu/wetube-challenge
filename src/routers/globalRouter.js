import express from "express";
import { home, filterMovie } from "../controllers/movieController.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/search", filterMovie);

export default globalRouter;
