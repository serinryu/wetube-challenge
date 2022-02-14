import express from "express";
import { movieDetail, getUpload, postUpload, getEdit, postEdit, deleteMovie } from "../controllers/movieController.js";
import { protectorMiddleware, publicOnlyMiddleware, uploadMovie } from "../middlewares.js";

const movieRouter = express.Router();

movieRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(uploadMovie.fields([
        { name : "video" }, 
        { name : "thumb" }
    ]), postUpload);
movieRouter
    .get("/:id", movieDetail);
movieRouter
    .route("/:id/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(uploadMovie.fields([
        { name : "video" },
        { name : "thumb" }
    ]), postEdit);
movieRouter
    .all(protectorMiddleware)
    .get("/:id/delete", deleteMovie);

export default movieRouter;
