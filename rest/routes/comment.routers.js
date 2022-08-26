const express = require('express');
const { createComment, updateComment, deleteComment } = require('../controllers/commentsController');

const routerComment = express.Router();
const authorize = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { comment } = require('../ajv/ajvCommentSchema');

// Create Comment
routerComment.post('/posts/:id/comments', authorize, validate(comment), createComment);
// Create Comment to specified post
routerComment.put('/posts/:id/comments/:id', authorize, validate(comment), updateComment);
// Delete Comment
routerComment.delete('/posts/:id/comments/:id', authorize, deleteComment);

module.exports = routerComment;
