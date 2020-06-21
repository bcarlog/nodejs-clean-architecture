const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const { Task } = require('../../models')

exports.create = asyncHandler(async (req, res) => {
    const {
        title,
        description,
    } = req.body

    const task = await Task.create({
        Title: title,
        Description: description,
        FKUser: req.user.Id,
        FKStatus: global.STATUS.ACTIVE,
    })

    res.status(201).json(task)    
})

exports.getTasks = asyncHandler(async (req, res) => {
    const {
        title
    } = req.query

    const tasks = await Task.findAll({where:{
        FKUser: req.user.Id,
        title: {
            [Op.like]: `%${title ? title:'%'}%`
        },
        FKStatus: global.STATUS.ACTIVE
    }})

    res.status(200).send(tasks)    
})

exports.delete = asyncHandler(async (req, res) => {
    const {
        id,
    } = req.params

    console.log(req.params)

    await Task.update({
        FKStatus: global.STATUS.INACTIVE,
    }, { where: { Id: id } })

    res.status(200).json()    
})