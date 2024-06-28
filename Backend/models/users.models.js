const mongoose = require('mongoose')
const userSchema = mongoose.Schema
const bcrypt = require('bcrypt')

const userModel = new userSchema({
    first_name:{
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,

    },

    country: {
        type: String,
        required: true
    }


}, {timestamps: true}
)

userModel.pre('save', async function(next){
    if (!this.isModified('password')) {
        return next();
    }
    try{
        const hashedpassword = await bcrypt.hash(this.password, 10)
        this.password = hashedpassword
        next()

    }catch(err){
        next(err)
    }
})

module.exports = mongoose.model('user', userModel)