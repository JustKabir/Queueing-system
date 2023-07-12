const Joi = require("joi");

exports.counterDetailsPatch = (req,res,next)=>{
    try {
        const schema = Joi.object({
             name: Joi.string().min(3).max(25).trim(true),
             address: Joi.string().min(3).max(200).trim(true),
             type: Joi.string().min(2).max(20).trim(true),
             description: Joi.string().min(5).max(250),
             helpDeskNo: Joi.string().length(10).pattern(/^[0-9]+$/),
             openingTime: Joi.date().iso(),
             closingTime: Joi.date().iso(),
             startBreakTime: Joi.date().iso(),
             endBreakTime: Joi.date().iso(),
             approxTimeInHours: Joi.number().integer().max(22),
             approxTimeInMinutes: Joi.number().integer().max(60),
        });
        const {error} = schema.validate(req.body, {abortEarly:false});
        if(error){
            console.log(error);
            const {details} = error;
            const {message} = error
            return res.status(401).json({success:false, error:message});
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Something went wrong please try again later"})
    }
} 
exports.createCounter = (req,res,next)=>{
    try {
        const schema = Joi.object({
             name: Joi.string().min(3).max(25).trim(true).required(),
             address: Joi.string().min(3).max(200).trim(true),
             type: Joi.string().min(2).max(20).trim(true),
             description: Joi.string().min(5).max(250),
             helpDeskNo: Joi.string().length(10).pattern(/^[0-9]+$/),
             openingTime: Joi.date().iso(),
             closingTime: Joi.date().iso(),
             startBreakTime: Joi.date().iso(),
             endBreakTime: Joi.date().iso(),
             approxTimeInHours: Joi.number().integer().max(22).required(),
             approxTimeInMinutes: Joi.number().integer().max(60).required(),
        });
        const {error} = schema.validate(req.body, {abortEarly:false});
        if(error){
            console.log(error);
            const {details} = error;
            const {message} = error
            return res.status(401).json({success:false, error:message});
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Something went wrong please try again later"})
    }
} 