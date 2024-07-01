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
router.post('/add-user', addUser)
router.put('/modify-user/:id', modifyUser)
router.put('/modify-user-password/:id', modifyUserPassword)
router.delete('/remove-user/:id', removeUser)
router.get('/get-users/:country?', getUsers)

module.exports = router
