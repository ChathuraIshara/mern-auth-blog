import React from 'react';

const BlogItem = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-blue-700">How to Start Blogging in 2025</h3>
      <p className="text-gray-700 mb-4">
        Blogging is a great way to share your knowledge, experiences, and ideas with the world. In this post, we'll explore the basics of starting a blog, choosing your niche, and building an audience.
      </p>
      <div className="flex items-center gap-3 mb-2">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" className="w-10 h-10 rounded-full" />
        <span className="text-sm text-gray-600">By John Doe • Aug 19, 2025</span>
      </div>
      <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200">Read More</button>
    </div>
  );
};

export default BlogItem;
