import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Login to Your Account</h2>
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition-colors duration-200" type="submit">
          Login
        </button>
      </form>
      <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
    </div>
  )
}

export default Login;