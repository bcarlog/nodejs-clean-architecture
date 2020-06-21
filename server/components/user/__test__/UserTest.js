require('../../../utils/constants')

const request = require('supertest')
const app = require('../../../app')

const appReq = request(app)

const { User } = require('../../../models')

const UserRequests = require('./UserRequests')(appReq)

beforeEach(async()=>{
    await User.destroy({where:{},truncate:true})
})

test('Should register a user', async() => {
    const res = await UserRequests.create()
    expect(res.status).toBe(201)
    expect(typeof res.body.token).toBe('string')
})

test('Should login a user', async() => {
    await UserRequests.create()
    const res = await UserRequests.login()
    expect(res.status).toBe(200)
    expect(typeof res.body.token).toBe('string')
})