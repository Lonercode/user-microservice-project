const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI)
const db = mongoose.connection


db.on('error', (err) => console.log(`Database related error: ${err}`))
db.once('open', () => console.log("Database connected successfully."))

module.exports = db