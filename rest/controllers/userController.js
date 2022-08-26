const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const { JWT_TOKEN, EXPIRESIN } = require('../config/config');
const CustomError = require('../errors');

// creare new user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new CustomError().badRequest('User already exists');
    }
    user = new User({ name, email, password });
    user.password = md5(password);
    return res.status(201).json(await user.save());
  } catch (err) {
    return next(err);
  }
};
// login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError().notFound('User not found');
    }
    if (user.password === md5(password)) {
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, JWT_TOKEN, EXPIRESIN);
      return res.status(200).json({ token });
    }
  } catch (err) {
    return next(err);
  }
  return true;
};
// Get Users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};
// Get Single User
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new CustomError().notFound('User not found');
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};
// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new CustomError().notFound('Post not found');
    }
    const updatedUser = await
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select('-password');
    return res.status(200).json(updatedUser);
  } catch (e) {
    return next(e);
  }
};
// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!deleteUser) {
      throw new CustomError().notFound('User not found');
    }
    return res.status(200).json(deleteUser);
  } catch (err) {
    return next(err);
  }
};
// update password
exports.updatePassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError().notFound('User not found');
    }
    const hashPassword = md5(password); // hash password which user get us
    if (!hashPassword) {
      throw new CustomError().badRequest('Incorrect Password');
    }
    if (user.password === hashPassword) {
      user.password = md5(newPassword);
      await user.save();
      return res.status(200).json({ msg: 'Password changed successfully' });
    }
    throw new CustomError().badRequest('Incorrect Password');
  } catch (err) {
    return next(err);
  }
};
