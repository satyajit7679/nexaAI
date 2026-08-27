import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import router from "./routes/auth.route.js"
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dotenv.config()

const PORT = process.env.PORT || 5001;

const app=express()
app.use(express.json())
app.use("/",router)
app.get("/",(req,res)=>{
    res.json({message:"hello from auth"})
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
    connectDb()
})
