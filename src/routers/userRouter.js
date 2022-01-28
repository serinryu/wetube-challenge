import express from "express";
import { getJoin, postJoin, getLogin, postLogin, logout, profile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter.get("/profile", profile);

export default userRouter;
