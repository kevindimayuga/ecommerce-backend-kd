// these will require the code from each seed file to seed the data within those files into the database
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

// requires the connection js file in our directory that will set up and configure Sequelize in order for us to connect to the sql database
const sequelize = require('../config/connection');

// this function in asynchronous
// it will calls for the functions, these will populate each table in our database that we create
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

// this function will begin the process to seed the data
seedAll();