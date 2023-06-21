const Joi = require("joi");

exports.userRegisterValidation = (req,res,next)=>{
    try {
        const schema = Joi.object({
             name: Joi.string().min(3).max(25).trim(true).required(),
             email: Joi.string().email().trim(true).required(),
             address: Joi.string().min(3).max(200).trim(true).required(),
             type: Joi.string().min(2).max(20).trim(true).required(),
             description: Joi.string().min(5).max(250),
             helpDeskNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
             openingTime: Joi.date().iso().required(),
             closingTime: Joi.date().iso().required(),
             startBreakTime: Joi.date().iso(),
             endBreakTime: Joi.date().iso(),
             approxTimeInHours: Joi.number().integer().max(22).required(),
             approxTimeInMinutes: Joi.number().integer().max(60).required(),
             password: Joi.string().trim(true).required(),
             confirmPassword:Joi.string().required().valid(Joi.ref('password')),
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
exports.userLoginValidation = (req,res,next)=>{
    try {
        const schema = Joi.object({
             email: Joi.string().email().trim(true).required(),
             password: Joi.string().trim(true).required(),
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
