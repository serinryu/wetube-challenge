import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import flash from "express-flash";
import {
    urlLogger, 
    timeLogger,
    securityLogger,
    localsMiddleware,
} from "./middlewares.js";
import globalRouter from "./routers/globalRouter.js";
import movieRouter from "./routers/movieRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//middleware   
app.use(flash())
app.use(express.urlencoded({ extended: true })); 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.DB_URL})
})) // 로그인 상태 유지 (세션)
app.use(localsMiddleware);
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);

/* 세션DB 에 저장된 정보 확인
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions)=>{
        console.log(sessions);
        next();
    })
})
*/

app.use("/assets", express.static("assets"));
app.use("/movies", express.static("movies"));
app.use("/texts", express.static("texts"));
app.use("/output", express.static("output"));

app.use("/", globalRouter);
app.use("/movies", movieRouter);
app.use("/user", userRouter);

export default app;