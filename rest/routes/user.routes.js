const express = require('express');
const {
  createUser, loginUser, getUsers, getUserById, updateUser, deleteUser, updatePassword,
} = require('../controllers/userController');

const routerUser = express.Router();
const authorize = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { newUser, updateUserSchema } = require('../ajv/ajvUserSchema');

// creare new user
routerUser.post('/', validate(newUser), createUser);
// Login
routerUser.post('/login', loginUser);
// Get Users
routerUser.get('/', authorize, getUsers);
// Get Single User
routerUser.get('/:id', authorize, getUserById);
// Update User
routerUser.put('/:id', authorize, validate(updateUserSchema), updateUser);
// Delete User
routerUser.delete('/:id', authorize, deleteUser);
// update password
routerUser.put('/:id/change-password', authorize, updatePassword);

module.exports = routerUser;
