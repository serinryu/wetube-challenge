import express from "express";
import {
    urlLogger, 
    timeLogger,
    securityLogger,
    protectorMiddleware,
    localsMiddleware
} from "./middlewares.js";
import globalRouter from "./routers/globalRouter.js";
import movieRouter from "./routers/movieRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//middleware   
app.use(express.urlencoded({ extended: true })); 
app.use(localsMiddleware);
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware)

app.use("/", globalRouter);
app.use("/movies", movieRouter);

export default app;