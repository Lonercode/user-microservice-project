require('dotenv').config()
require('./db')
const app = require('./app')


const port = process.env.PORT

app.listen(port, ()=>console.log(`Server connected on port ${port}`))