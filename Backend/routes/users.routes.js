const express = require('express')
const router = express.Router()
const {
    addUser,
    modifyUser,
    modifyUserPassword,
    removeUser,
    getUsers,
} = require('../controllers/users.controllers')


// FIXME: these routes are wrong.
// suggested readings: https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/
// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
router.post('/users', addUser)
router.put('/users/:id', modifyUser)
router.put('/users/:id/password', modifyUserPassword)
router.delete('/users/:id', removeUser)
router.get('/users', getUsers)

module.exports = router
