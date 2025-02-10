import Listening from "../models/listening.model.js";

export const createListining =async (req,res,next) =>{
    try{
        const listening = await Listening.create(req.body);
        res.status(201).json({
            message : "Listining created successfully!",
            listening
        });
    }catch(error){
        next(error);
    }
}