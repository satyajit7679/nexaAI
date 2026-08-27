import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/chat.routes.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "hello from chat" });
});
app.get("/test", (req, res) => {
  res.json({ message: "chat service working" });
});
app.use("/", router);

app.listen(port, () => {
  console.log(`chat started at ${port}`);
  connectDb();
});
