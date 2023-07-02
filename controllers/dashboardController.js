const Models = require('../database/models');
const { Op } = require("sequelize");


// Edit Organization Details
exports.editDetails_patch = async(req, res)=>{
    try {
        // update it to the user
        await Models.organization.update(req.body, {where:{email:req.email}});
        return res.status(200).json({success:true, message:"You have successfully updated the details"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}

// default page details
exports.dashboard_get = async(req,res)=>{
    try {
        // fetching Org details
        const org = await Models.organization.findone({where:{email:req.email}})
        //Queue length
        const queueLength = await Models.User.findOne({
            where:{
                [Op.and]:[
                {orgId:org.id},
                    {attended:false}
                ]
            },
            order:[['createdAt', 'DESC']]
        });
        // current no
       const currentNumber = await Models.User.findOne({
        where:{
            [Op.and]:[
                {orgId:org.id},
                {attended:true}
            ]
        },
        order:[['createdAt', 'ASC']]
       })
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
    }
}
// fetch count down
// fetch help desk no


// Enter Email


// Next token button
