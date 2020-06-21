require('../../../utils/constants')
const {Op} = require('sequelize')

const request = require('supertest')
const app = require('../../../app')

const appReq = request(app)

const { User, Task } = require('../../../models')

const TaskRequests = require('./TaskRequests')(appReq)
const UserRequests = require('../../user/__test__/UserRequests')(appReq)

let token = null

beforeEach(async()=>{
    await User.destroy({where:{},truncate:true})
    await Task.destroy({where:{},truncate:true})
    const res = await UserRequests.create()
    token = res.body.token
})

test('Should register a task', async() => {
    const res = await TaskRequests.create(token)
    expect(res.status).toBe(201)
})

test('Should get two tasks', async() => {
    await TaskRequests.create(token)
    await TaskRequests.create(token)
    const res = await TaskRequests.getAll(token)
    expect(res.body.length).toBe(2)
})

test('Should delete a task', async() => {
    await TaskRequests.create(token)
    const res = await TaskRequests.delete(token)
    expect(res.body.length).toBe(0)
})