const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('Post', postSchema);
