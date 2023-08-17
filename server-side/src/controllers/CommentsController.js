const CommentsModel = require("../models/CommentsModel");
const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");


exports.createComment = async (req, res) => {
    const { commenter_id, comment, blog_id } = req.body;
    try {
        let query = { _id: commenter_id};
        const user = await UsersModel.findOne(query);
        if (!user) {
            return res.status(200).json({ status: 'User not found' });
        }

        const commenterName = user.name;

        // Create a new comment using the CommentModel
        const newComment = new CommentsModel({
            commenter: commenterName,
            comment: comment,
            blog_id: blog_id
        });

        const result = await CommentsModel.create(newComment);

        res.status(200).json({ status: 'success',data:result });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ status: 'Failed',data:error });
    }
}

exports.getCommentsByBlogId = async (req, res) => {
    let id = req.params.id;
    let query = { blog_id: id };
    try {
        const result = await CommentsModel.find(query);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", data: error });
    }
}