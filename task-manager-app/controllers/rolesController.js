const Role = require('../models/Role');

// Create default roles
exports.createDefaultRoles = async (req, res) => {
  const roles = ['Admin', 'User'];

  try {
    for (const roleName of roles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        const role = new Role({ name: roleName });
        await role.save();
      }
    }
    res.status(201).json({ message: 'Default roles created successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
