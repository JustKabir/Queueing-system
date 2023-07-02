const Models = require("../database/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Organization Login
exports.organizationLogin_post = async(req, res)=>{
    try {
        // fetching Organization
        const organization = await Models.organization.findOne({
            where:{
                email:req.body.email
            },
            attributes:{
                exclude:['createdAt', 'updatedAt', 'image', 'gpsLocation','radius']
            }
        })
        // verifying password
        if (organization && await bcrypt.compare(req.body.password, organization.password)) {
            const key = process.env.ACCESS_TOKEN_SECRET;
            const accessToken = jwt.sign({email:organization.email}, key,{
                expiresIn: '30d'
            });
             delete organization.dataValues['password'];
             const data = organization.dataValues;
            return res.status(200).json({success:true, JWT_TOKEN: accessToken, message:"You have successfully logged in",  organization:data})
        }
        return res.status(401).json({success:false, message:"Incorrect email or password"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}

// Organization Register
exports.organizationRegister_post = async(req,res)=>{
    try {
        // check if that user exists in the db
        const organization = await Models.organization.findOne({where:{email:req.body.email}});
            if (!organization) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await Models.organization.create({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                type: req.body.type,
                description: req.body.description,
                helpDeskNo: req.body.helpDeskNo,
                openingTime: req.body.openingTime,
                closingTime: req.body.closingTime,
                startBreakTime: req.body.startBreakTime,
                endBreakTime: req.body.endBreakTime,
                approxTimeInHours: req.body.approxTimeInHours,
                approxTimeInMinutes: req.body.approxTimeInMinutes,
                password: hashedPassword,
            });
            return res.status(201).json({success:true, message:`name: ${req.body.name} has been sucessfully registered`});
            }
            return res.status(409).json({success:false, message:"This email or username is already taken"})   


    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}
