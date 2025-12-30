import Quiz from "../models/quiz.js"

export const getAllQuiz = async (req, res) => {

        try {
                const data = await Quiz.find().populate("createdBy");
                console.log(data)
                res.status(200).json(data);
        }
        catch (err) {
                res.status(500).json({ message: "Error while fetching Quiz", error: err.message });
        }

}

export const getQuizById = async (req, res) => {
        try {
                const { id } = req.params;
                const data = await quiz.findById(id);
                console.log(data);
                res.status(200).json(data);
        } catch (err) {
                res.status(500).json({ message: "Error while fetching Quiz", error: err.message });
        }
}

export const addQuiz = async (req, res) => {
        try {
                const data = await req.body;
                const quiz = new Quiz(data)
                quiz.save();
                console.log(data);
                res.status(200).json(data);

        } catch (err) {
                res.status(500).json({ message: "Error while adding quiz", error: err.message });

        }
}

