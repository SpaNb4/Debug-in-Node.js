const { DB, DB_USER, DB_PASSWORD, DB_HOST } = require('../common/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate().then(
    () => {
        console.log('Connected to DB');
    },

    (err) => {
        console.log(`Error: ${err}`);
    }
);

module.exports = sequelize;
