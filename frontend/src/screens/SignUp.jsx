import React, { useState } from 'react';
import { FaSquareParking } from 'react-icons/fa6';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const[firstName,setFirsName]=useState('')
  const[lastName,setLastName]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      toast.success(response.data.message || 'Signup successful');
      navigate('/');
    } catch (error) {
      console.log('Error in creating user', error);
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-700 p-4 rounded-full">
            <FaSquareParking className="text-4xl text-white" />
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-center text-xl font-semibold text-gray-800 mb-2">
          Welcome to <span className="text-cyan-700 font-bold">SmartPark</span>
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Your intelligent parking solution.
        </p>

        {/* Sign Up Heading */}
        <h2 className="text-center text-2xl font-bold text-cyan-800 mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <input
              name="firstName"
              required
              type="text"
              placeholder="FirstName"
              value={firstName}
              onChange={(e) => setFirsName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>

          <div className="mb-4">
            <input
              name="lastName"
              required
              type="text"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>
            
          <div className="mb-4">
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>
          <div className="mb-4 relative">
            <input
              name="password"
              required
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
            {passwordVisible ? (
              <IoEyeOff
                className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            ) : (
              <IoEye
                className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            )}
          </div>
          <button type="submit" className="w-full bg-cyan-700 text-white py-3 rounded-lg hover:bg-cyan-800 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link className="text-cyan-700 font-medium hover:underline" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
