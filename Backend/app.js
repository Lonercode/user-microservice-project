const express = require('express')
const app = express()
const routes = require('./routes/users.routes')
const cors = require('cors')
const corsOrigin ={
    origin:'http://localhost:5173', 
    credentials:true,            
    optionSuccessStatus:200,
    methods: ["POST", 'PUT', 'GET', 'DELETE'],
}

app.use(express.json())
app.use(cors(corsOrigin))
app.use('/users', routes)

module.exports = app