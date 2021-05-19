const { DB, DB_USER, DB_PASSWORD, DB_HOST } = require('../common/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
});

sequelize.authenticate().then(
    function success() {
        console.log('Connected to DB');
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
);

module.exports = sequelize;
