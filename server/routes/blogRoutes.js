const express = require('express');
const blogRouter = express.Router();
const {getAllBlogs,addBlogs,deleteAllBlogs,getMyBlogs,deleteMyBlog,updateMyBlog} = require('../controllers/blogController');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add',userAuth, addBlogs);
blogRouter.delete('/deleteAll', adminAuth, deleteAllBlogs);
blogRouter.get('/myBlogs',userAuth,getMyBlogs)
blogRouter.delete('/myBlogs/:blogId',deleteMyBlog);
blogRouter.put('/myBlogs/:blogId',userAuth,updateMyBlog);

module.exports = blogRouter;
