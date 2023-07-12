require('dotenv').config();
const jwt = require('jsonwebtoken')
const  JWT_SECRET  = process.env.ACCESS_TOKEN_SECRET
const Models = require("../database/models");
// const organization = require('../database/models/organization');


module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ message: "You must be logged in" })
        }
        const token = authorization.replace("Bearer ", "")
        // console.log(`TOKEN: ${token}`)
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ message: "You must be logged in" })
            }
            const { email } = payload
            // console.log(player)
            Models.Admin.findOne({where:{email:email}}).then(organizationData => {
                req.email = organizationData.email
                next()
            }).catch((err) => {
                console.log(err)
                return res.status(404).json({success: false, message: `loginRequired, Inappropriate JWT`});
            })
        })
        
    } catch (error) {
        console.error(error);
        return res.status(404).json({success:false, message:`loginRequired, Something Went Wrong`});
    }
}