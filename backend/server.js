import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import quizRouter from "./routes/quizRoutes.js"
import userRouter from "./routes/userRoutes.js"
import questionRouter from "./routes/questionRoutes.js"
import resultRouter from "./routes/resultRoutes.js"
import authRouter from "./routes/authRoutes.js"
import dotenv from "dotenv"
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Your existing mongoose.connect code goes down here...
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors({
        origin: "*",
        credentials: true
}));

app.use("/quiz", quizRouter);
app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/result", resultRouter);
app.use("/auth", authRouter)

mongoose.connect(process.env.MONGO_DB, { family: 4 })
        .then(() => console.log("db connected"))

export default app;