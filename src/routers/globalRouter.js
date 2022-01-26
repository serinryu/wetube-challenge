import express from "express";
import { home, getUpload, postUpload, filterMovie } from "../controllers/movieController.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/upload").get(getUpload).post(postUpload);
globalRouter.get("/search", filterMovie);


export default globalRouter;
