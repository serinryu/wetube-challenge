import express from "express";
import { home, getUpload, postUpload, filterMovie } from "../controllers/movieController.js";
import { getConvert, postConvert, converDetail } from "../controllers/convertController.js";
import { convertFiles } from "../middlewares.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/upload").get(getUpload).post(postUpload);
globalRouter.get("/search", filterMovie);
globalRouter.route("/convert").get(getConvert). post(convertFiles.single("textfile"), postConvert);
globalRouter.get("/convert/:id", converDetail);

export default globalRouter;
