import React from 'react';

const BlogCard = ({ title, content, author, date }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-0 mb-8 max-w-xl w-full mx-auto border border-gray-200 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
      {/* Image placeholder */}
      <div className="h-40 w-full bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 flex items-center justify-center">
        <svg className="w-16 h-16 text-indigo-400 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 19V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12M3 19l4-4a2 2 0 0 1 2.83 0l2.34 2.34a2 2 0 0 0 2.83 0l3.34-3.34a2 2 0 0 1 2.83 0l2.83 2.83M3 19h18" /></svg>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold text-indigo-700 mb-2  transition-colors duration-200 truncate">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-base">{content}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0 1 12 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            <span className="font-medium text-gray-700">{author}</span>
          </span>
          {/* Show only the date part (YYYY-MM-DD) if ISO string */}
          {date && (
            <span className="text-xs text-gray-400 font-semibold">
              {date.slice(0, 10)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
