const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        commenter: { type: String, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);
const BlogsSchema = mongoose.Schema(
    {
        title: { type: String },
        description: { type: String, required: true },
        author: { type: String, required: true },
        author_id: { type: String, required: true},
        comments: [CommentSchema],
    },
    { timestamps: true, versionKey: false }
)
const BlogssModel = mongoose.model('blogs', BlogsSchema);
module.exports = BlogssModel;