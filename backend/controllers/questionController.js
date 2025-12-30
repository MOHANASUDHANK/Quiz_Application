import Question from "../models/question.js"

export const getQuestionByQuizId = async (req,res) => {
        try{
        const {id} = req.params;
        const data = await Question.find({quizId : id});
        console.log(data);
                res.status(200).json(data);
        } catch (err) {
                res.status(500).json({ message: "Error while fetching question", error: err.message });
        }
}

export const addQuestion = async (req, res) => {
        try {
                const data = await req.body;
                const quiz = new Question(data)
                Question.save();
                console.log(data);
                res.status(200).json(data);

        } catch (err) {
                res.status(500).json({ message: "Error while adding Question", error: err.message });

        }
}