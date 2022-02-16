import express from "express";
import { registerView, createComment } from "../controllers/movieController.js"

const apiRouter = express.Router();

apiRouter.post("/movies/:id/view", registerView);
apiRouter.post("/movies/:id/comment", createComment);

export default apiRouter;