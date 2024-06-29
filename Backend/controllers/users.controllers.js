const userData = require('../models/users.models')
const bcrypt = require('bcrypt')

//Controller routes

const addUser = async(req, res, next) => {
    try{
    const newUser = await userData.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        password: req.body.password,
        email: req.body.email,
        country: req.body.country      
    })

    res.status(201).json(`User has been created successfully: ${newUser}`)
} catch(err){
    res.status(500).json({message: err.message})
}
}


const modifyUser = async(req, res, next) => {
    const user = await userData.findById(req.params.id)
    try{
        await userData.findByIdAndUpdate(
            user._id,
                {$set:
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    country: req.body.country
                }
            },
            {new: true})

            await user.save()
        
    
        res.status(200).json({message: "User edited successfully"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
}


const modifyUserPassword = async(req, res, next) => {
    const user = await userData.findById(req.params.id)
    try{
        await userData.findByIdAndUpdate(
            user._id,
                {$set:
                {  
                    password: await bcrypt.hash(req.body.password, 10)
                }
            },
            {new: true})

            await user.save()
        
    
        res.status(200).json({message: "User password edited successfully"})
    } catch(err){
        res.status(500).json({message: err.message})
    }
}


const removeUser = async(req, res, next) => {
    const user = await userData.findById(req.params.id)
    try{
        await userData.findByIdAndDelete(user._id)
        res.status(200).json({message: "User has successfully been removed"})

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const getUsers = async(req, res, next) => {
    
    try{
    const page = 1
    const limit = 10

    const startIndex = (page - 1) * limit
    const total = await userData.countDocuments()
    const allUsers = await userData.find({}).skip(startIndex).limit(limit)
    const countries = await userData.find({country: req.params.country})
    
    if (req.params.country){
    res.status(200).json({message: countries, page, limit, total, pages: Math.ceil(total/limit)})
    }
    else{
    res.status(200).json({message: allUsers, page, limit, total, pages: Math.ceil(total/limit)})
    }

    }catch(err){
        res.status(500).json({message: err.message})
    }

}


module.exports = {
    addUser,
    modifyUser,
    modifyUserPassword,
    removeUser,
    getUsers,
}