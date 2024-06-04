import "dotenv/config";
import { connectDB } from "./db/config.js";
import express from "express";
import syncDb from "./db/init.js";
import allRoutes from "./routes/index.js";
const app = express();
connectDB();
app.use(express.json());
app.use(allRoutes);
connectDB();
syncDb();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
})
