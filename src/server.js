import express from "express";
import {
    urlLogger, 
    timeLogger,
    securityLogger,
    protectorMiddleware
} from "./middlewares.js";
import movieRouter from "./routers/movieRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//middleware    
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware)

app.use("/", movieRouter);

export default app;