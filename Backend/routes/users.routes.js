const express = require('express')
const router = express.Router()
const {
    addUser,
    modifyUser,
    modifyUserPassword,
    removeUser,
    getUsers,
} = require('../controllers/users.controllers')


router.post('/users', addUser)
router.put('/users/:id', modifyUser)
router.put('/users/:id/password', modifyUserPassword)
router.delete('/users/:id', removeUser)
router.get('/users', getUsers)

module.exports = router
