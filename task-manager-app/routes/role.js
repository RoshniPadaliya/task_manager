const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolesController'); // Adjust the path as necessary

// Route to create a new role
router.post('/createrole', roleController.createDefaultRoles);

module.exports = router;
