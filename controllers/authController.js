const Models = require("../database/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Login
exports.adminLogin_post = async(req, res)=>{
    try {
        // fetching admin
        const admin = await Models.Admin.findOne({
            where:{
                email:req.body.email
            },
            attributes:{
                exclude:['createdAt', 'updatedAt']
            }
        })
        // verifying password
        if (admin && await bcrypt.compare(req.body.password, admin.password)) {
            const key = process.env.ACCESS_TOKEN_SECRET;
            const accessToken = jwt.sign({email:admin.email}, key,{
                expiresIn: '30d'
            });
             delete admin.dataValues['password'];
             const data = admin.dataValues;
            return res.status(200).json({success:true, accesss_token: accessToken, message:"You have successfully logged in",  admin:data})
        }
        return res.status(401).json({success:false, message:"Incorrect email or password"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}

// Admin Register
exports.adminRegister_post = async(req,res)=>{
    try {
        // check if that user exists in the db
        const admin = await Models.Admin.findOne({where:{email:req.body.email}});
            if (!admin) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await Models.Admin.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            return res.status(201).json({success:true, message:`name: ${req.body.name} has been sucessfully registered`});
            }
            return res.status(409).json({success:false, message:"This email already has an account"})   


    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}
