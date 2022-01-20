import express from "express";
import { users, userProfile, editProfile } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/:id", userProfile);
userRouter.get("/edit-profile", editProfile);

export default userRouter;