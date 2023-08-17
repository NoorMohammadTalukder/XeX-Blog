const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        blog_id: { type: String, required: true },
        comment: { type: String, required: true },
        commenter: { type: String, required: true },
    },
    { timestamps: true }
);

const CommentsModel = mongoose.model('comments', CommentSchema);
module.exports = CommentsModel;