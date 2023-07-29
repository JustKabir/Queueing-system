const Models = require('../database/models');
const { Op } = require("sequelize");

// default page details
exports.dashboard_get = async(req,res)=>{
    try {
        // fetching Admin and its counter details
        const dashboardData = await Models.Admin.findOne({
            where:{email:req.email},
            attributes:{
                exclude:['password','createdAt','updatedAt','id']
            },
            include:[{
                model: Models.Counter,
                as:'counters',
                attributes:{
                    exclude:['gpsLocation','radius','image','adminId', 'updatedAt']
                }
            }]
        });
        return res.json({success:true, dashboardData:dashboardData,})
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
    }
}

// Create counter
exports.createCounter_post = async(req,res)=>{
    try {
        const admin  = await Models.Admin.findOne({where:{email: req.email},attributes:['id']})
        await Models.Counter.create({
            adminId:admin.id,
            name:req.body.name,
            address:req.body.address,
            type: req.body.type,
            description: req.body.description,
            helpDeskNo: req.body.helpDeskNo,
            openingTime:req.body.openingTime,
            closingTime: req.body.closingTime,
            startBreakTime: req.body.startBreakTime,
            endBreakTime:req.body.endBreakTime,
            approxTimeInHours:req.body.approxTimeInHours,
            approxTimeInMinutes: req.body.approxTimeInMinutes
        })
        return res.status(200).json({success:true, message:`${req.body.name} has been successfully created`})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}

// Edit counter Details
exports.editDetails_patch = async(req, res)=>{
    try {
        // fetching admin's ID
        const admin = await Models.Admin.findOne({
            where:{email:req.email},
            attributes:['id']
        })

        // checking if the admin owns the counter
        const check = await Models.Counter.findOne({where:{id:req.params.counterId, adminId:admin.id}});
        if(!check)return res.status(400).json({success:false, message:"Invalid request"})

        // update it to the user
        await Models.Counter.update(req.body, {where:{adminId:admin.id, id:req.params.counterId}});
        return res.status(200).json({success:true, message:"You have successfully updated the details"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:`Something went wrong, Please try again later`});
    }
}


// Single Counter 
exports.counter_get = async(req,res)=>{
    try {
        let counterData = {}

        // fething admin and the counter
        const admin = await Models.Admin.findOne({
            where:{email:req.email},
            attributes:{
                exclude:['password','createdAt','updatedAt','id']
            },
            include:[{
                model:Models.Counter,
                as:'counters',
                where:{id:req.params.counterId},
                attributes:{
                    exclude:['gpsLocation','radius','image','adminId', 'updatedAt']
                }
            }]
        });

        // checking if the admin wons the counter
        if(!admin) return res.status(400).json({success:false, message:"Invalid API request"})

        counterData = admin.counters[0].dataValues;

        //Queue length
        const queueLength = await Models.User.findOne({
            where:{
                [Op.and]:[
                {counterId:counterData.id},
                    {attended:false}
                ]
            },
            order:[['createdAt', 'DESC']]
        });

        if(queueLength) counterData['queueLength']= queueLength.tokenNo;

        return res.status(200).json({success:true, counterData:counterData})

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
    }
}
// Delete Counter 
exports.counter_delete = async(req,res)=>{
    try {
        // check if the counter exists
        const counter = await Models.Counter.findOne({where:{id:params.counterId}});
        if(!counter)return res.status(400).json({success:false, message:"Bad Method call"});
        
        // check if the admin owns the counter
        const adminAndCounter = await Models.Admin.findOne({
            where:{email:req.email},
            attributes:['id '],
            include:[{
                model:Models.Counter,
                as:'counters',
                where:{id:req.params.counterId},
                attributes:{
                    exclude:['gpsLocation','radius','image','adminId', 'updatedAt']
                }
            }]
        });
        if(!adminAndCounter)return res.status(400).json({success:false, message:"Bad Method call"});

        // check if the counter is being used
        const user = await Models.User.findOne({
            where:{
                [Op.and]:[
                {counterId:req.params.counterId},
                {attended:false}
                ]
            },
            order:[['createdAt', 'DESC']]
        });

        if(user){
            await Models.User.update({deleted:true},{where:{counterId:req.params.id}});
        }

        // delete the counter
        await Models.Counter.destroy({where:{id:req.params.id}})
        return res.status(200).json({success:true, })

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
    }
}


// Next token button
exports.nextToken_patch = async(req,res)=>{
    try {
        const counter = await Models.Counter.findOne({where:{id:req.params.counterId}});
        
        // check currentTokenNo is the last no
        const lastTokenNo = await Models.User.findOne({
            where:{
                [Op.and]:[
                {counterId:req.params.counterId},
                    {attended:false}
                ]
            },
            order:[['createdAt', 'DESC']]
        });
        // console.log(lastTokenNo)
        if(lastTokenNo.tokenNo<counter.currentTokenNo+1) return res.status(404).json({success:false, message:"The queue is empty"});
        
        // Updating the currentTokenNo
        await Models.Counter.update({currentTokenNo:counter.currentTokenNo+1}, {where:{id:req.params.counterId}});
        return res.status(200).json({success:true, nextTokenNo:lastTokenNo.tokenNo, message:`next token no is: ${counter.currentTokenNo +1}`})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false,message:`Something went wrong, Please try again later`})
        
    }
}