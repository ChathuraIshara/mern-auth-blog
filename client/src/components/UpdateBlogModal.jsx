import React, { useState } from 'react';

const UpdateBlogModal = ({ isOpen, onClose, onSubmit, initialTitle, initialContent }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');

  React.useEffect(() => {
    setTitle(initialTitle || '');
    setContent(initialContent || '');
  }, [initialTitle, initialContent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-200/60 via-purple-200/60 to-pink-200/60 backdrop-blur-[4px]">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-lg w-full p-0 animate-fade-in"
      >
        <div className="bg-white/80 rounded-3xl shadow-2xl border-4 border-transparent bg-clip-padding p-10 sm:p-12 relative overflow-hidden" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.25)'}}>
          <div className="absolute -inset-1 rounded-3xl z-[-1] bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-60 animate-pulse" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-extrabold transition-transform hover:scale-125"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-tr from-blue-400 to-purple-500 p-3 rounded-full shadow-lg mb-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-1 tracking-tight">Update Blog</h2>
            <p className="text-gray-500 text-sm">Edit your blog and save changes!</p>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              className="w-full border-0 rounded-xl px-4 py-3 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg placeholder-gray-400"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              className="w-full border-0 rounded-xl px-4 py-3 h-32 resize-none bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 text-base placeholder-gray-400"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 text-lg tracking-wide flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlogModal;
