import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(cors());

mongoose.connect("mongodb://localhost:27017/quiz_app")
        .then(() => console.log("db connected"))

export default app;