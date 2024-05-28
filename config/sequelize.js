const { Sequelize } = require('sequelize')
const config = require('./config.json')["development"];

// const sequelize = new Sequelize(config);

const sequelize = new Sequelize("postgresql://paytm_owner:O3tmidFZJb9T@ep-shiny-mud-a1pycjyp.ap-southeast-1.aws.neon.tech/eazyerp?sslmode=require");

module.exports = sequelize;