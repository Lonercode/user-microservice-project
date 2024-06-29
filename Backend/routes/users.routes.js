const express = require('express')
const router = express.Router()
const {
    addUser,
    modifyUser,
    modifyUserPassword,
    removeUser,
    getUsers,
} = require('../controllers/users.controllers')


router.post('/add-user', addUser)
router.put('/modify-user/:id', modifyUser)
router.put('/modify-user-password/:id', modifyUserPassword)
router.delete('/remove-user/:id', removeUser)
router.get('/get-users/:country?', getUsers)

module.exports = router
