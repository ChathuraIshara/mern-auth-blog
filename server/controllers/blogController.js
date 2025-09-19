const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const axios = require("axios");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res
      .status(200)
      .json({ success: true, message: "Blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

const addBlogs = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  try {
    const { title, content } = req.body;
    // Call Flask API to predict topic
    const flaskRes = await axios.post(process.env.FLASK_URL, {
      content
    });
     // Extract prediction from Flask response
    const topic = flaskRes.data.prediction;
    const newBlog = new Blog({
      title,
      content,
      author: user.name,
      authorId: userId,
      topic:topic,
      category: topic // Use predicted topic as category
    });
    await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog: newBlog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllBlogs = async (req,res) =>
{
  try{
      await Blog.deleteMany({});
      return res.status(200).json({ success: true, message: "All blogs deleted successfully" });
  }catch(error)
  {
    return res.status(500).json({ success: false, message: error.message });
  } 
}

const getMyBlogs = async (req, res) => {
  const { userId } = req.body;
  try {
    const blogs = await Blog.find({ authorId: userId });
    return res.status(200).json({ success: true, message: "My blogs fetched successfully", blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMyBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({ _id: blogId});
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found or you are not authorized to delete it" });
    }
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateMyBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, content } = req.body;
  
  try {
    // Call Flask API to predict category based on updated content
    const flaskRes = await axios.post(process.env.FLASK_URL, {
      content
    });
    // Extract prediction from Flask response
    const category = flaskRes.data.prediction;
    
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { title, content, category },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found or you are not authorized to update it" });
    }
    return res.status(200).json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  addBlogs,
  deleteAllBlogs,
  updateMyBlog,
  getMyBlogs,
  deleteMyBlog
};
