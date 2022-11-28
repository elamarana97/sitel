const express = require("express");
const users = require("./users");
const router = express.Router();
router.get('/users/:id',users.getUsers)
router.delete('/users/:id',users.deleteUsers)
router.post('/users',users.addUsers);
module.exports = router;
