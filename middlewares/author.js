const mysql = require("../config");

module.exports = function (role) {
    return async function authorization(req, res, next) {
        try {
            if(!role) {
                return next();
            }
            const {user = {}} = req;
            const userId = user.id || 3;
            const userRoles = await mysql.query(`select u.userId, grr.groupId, r.roleId, r.roleName
                                            from tbl_users u join tbl_user_groups ug on 
                                                u.userId = ug.userId 
                                                join tbl_group_roles grr on grr.groupId = ug.groupId 
                                                join tbl_roles r on r.roleId = grr.roleId
                                            where u.userId = ${userId};`);
            if(userRoles.length === 0) {
                return res.json({
                    status: 401,
                    message: 'You don\'t have permission'
                });
            } else {
                const findRole = userRoles.find((item) => item.roleName === role);
                if(!findRole) {
                    return res.json({
                        status: 401,
                        message: 'You don\'t have permission'
                    });
                }
            }
            next();
        } catch (e) {
            return res.json({
                status: 500,
                message: e.message
            })
        }
    }
}