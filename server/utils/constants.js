const statuses = require('../../script/database/data/status')

let Status = {}
statuses.map((status)=>{
    Status = {...Status, [status.Acronym]:status.Id}
})

global.STATUS = Status

console.log("Constants loaded!")