const Joi = require("joi");

exports.adminRegisterationValidation = (req,res,next)=>{
    try {
        const schema = Joi.object({
             name: Joi.string().min(3).max(25).trim(true).required(),
             email: Joi.string().email().trim(true).required(),
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
exports.adminLoginValidation = (req,res,next)=>{
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
