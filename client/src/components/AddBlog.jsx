import React from 'react';

const AddBlog = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Add a New Blog Post</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter blog title" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" rows="5" placeholder="Write your blog content here..."></textarea>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
