const express = require('express')
const router = express.Router()
const {
    addUser,
    modifyUser,
    removeUser,
    getUsers,
} = require('../controllers/users.controllers')


router.post('/add-user', addUser)
router.put('/modify-user/:id', modifyUser)
router.delete('/remove-user/:id', removeUser)
router.get('/get-users/:country?', getUsers)

module.exports = router
