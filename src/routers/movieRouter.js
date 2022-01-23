import express from "express";
import { home, movieDetail, filterMovie } from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/", home);
movieRouter.get("/filter", filterMovie);
movieRouter.get("/:id", movieDetail);

export default movieRouter;
