const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const { User} = require('../models')

preProcessToken = asyncHandler(async (req,res,next) => {
    try{
        let token = req.header('Authorization')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        res.status(401).json('Authentication failed!')
    }
})

exports.authenticateUser = [preProcessToken,
    asyncHandler(async (req,res,next) => {
        try{
            const user = await User.findOne({where:{
                Id: req.user.userId,
            }})
            if(!user){
                throw new Error('Token invalid!')
            }

            req.user = user
            next()
        }catch(err){
            console.log(err)
            res.status(401).json('Authentication of User failed!')
        }
    })
]