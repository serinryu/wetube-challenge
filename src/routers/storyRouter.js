import express from "express";
import { seeStory, editStory, deleteStory } from "../controllers/storyControllers.js";

const storyRouter = express.Router();

storyRouter.get("/:id", seeStory);
storyRouter.get("/:id/edit", editStory);
storyRouter.get("/:id/delete", deleteStory);

export default storyRouter;