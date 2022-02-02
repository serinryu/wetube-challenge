import express from "express";
import { getJoin, postJoin, getLogin, postLogin, logout, profile , getEditprofile, postEditprofile, getChangePassword, postChangePassword } from "../controllers/userController.js";
import { protectorMiddleware, uploadFiles } from "../middlewares.js";

const userRouter = express.Router();
userRouter
    .route("/join")
    .get(getJoin)
    .post(postJoin);
userRouter
    .route("/login")
    .get(getLogin)
    .post(postLogin);
userRouter
    .get("/logout", logout);
userRouter
    .get("/profile/:username", profile);
userRouter
    .route("/profile/:username/edit")
    .all(protectorMiddleware)
    .get(getEditprofile)
    .post(uploadFiles.single("avatar"), postEditprofile); //로그인 한 사람만 들어올 수 있도록 미들웨어 설정.
userRouter
    .route("/changepassword")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);


export default userRouter;
