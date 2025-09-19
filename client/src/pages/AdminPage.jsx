import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
import ConfirmationModal from '../components/ConfirmationModal';

const AdminPage = () => {
  const navigate = useNavigate();
  const { backendUrl, userData, setIsLoggedIn, setUserData } = useContext(AppContent);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', action: null });

  // Logout function
  const logout = async () => {
    try {
      await axios.post(backendUrl + '/api/auth/logout');
      setIsLoggedIn(false);
      setUserData(false);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Check if user is admin
  if (!userData || userData.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 to-pink-400 px-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-center max-w-sm sm:max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">You need admin privileges to access this page.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 sm:py-2 px-4 sm:px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleDeleteAllUsers = async () => {
    setConfirmModal({
      open: true,
      type: 'deleteUsers',
      action: performDeleteAllUsers
    });
  };

  const performDeleteAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(backendUrl + '/api/auth/delete-all-users');
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllBlogs = async () => {
    setConfirmModal({
      open: true,
      type: 'deleteBlogs',
      action: performDeleteAllBlogs
    });
  };

  const performDeleteAllBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(backendUrl + '/api/blogs/deleteAll');
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.put(backendUrl + '/api/auth/admin/make-admin', { email });
      if (data.success) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to make user admin');
    } finally {
      setLoading(false);
    }
  };

  const getModalContent = () => {
    switch (confirmModal.type) {
      case 'deleteUsers':
        return {
          title: 'Delete All Users',
          message: 'Are you sure you want to delete ALL USERS? This will remove all users with "user" role. Admin accounts will be preserved. This action cannot be undone!',
          confirmText: 'Delete Users',
          type: 'danger'
        };
      case 'deleteBlogs':
        return {
          title: 'Delete All Blogs',
          message: 'Are you sure you want to delete ALL BLOGS? This will permanently remove all blog posts from the database. This action cannot be undone!',
          confirmText: 'Delete Blogs',
          type: 'warning'
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 py-6 sm:py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-0">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="w-24 sm:w-28 md:w-32 cursor-pointer order-1 sm:order-none"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-center order-2 sm:order-none">
          Admin Panel
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-300 to-pink-500 text-white font-semibold rounded-full py-2 px-4 sm:px-6 shadow-md hover:scale-105 hover:from-red-400 hover:to-pink-700 transition-all duration-200 text-sm sm:text-base order-3 sm:order-none"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
          </svg>
          Logout
        </button>
      </div>

      {/* Admin Actions */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Delete All Users Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200">
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Delete All Users</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Remove all users with 'user' role (admins preserved)</p>
            <button
              onClick={handleDeleteAllUsers}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Deleting...' : 'Delete All Users'}
            </button>
          </div>
        </div>

        {/* Delete All Blogs Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200">
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">Delete All Blogs</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Remove all blog posts from the database</p>
            <button
              onClick={handleDeleteAllBlogs}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-md hover:from-orange-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Deleting...' : 'Delete All Blogs'}
            </button>
          </div>
        </div>

        {/* Make User Admin Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200 lg:col-span-2">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Make User Admin</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Grant admin privileges to a user by their email</p>
            <form onSubmit={handleMakeAdmin} className="max-w-sm sm:max-w-md mx-auto">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter user email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-base sm:text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? 'Processing...' : 'Make Admin'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, type: '', action: null })}
        onConfirm={confirmModal.action}
        {...getModalContent()}
      />
    </div>
  );
};

export default AdminPage;