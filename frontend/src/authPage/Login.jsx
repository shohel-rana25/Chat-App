import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'  // যদি React Router ব্যবহার করো

function Login() {
  // useState সঠিক ভাবে ডিক্লেয়ার করো (object destructuring ভুল ছিল)
  const [userData, setUserData] = useState({ email: '', password: '' })

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  // সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:2512/user/login', userData)
      console.log('Login response:', response.data)
      // এখানে তোমার লগিন সফল হলে কি হবে তা লিখতে পারো, যেমন রিডাইরেক্ট ইত্যাদি
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        {/* ফর্মে onSubmit যুক্ত করো */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"           // name দিতে হবে যাতে handleChange কাজ করে
              type="email"
              placeholder="Enter your email"
              value={userData.email} // value দিতে হবে state থেকে
              onChange={handleChange} // onchange যোগ করতে হবে
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              name="password"          // name দিতে হবে
              type="password"
              placeholder="Enter your password"
              value={userData.password} // value দিতে হবে
              onChange={handleChange}    // onchange দিতে হবে
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"   // সাবমিট বাটন ঠিক আছে
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
