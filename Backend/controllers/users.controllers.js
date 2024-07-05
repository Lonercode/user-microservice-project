const userData = require('../models/users.models')
const bcrypt = require('bcrypt')
const sendMail = require('../utils/sendMail')
const {body, validationResult} = require('express-validator')
const {validationCriteria, validationCriteriaNoPassword} = require('../middleware/validation')


//Controller routes

const addUser = async (req, res, next) => {

    await Promise.all(validationCriteria.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg)
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
        const userExists = await userData.findOne({email: req.body.email})

        if(userExists){
            res.status(400).json({message: "User already exists"})
        }
        else{
        const newUser = await userData.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            country: req.body.country
        })

        await sendMail(
            newUser.email,
            "User Management App",
            {
                name: newUser.first_name,
            },
            './templates/notifyUser.hbs'
        )


        // FIXME: return a JSON object with the id, something like:
        // {"id: "cbf0df7a-13a4-42bd-a6c4-06951694f83d"}
        res.status(201).json("User has been created successfully")
        return (newUser._id) // I assume this is what you mean, or perhaps return newuser?
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const modifyUser = async (req, res, next) => {
    const user = await userData.findById(req.params.id)

    await Promise.all(validationCriteriaNoPassword.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg)
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    
    try {
        await userData.findByIdAndUpdate(
            user._id,
            {
                $set:
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    country: req.body.country
                }
            },
            { new: true })

        await user.save()


        res.status(200).json({ message: "User edited successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const modifyUserPassword = async (req, res, next) => {
    const user = await userData.findById(req.params.id)

    await body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        await userData.findByIdAndUpdate(
            user._id,
            {
                $set:
                {
                    password: await bcrypt.hash(req.body.password, 10)
                }
            },
            { new: true })

        await user.save()


        res.status(200).json({ message: "User password edited successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const removeUser = async (req, res, next) => {
    const user = await userData.findById(req.params.id)
    try {
        await userData.findByIdAndDelete(user._id)
        res.status(200).json({ message: "User has successfully been removed" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getUsers = async (req, res, next) => {

    try {
        const page = 1
        const limit = 10

        const startIndex = (page - 1) * limit
        const total = await userData.countDocuments()
        const allUsers = await userData.find({}).skip(startIndex).limit(limit)
        const countries = await userData.find({ country: req.query.country })
        const firstNames = await userData.find({ first_name: req.query.first_name })


        if (req.query.country) {
            res.status(200).json({ message: countries, page, limit, total, pages: Math.ceil(total / limit) })
        }
        else if (req.query.first_name) {
            res.status(200).json({ message: firstNames, page, limit, total, pages: Math.ceil(total / limit) })
        }
        else {
            res.status(200).json({ message: allUsers, page, limit, total, pages: Math.ceil(total / limit) })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}


module.exports = {
    addUser,
    modifyUser,
    modifyUserPassword,
    removeUser,
    getUsers,
}