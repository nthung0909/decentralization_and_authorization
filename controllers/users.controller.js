const express = require('express');
const router = express.Router();
const mysql = require("../config");
const authorization = require('../middlewares/author');
const variable = require('../utils/var');
const roles = variable.roles;

router.get('/', authorization(roles.VIEW_USER), async (req, res) => {
    try {
        let data = [];
        const {params} = req;
        const {currentPage = 0, limit = 10} = params;
        let query = `select * from tbl_users u limit ${limit}`;
        let offset = 0;
        if (currentPage) {
            offset = (Number(currentPage) - 1) * offset;
        }
        query += ` offset ${offset}`;
        data = await mysql.query(query);
        return res.json({
            data: data,
            pagination: {
                currentPage,
                limit
            }
        });
    } catch (e) {
        res.status(200).json({
            message: e.message
        });
    }
});

router.post('/', authorization(roles.INSERT_USER), (req, res) => {
    return res.send('update ok');
});

router.put('/', authorization(roles.UPDATE_USER), (req, res) => {
    return res.send('update ok');
});

router.delete('/', authorization(roles.DELETE_USER), (req, res) => {
    return res.send('update ok');
});
module.exports = router;