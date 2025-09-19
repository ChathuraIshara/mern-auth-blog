import React from 'react';

const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
        <div className="flex items-center justify-between mb-4 pr-12">
          <h2 className="text-3xl font-extrabold text-indigo-700 flex-1">{blog.title}</h2>
          {blog.category && (
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md ml-4">
              {blog.category}
            </span>
          )}
        </div>
        <div className="mb-4 text-gray-600 text-base whitespace-pre-line">{blog.content}</div>
        <div className="flex items-center justify-between text-sm mt-6">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0 1 12 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            <span className="font-medium text-gray-700">{blog.author}</span>
          </span>
          <span className="text-xs text-gray-400 font-semibold">{blog.date && blog.date.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
