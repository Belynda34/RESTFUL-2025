import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSquareParking } from 'react-icons/fa6';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
// import {jwtDecode} from "jwt-decode"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/api/auth/login",
  //       { email, password }
  //     );
  //     const token = response.data.accessToken;
  //     localStorage.setItem("token", token);
  //     toast.success(response.data.message || "Login Successfully");
  //     const decode = jwtDecode(token);
  //     const userRole = decode.role
  //   if (userRole === "ADMIN") {
  //     navigate("/admin-dashboard");
  //   } else if (userRole === "USER") {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/unauthorized"); // Fallback or unauthorized route
  //   }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Login Failed");
  //   }
  //   };
    
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.accessToken);

      toast.success(response.data.message || "Login Successfully");

      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-cyan-700 p-4 rounded-full">
            <FaSquareParking className="text-4xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-cyan-800 mt-4">Login to Your Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold transition `}
          >
           Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-cyan-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
