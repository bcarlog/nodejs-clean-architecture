const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const generateToken = (userId) => {
    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.TOKEN_EXPIRES) })
    return token
}

exports.create = asyncHandler(async (req, res) => {
    const {
        username,
        password,
    } = req.body

    const alreadyUsernameExits = await User.findOne({where:{
        Username: username
    }})
    if(alreadyUsernameExits){
        res.status(400).send('Username already register')
        return
    }

    const user = await User.create({
        Username: username,
        Password: bcrypt.hashSync(password, 8),
        FKStatus: global.STATUS.ACTIVE,
    })

    const token = generateToken(user.Id)

    res.status(201).send({ token })    
})

exports.login = asyncHandler(async (req, res) => {
    const {
        username,
        password
    } = req.body

    let user = await User.findOne({where:{
        Username: username
    }})
    if(!user){
        res.status(400).send('Username or password invalid')
        return
    }

    const isMatch = await bcrypt.compare(password, user.Password)
    if(!isMatch){
        res.status(400).send('Username or password invalid')
        return
    }
    
    const token = generateToken(user.Id)

    res.status(200).send({ token })    
})