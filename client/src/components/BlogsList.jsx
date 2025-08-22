
import React, { useState } from 'react';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';
import { AppContent } from '../context/AppContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const BlogsList = () => {
  const [blogs,setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const {backendUrl,blogCount} = useContext(AppContent)
  
  const getAllBlogs = async () =>{
    try {
      const {data} = await axios.get(`${backendUrl}/api/blogs`);
      console.log(data)
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(()=>{
    getAllBlogs();
  },[blogCount])

  return (
    <div className="w-full py-8 px-4 overflow-visible min-h-[40vh]">
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] animate-fade-in">
          <div className="bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 rounded-full p-6 mb-6 shadow-lg">
            <svg className="w-20 h-20 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
              <rect x="8" y="12" width="32" height="24" rx="4" fill="#fff" stroke="#a78bfa" strokeWidth="2" />
              <path d="M16 20h16M16 28h8" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
              <circle cx="36" cy="32" r="2.5" fill="#a78bfa" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-2">No Blogs Yet</h3>
          <p className="text-gray-500 text-lg mb-2 text-center max-w-md">It looks a little empty here. Start by adding your first blog and share your thoughts with the world!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto overflow-visible">
          {blogs.map((blog, idx) => (
            <div key={idx} onClick={() => setSelectedBlog(blog)} className="cursor-pointer">
              <BlogCard {...blog} />
            </div>
          ))}
        </div>
      )}
      <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </div>
  );
};

export default BlogsList;