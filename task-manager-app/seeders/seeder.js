const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/Role.js');

dotenv.config();

const roles = [
  { name: 'Admin' },
  { name: 'User' },
];

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Role.deleteMany();
    await Role.insertMany(roles);
    console.log('Roles seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedRoles();
