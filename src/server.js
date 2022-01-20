import express from "express";
import {
    urlLogger, 
    timeLogger,
    securityLogger,
    protectorMiddleware
} from "./middlewares.js";
import globalRouter from "./routers/globalRouter.js";
import storyRouter from "./routers/storyRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const PORT = 4000;
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT} 🤡 `);

//middleware    
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware)

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/stories", storyRouter);

app.listen(PORT, handleListening);