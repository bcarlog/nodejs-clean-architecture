const userData = {
    username: "carlos",
    password: "carlos123",
}

class UserRequests {

    constructor(appReq) {
        this.appReq = appReq
    }

    async create() {
        const apiRes = await this.appReq.post('/api/user/').send({
            ...userData
        })
        return apiRes
    }

    async login() {
        const apiRes = await this.appReq.post('/api/user/login/').send({
            ...userData
        })
        return apiRes
    }

}

module.exports = (arg1) => { return new UserRequests(arg1) }