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
        let dashboardData = {};

        // fetching Org details
        const org = await Models.organization.findone({where:{email:req.email}});

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

        dashboardData['queueLength']= queueLength.tokenNo;

        // current no
       const currentNumber = await Models.User.findOne({
        where:{
            [Op.and]:[
                {orgId:org.id},
                {attended:true}
            ]
        },
        order:[['createdAt', 'ASC']]
       });
 
       dashboardData['currentNo'] = currentNumber;
 
       return res.status(200).json({success:true, data:dashboardData})
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
    }
}

// Next token button
exports.nextToken_patch = async(req,res)=>{
    try {
        const org = await Models.organization.findOne({where:{email:req.email}});
        
        // check currentTokenNo is the last no
        const lastTokenNo = await Models.User.findOne({
            where:{
                [Op.and]:[
                {orgId:org.id},
                    {attended:false}
                ]
            },
            order:[['createdAt', 'DESC']]
        });
        console.log(lastTokenNo)
        if(lastTokenNo.tokenNo<org.currentTokenNo+1) return res.status(404).json({success:false, message:"The queue is empty"});
        
        // Updating the currentTokenNo
        await Models.organization.update({currentTokenNo:org.currentTokenNo+1}, {where:{id:org.id}});
        return res.status(200).json({success:true,nextTokenNo:lastTokenNo.tokenNo, message:`next token no is: ${org.currentTokenNo +1}`})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
        
    }
}