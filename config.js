const mysql = require('mysql');
const config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "Hungtreo123@",
    "database": "authorization",
}

const pool = mysql.createPool(config);

module.exports = {
    query: (sql) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, (error, results, fields) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    },
}
