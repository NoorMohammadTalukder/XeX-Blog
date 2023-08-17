const express=require('express');
const UsersController=require("../controllers/UsersController");
const BlogController=require("../controllers/BlogController");
const CommentsController=require("../controllers/CommentsController");
const AuthVerification= require ('../middleware/AuthVerification');
const router=express.Router();

// users
router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);

// comments
router.post("/create-comment",AuthVerification, CommentsController.createComment);
router.get("/get-comment-blog/:id",CommentsController.getCommentsByBlogId);

// blogs
router.post("/create-blog",AuthVerification, BlogController.createBlog);
router.get("/delete-blog/:id",AuthVerification,BlogController.deleteBlog);
router.post("/update-blog/:id",AuthVerification,BlogController.updateBlog);
router.post("/search-blog",BlogController.searchBlogByAuthor);
router.get("/get-blog",BlogController.getBlog);
router.get("/get-blog-author/:id",AuthVerification,BlogController.getBlogByAuthorId);
router.get("/get-blog/:id",BlogController.getBlogById);


module.exports=router;