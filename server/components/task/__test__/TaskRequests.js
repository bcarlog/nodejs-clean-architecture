const dataTask = {
    title: "Title of task",
    description: "Description of task",
}

class TaskRequests {

    constructor(appReq) {
        this.appReq = appReq
    }

    async create(token) {
        const apiRes = await this.appReq.post('/api/task').send({
            ...dataTask
        })
        .set('Authorization', token)
        return apiRes
    }

    async getAll(token) {
        const apiRes = await this.appReq.get('/api/task/').send()
        .set('Authorization', token)
        return apiRes
    }

    async delete(token) {
        const apiRes = await this.appReq.delete('/api/task/1').send()
        .set('Authorization', token)
        return apiRes
    }

}

module.exports = (arg1) => { return new TaskRequests(arg1) }