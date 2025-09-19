import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import UpdateBlogModal from '../components/UpdateBlogModal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';

const Myblogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updateModal, setUpdateModal] = useState({ open: false, blog: null });
  const {backendUrl} = useContext(AppContent);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl+'/api/blogs/myBlogs');
      setMyBlogs(data.blogs || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(backendUrl+`/api/blogs/myBlogs/${id}`);
      toast.success('Blog deleted successfully!');
      setMyBlogs(myBlogs.filter((b) => b._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleUpdate = (blog) => {
    setUpdateModal({ open: true, blog });
  };

  const handleUpdateSubmit = async (updated) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/api/blogs/myBlogs/${updateModal.blog._id}`,
        updated
      );
      if (data.success) {
        toast.success('Blog updated successfully!');
        setMyBlogs((prev) =>
          prev.map((b) =>
            b._id === updateModal.blog._id ? { ...b, ...data.blog } : b
          )
        );
        setUpdateModal({ open: false, blog: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 pb-12">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mt-32 mb-10 text-center">My Blogs</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-400 mb-4"></div>
          <p className="text-lg text-gray-500">Loading your blogs...</p>
        </div>
      ) : myBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] animate-fade-in">
          <div className="bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 rounded-full p-6 mb-6 shadow-lg">
            <svg className="w-20 h-20 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
              <rect x="8" y="12" width="32" height="24" rx="4" fill="#fff" stroke="#a78bfa" strokeWidth="2" />
              <path d="M16 20h16M16 28h8" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
              <circle cx="36" cy="32" r="2.5" fill="#a78bfa" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-2">No Blogs Yet</h3>
          <p className="text-gray-500 text-lg mb-2 text-center max-w-md">You haven't written any blogs yet. Start by adding your first blog!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto">
          {myBlogs.map((blog) => (
            <div key={blog._id} className="relative group">
              <BlogCard {...blog} />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleUpdate(blog)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-1 text-xs font-semibold shadow hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-4 py-1 text-xs font-semibold shadow hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <UpdateBlogModal
            isOpen={updateModal.open}
            onClose={() => setUpdateModal({ open: false, blog: null })}
            onSubmit={handleUpdateSubmit}
            initialTitle={updateModal.blog?.title}
            initialContent={updateModal.blog?.content}
          />
        </div>
      )}
    </div>
  );
};

export default Myblogs;