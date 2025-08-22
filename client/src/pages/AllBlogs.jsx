import React from 'react';
import Navbar from '../components/navbar';
import BlogsList from '../components/BlogsList';



const AllBlogs = () => {
  return (
  <div className="relative min-h-screen  bg-cover bg-center scrollbar-hide bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </div>
      <div className="pt-36 w-full max-w-full">
        <BlogsList />
      </div>
    </div>
  );
};

export default AllBlogs;