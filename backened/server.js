
const PORT=process.env.PORT||8000;
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Welcome to SmartToon!");
});
