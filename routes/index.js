const routeController = require('../controllers/users.controller');
const accessController = require('../controllers/access.controller');

module.exports = (app) => {
    app.use('/users', routeController);
    app.use('/access', accessController);
};