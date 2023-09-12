// this will will load the data in a .env file in our repo
// typically sensitive data (such as usernames and passwords) for our database that will be loaded into the node.js app
// make sure to add this file to your .gitignore file so it is not uploaded into the remote repo on github
require('dotenv').config();

// this will require and import the sequelize library which will connect to the databaseS
const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

module.exports = sequelize;