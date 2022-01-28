import "dotenv/config"; //.env 사용해주기 위함
import "./db.js";
import "./models/Movie.js";
import "./models/User.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT} 🤡 `);
app.listen(PORT, handleListening);