import Result from "../models/result.js";

export const submitResult = async (req,res) =>{
        try {
                const data = req.body;
                const result = new Result(data);
                result.save();
                console.log(result);
                res.status(200).json(result);

        } catch (err) {
                res.status(500).json({message : "Error while submitting result",error:err.message});
        }
}

export const getResultByQuizId = async (req,res) =>{
        try{
                const {id} = req.params;
                const data = await Result.find({quizId : id});
                console.log(data);
                res.status(200).json(data);
        }catch (err) {
                res.status(500).json({message : "Error while fetching result",error:err.message});
        }
}

export const getResultByUserId = async (req,res) =>{
        try{
                const {id} = req.params;
                const data = await Result.find({userId : id});
                console.log(data);
                res.status(200).json(data);
        }catch (err) {
                res.status(500).json({message : "Error while fetching result",error:err.message});
        }
}
