import express from "express";
import { registerView } from "../controllers/movieController.js"

const apiRouter = express.Router();

apiRouter.post("/movies/:id/view", registerView);

export default apiRouter;