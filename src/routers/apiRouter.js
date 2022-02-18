import express from "express";
import { registerView, createComment, deleteComment } from "../controllers/movieController.js"

const apiRouter = express.Router();

apiRouter.post("/movies/:id/view", registerView);
apiRouter.post("/movies/:id/comment", createComment);
apiRouter.post("/movies/:id/comment/delete", deleteComment);

export default apiRouter;