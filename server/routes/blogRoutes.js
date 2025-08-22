const express = require('express');
const blogRouter = express.Router();
const {getAllBlogs,addBlogs,deleteAllBlogs,getMyBlogs,deleteMyBlog,updateMyBlog} = require('../controllers/blogController');
const userAuth = require('../middleware/userAuth');

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add',userAuth, addBlogs);
blogRouter.delete('/deleteAll' ,deleteAllBlogs);
blogRouter.get('/myBlogs',userAuth,getMyBlogs)
blogRouter.delete('/myBlogs/:blogId',deleteMyBlog);
blogRouter.put('/myBlogs/:blogId',userAuth,updateMyBlog);

module.exports = blogRouter;
