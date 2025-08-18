import React from 'react'

const EmailVerify = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4 max-w-md text-center">
        We have sent a verification link to your email address. Please check your inbox and click the link to verify your account. If you don't see the email, check your spam or junk folder.
      </p>
      <p className="mb-4 max-w-md text-center">
        Verifying your email helps us keep your account secure and ensures you have full access to all features. This step also helps us prevent spam and maintain a safe community for everyone.
      </p>
      <p className="mb-6 max-w-md text-center">
        If you have not received the email after a few minutes, you can request another verification link below. Make sure you entered the correct email address during registration.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 mb-2">Resend Verification Email</button>
      <p className="text-sm text-gray-600 mb-2">Already verified? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
      <p className="text-xs text-gray-400">Need help? Contact our support team for assistance with email verification.</p>
    </div>
  )
}

export default EmailVerify;