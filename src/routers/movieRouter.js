import express from "express";
import { movieDetail, getEdit, postEdit, deleteMovie } from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/:id", movieDetail);
movieRouter.route("/:id/edit").get(getEdit).post(postEdit);
movieRouter.get("/:id/delete", deleteMovie);


export default movieRouter;
