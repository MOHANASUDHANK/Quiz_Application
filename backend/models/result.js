import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
        quizId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz"
        },
        score: Number,
        totalPoints: Number,
        completedAt: {
                type: Date,
                default: Date.now
        }
},
        {
                timestamps: true
        });

export default mongoose.model("Result",resultSchema);