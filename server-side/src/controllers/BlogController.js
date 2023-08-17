const BlogsModel = require("../models/BlogsModel");
const jwt = require("jsonwebtoken");


exports.createBlog = async (req, res) => {
    let reqBody = req.body;
    try {
        const result = await BlogsModel.create(reqBody);
        res.status(200).json({ status: "success", data: result });
    } catch (e) {
        res.status(200).json({ status: "fail", data: e });
    }
}

exports.getBlog = async (req, res) => {
    try {
        const blogs = await BlogsModel.find();
        res.status(200).json({ status: "success", data: blogs });
    } catch (error) {
        res.status(500).json({ status: "fail", data: error });
    }
}
exports.getBlogByAuthorId = async (req, res) => {
    let id = req.params.id;
    let query = { author_id: id };
    try {
        const result = await BlogsModel.find(query);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", data: error });
    }
}
exports.getBlogById = async (req, res) => {
    let id = req.params.id;
    let query = { _id: id };
    try {
        const result = await BlogsModel.findOne(query);
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", data: error });
    }
}

exports.deleteBlog = async (req, res) => {
    let id = req.params.id;
    let query = { _id: id };

    try {
        const result = await BlogsModel.deleteOne(query);
        res.status(200).json({ status: "success", data: result });

    } catch (e) {
        res.status(200).json({ status: "fail", data: e });
    }

}

exports.updateBlog = async (req, res) => {
    let id = req.params.id;
    let reqBody = req.body;
    let query = { _id: id };
    try {
        let result = await BlogsModel.updateOne(query, reqBody);
        res.status(200).json({ status: "success", data: result })
    }
    catch (e) {
        res.status(200).json({ status: "fail", data: e })
    }
}
exports.searchBlogByAuthor = async (req, res) => {
    let author = req.body.author;
    let regex = new RegExp(author, 'i'); // Create a case-insensitive regex
    let query = { author: regex };
    
    try {
        let result = await BlogsModel.find(query);
        res.status(200).json({ status: "success", data: result });
    } catch (e) {
        res.status(500).json({ status: "fail", data: e });
    }
}