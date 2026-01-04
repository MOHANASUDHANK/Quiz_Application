import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import quizRouter from "./routes/quizRoutes.js"
import userRouter from "./routes/userRoutes.js"
import questionRouter from "./routes/questionRoutes.js"
import resultRouter from "./routes/resultRoutes.js"
import authRouter from "./routes/authRoutes.js"
import dotenv from "dotenv"

const app = express()
app.use(express.json())
app.use(cors());
dotenv.config();

app.use("/quiz",quizRouter);
app.use("/user",userRouter);
app.use("/question",questionRouter);
app.use("/result",resultRouter);
app.use("/auth",authRouter)

mongoose.connect("mongodb://localhost:27017/quiz_app")
        .then(() => console.log("db connected"))

export default app;