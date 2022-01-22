import express from "express";
import { users, userProfile, editProfile } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/edit-profile", editProfile);
userRouter.get("/:id", userProfile);

export default userRouter;