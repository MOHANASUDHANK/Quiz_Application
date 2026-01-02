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
    const { userId, answer } = req.body;

    console.log("REQ PARAM ID:", id);
    console.log("REQ BODY:", req.body);

    const questions = await Question.find({ quizId: id });
    console.log("QUESTIONS LENGTH:", questions.length);

    let score = 0;
    let totalPoints = 0;

    questions.forEach((q, ind) => {
      console.log("Q POINT:", q.point);
      console.log("ANSWER:", answer[ind]);
      console.log("CORRECT:", q.correctAnswer);

      totalPoints += Number(q.point) || 0;

      if (answer[ind] === q.correctAnswer) {
        score += Number(q.point) || 0;
      }
    });

    console.log("FINAL SCORE:", score);
    console.log("TOTAL POINTS:", totalPoints);

    const result = new Result({
      quizId: id,      // ⚠️ IMPORTANT
      userId,
      score,
      totalPoints
    });

    await result.save();   // ❌ error is happening here
    res.status(200).json(result);

  } catch (err) {
    console.error("ATTEMPT QUIZ ERROR:", err);
    res.status(500).json({ message: "Error while submitting quiz", error: err.message });
  }
};
