const Comment = require('../models/Comment');
const CustomError = require('../errors');
const Post = require('../models/Post');

/**
 * @module createComment
 * get post by id and add comment in array comments to this post
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      body: req.body.body,
      post: req.params.id,
      user: req.user.id,
    });
    // if (!comment) {
    //   throw new CustomError().badRequest('Error in saving');
    // }
    const post = await Post.findById(req.params.id);
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json(await comment.save());
  } catch (err) {
    return next(err);
  }
};

/**
 * @module updateComment
 * git comment by id and update it
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      throw new CustomError().notFound('Comment not found');
    }
    const updatedComment = await
    Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    return res.status(200).json(updatedComment);
  } catch (err) {
    return next(err);
  }
};

/**
 * @module deleteComment
 * get comment by id and delete it
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.deleteComment = async (req, res, next) => {
  try {
    const deleteComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deleteComment) {
      throw new CustomError().notFound('Comment not found');
    }
    return res.status(200).json(deleteComment);
  } catch (err) {
    return next(err);
  }
};
