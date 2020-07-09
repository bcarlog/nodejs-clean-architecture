# CLEAN ARCHITECTURE IN NODEJS (API)

## Prerequisites

* You must have two databases created (nodejs y nodejs_test)
* Config database permisions in .env-cmdrc (file)

### Fast installation

```bash
npm install
npm run reset-database
npm run dev
```

### Execute tests

```bash
npm run test
```

## Index

[1. component-based architecture](#headers)

[2. Validations](#validations)

[3. Middlewares](#middlewares)

[4. Reusable tests](#tests)

[5. Error Handler](#error-handler)

[6. Variables](#variables)



<a name="architecture-base-components"/>

## component-based architecture

Each folder represents a component, in this case tasks and users.

![image-20200620235319439](.README.assets/image-20200620235319439.png)

It doesn't mean that it represents each table in the DB, this depends of the software requirements.

The component-based architecture was chosen, to have a more intuitive order to change a requirement. If I need to change something, I open every folder and files involved with that change, It takes more time.

<a name="validations"/>

## Validations


Thanks to middlewares, we can implemented a cascade based filtration.

![image-20200621000855289](.README.assets/image-20200621000855289.png)

First: I can verify the authentication.

Second: Satinize or validate the input-data of the user.

Third: Do operations in the controller and DB.


<a name="middlewares"/>

## Middleware

This is the file to authenticate.

![image-20200620235041202](.README.assets/image-20200620235041202.png)

## Models

Each models represent each database table.

![image-20200620234916733](.README.assets/image-20200620234916733.png)


<a name="tests"/>

## Reusable tests

When an integration test is carried out, it is verified that the data was stored correctly in the database and that the services work well. If a table depends on another, for example tasks and user, the user must be registered first. Then it is necessary to make the reusable tests.

A good practice is has the test inside in each component, the test is divided in two parts:

* Request: They are the requests to the API

* Test: Management the requests and check their states.

  

Example of Request "UserRequest.js"

```js
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
	...
}

module.exports = (arg1) => { return new UserRequests(arg1) }
```

Example of Test "UserTest.js"

```js
const request = require('supertest')
const app = require('../../../app')

const appReq = request(app)

const { User } = require('../../../models')

const UserRequests = require('./UserRequests')(appReq) // Uso de los request

beforeEach(async()=>{
    await User.destroy({where:{},truncate:true})
})

test('Should register a user', async() => {
    const res = await UserRequests.create() // Esperamos la respuesta
    expect(res.status).toBe(201)
    expect(typeof res.body.token).toBe('string')
})
```

Now I 

User UserRequests is now reused before register a task "TaskTest.js"

```js
require('../../../utils/constants')
const {Op} = require('sequelize')

const request = require('supertest')
const app = require('../../../app')

const appReq = request(app)

const { User, Task } = require('../../../models')

const TaskRequests = require('./TaskRequests')(appReq)
const UserRequests = require('../../user/__test__/UserRequests')(appReq) // Reutilización

let token = null

beforeEach(async()=>{
    await User.destroy({where:{},truncate:true})
    await Task.destroy({where:{},truncate:true})
    const res = await UserRequests.create() // Se crea un usuario antes de cada test
    token = res.body.token
})

test('Should register a task', async() => {
    const res = await TaskRequests.create(token)
    expect(res.status).toBe(201)
})
```



<a name="error-handler"/>

## Error Handler

If a fatal error occurs it is necessary to send a message to the administrator or save it in a log.

Therefore express-async-handler was used to wrap any function and listen for errors.


It was used in the controllers.

```js
const asyncHandler = require('express-async-handler')
exports.create = asyncHandler(async (req, res) => {
    ... 
})
```

Any error within the function asyncHandler will be reported.

For this reason, the app.js file can handle all the errors of the application.

```js
...
app.use(async(err, req, res, next) => {
    const {isOperationalError, httpCode, description} = await handleError(err);
    console.log({isOperationalError, httpCode, description})
    res.status(httpCode).send(description)
})
```

handlerError handles all encapsulated errors.



## Create and populate the database quickly.

You must execute

```bash
npm run reset-database
```

The software will empty => creating tables and populating them with static data.



<a name="variables"/>

## Global variables

Compare two codes to disable a user with an ORM.

Example 1:

```js
await Task.update({
    FKStatus: 2,
}, { where: { Id: id } })
```

Example 2:

```js
await Task.update({
    FKStatus: global.STATUS.INACTIVE,
}, { where: { Id: id } })
```

In the database 1 es ACTIVE and 2 is INACTIVE

Example 1 is not intuitive, if after a week you look at it maybe you don't remember what the hell means 2.
Example 2 is more intuitive, Therefore It's easier to read and understand.

