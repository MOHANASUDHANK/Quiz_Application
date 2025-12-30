import mongoose from "mongoose";


const quizSchema = mongoose.Schema({

        title: String,
        description: String,
        categories: [String],
        difficulty: String,
        timeLimit: Number,
        createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
}
        , { timestamps: true }

);

export default mongoose.model("Quiz",quizSchema);

