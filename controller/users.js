const express = require('express');
const router = express.Router();

const {IsAdmin}=require('../tools/general-tools');
const {
    getAllUsers
} = require('../services/users');



router.get('/', IsAdmin, getAllUsers);



module.exports = router;