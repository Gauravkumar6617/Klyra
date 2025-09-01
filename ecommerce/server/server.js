import { configDotenv } from "dotenv";
import app from "./app.js";
import Connection from "./db.js";
configDotenv();

const PORT = process.env.PORT || 8080;

Connection();
app.listen(PORT,()=>{
    console.log(`server is running on port HTTP://${PORT}`);
});