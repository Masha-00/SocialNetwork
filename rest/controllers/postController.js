const Post = require('../models/Post');
const Comment = require('../models/Comment');
const CustomError = require('../errors');

/**
 * @module createPost
 * create post with id user
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      user: req.user.id,
    });
    if (!post) {
      throw new CustomError().badRequest('Error in saving');
    }
    return res.status(201).json(await post.save());
  } catch (err) {
    return next(err);
  }
};

/**
 * @module getPosts
 * get list of posts
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.getPosts = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const posts = await Post.find().populate('user').populate({
      path: 'comments', populate: { path: 'user' },
    }).skip((page - 1) * limit)
      .limit(limit);
    const total = await Post.count();
    return res.json({
      docs: posts, // массив постов
      pages: Math.ceil(total / limit), // количество доступных страниц
      page, // текущая страница
      total, // общее количество постов
      limit, // количество постов на страницу
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * @module getPostById
 * get post by id
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user').populate({
      path: 'comments', populate: { path: 'user' },
    });
    if (!post) {
      throw new CustomError().notFound('Post not found');
    }
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

/**
 * @module updatePost
 * get post by id and update it
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new CustomError().notFound('Post not found');
    }
    // const updatedPost = await
    // Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    // console.log(updatedPost);
    return res.status(200).json(await
    Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }));
  } catch (err) {
    return next(err);
  }
};

/**
 * @module deletePost
 * get post by id and delete it with all comments
 * function
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Next} next - Express next object
 * @returns
 */
exports.deletePost = async (req, res, next) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id).populate('comments');
    if (!deletePost) {
      throw new CustomError().notFound('Post not found');
    }
    await Comment.deleteMany({
      _id: { $in: deletePost.comments.map((comment) => comment._id.toString()) },
    });
    return res.status(200).json(deletePost);
  } catch (err) {
    return next(err);
  }
};
