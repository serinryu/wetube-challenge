import express from "express";
import { movieDetail, getUpload, postUpload, getEdit, postEdit, deleteMovie } from "../controllers/movieController.js";
import { protectorMiddleware, publicOnlyMiddleware, uploadMovie } from "../middlewares.js";

const movieRouter = express.Router();

movieRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(uploadMovie.single("movie"), postUpload);
movieRouter
    .get("/:id", movieDetail);
movieRouter
    .route("/:id/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(uploadMovie.single("editmovie"), postEdit);
movieRouter
    .all(protectorMiddleware)
    .get("/:id/delete", deleteMovie);

/*

*/
//postupload ㄸㅐ multer 기능이 안되는데..ㅅㅂ...뭐지? 1시간 넘게 ;; 시발 뭐지? 뭐지?

export default movieRouter;
