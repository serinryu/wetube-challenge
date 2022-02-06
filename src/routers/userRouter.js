import express from "express";
import { getJoin, postJoin, getLogin, postLogin, logout, profile , getEditprofile, postEditprofile, getChangePassword, postChangePassword } from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware, uploadProfile } from "../middlewares.js";

const userRouter = express.Router();
userRouter
    .route("/join")
    .all(publicOnlyMiddleware)
    .get(getJoin)
    .post(postJoin);
userRouter
    .route("/login")
    .all(publicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin);
userRouter
    .all(protectorMiddleware)
    .get("/logout", logout);
userRouter
    .get("/profile/:username", profile); //공개프로필
userRouter
    .route("/profile/:username/edit")
    .all(protectorMiddleware) //로그인한사람만 입장
    .get(getEditprofile)
    .post(uploadProfile.single("avatar"), postEditprofile); 
userRouter
    .route("/changepassword")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);


export default userRouter;
