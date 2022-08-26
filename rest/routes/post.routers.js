const express = require('express');
const {
  createPost, getPosts, getPostById, updatePost, deletePost,
} = require('../controllers/postController');

const routerPost = express.Router();
const authorize = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { post } = require('../ajv/ajvPostSchema');

// Create Post
routerPost.post('/', authorize, validate(post), createPost);
// Get Posts
routerPost.get('/', getPosts);
// Get Single Post
routerPost.get('/:id', authorize, getPostById);
// Update Post
routerPost.put('/:id', authorize, validate(post), updatePost);
// Delete Post
routerPost.delete('/:id', authorize, deletePost);

module.exports = routerPost;
