const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize ({
    host: process.env.PGHOST || 'localhost' ,
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'it_assets_dev',
    username: process.env.PGUSER || 'postgres',
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log :
    false,
}) ;

module.exports = { sequelize } ;