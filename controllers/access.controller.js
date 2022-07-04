const express= require('express');
const router = express.Router();
const mysql = require('../config');

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req;
        const user = await mysql.query(`select * from tbl_uers where username = ${username} and password = ${password}`);
        if(!user) {
            return res.status(500).json({
                message: 'username or password are wrong'
            })
        }
        req.user = user;
        res.json({
            status: 200, message: 'login success'
        })
    } catch (e) {
        return res.json({
            status: 500,
            message: e.message
        })
    }
});

module.exports = router;