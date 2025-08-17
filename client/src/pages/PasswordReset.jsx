import React from 'react'

const PasswordReset = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email address" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition-colors duration-200" type="submit">
          Send Password Reset Link
        </button>
      </form>
      <p className="text-sm text-gray-600">Remembered your password? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
    </div>
  )
}

export default PasswordReset;