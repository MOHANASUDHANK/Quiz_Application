import Question from "../models/question.js";
import Result from "../models/result.js";

export const submitResult = async (req, res) => {
        try {
                const data = req.body;
                const result = new Result(data);
                await result.save();
                console.log(result);
                res.status(200).json(result);

        } catch (err) {
                res.status(500).json({ message: "Error while submitting result", error: err.message });
        }
}

export const getResultById = async (req, res) => {
        try {
                const { id } = req.params;
                const data = await Result.findById(id);
                console.log(data);
                res.status(200).json(data);
        } catch (err) {
                res.status(500).json({ message: "Error while fetching result", error: err.message });
        }
}

export const getResultByQuizId = async (req, res) => {
        try {
                const { id } = req.params;
                const data = await Result.find({ quizId: id });
                console.log(data);
                res.status(200).json(data);
        } catch (err) {
                res.status(500).json({ message: "Error while fetching result", error: err.message });
        }
}

export const getResultByUserId = async (req, res) => {
        try {
                const { id } = req.params;
                const data = await Result.find({ userId: id });
                console.log(data);
                res.status(200).json(data);
        } catch (err) {
                res.status(500).json({ message: "Error while fetching result", error: err.message });
        }
}

export const attemptQuiz = async (req, res) => {
  try {

    const { id } = req.params;
    const {answer } = req.body;
    const userId =  req.userId;
         
    if(! await Result.findOne({userId,quizId : id})){
  return res.status(400).json({ message: "Quiz already attempted" });
    }



    const questions = await Question.find({ quizId: id });

    let score = 0;
    let totalPoints = 0;

    questions.forEach((q, ind) => {

      totalPoints += Number(q.point) || 0;

      if (answer[ind] === q.correctAnswer) {
        score += Number(q.point) || 0;
      }
    });

    const result = new Result({
      quizId: id,     
      userId,
      score,
      totalPoints
    });

    await result.save();   
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: "Error while submitting quiz", error: err.message });
  }
};
