import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
        quizId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz"
        },
        text: String,
        option: [String],
        correctAnswer: String,
        point: Number,
},
        { timestamps: true }
);
export default mongoose.model("Question",questionSchema);