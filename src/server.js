import express from "express";
import {
    urlLogger, 
    timeLogger,
    securityLogger,
    protectorMiddleware
} from "./middlewares.js";

const app = express();
const PORT = 4000;
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT} 🤡 `);

const home = (req, res) => res.send("<h1>Home</h1>");
const about = (req, res) => res.send("<h1>About</h1>");
const contact = (req, res) => res.send("<h1>Contact</h1>");
const login = (req, res) => res.send("<h1>Login</h1>"); 

app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware)

app.get("/", home);
app.get("/about", about);
app.get("/contact", contact);
app.get("/login", login);

app.listen(PORT, handleListening);