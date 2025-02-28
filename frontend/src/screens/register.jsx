/* eslint-disable no-unused-vars */
import React ,{useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";


const Register = () => {
const [name, setUsername] = useState("");
const [email , setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const {setUser} = useContext(UserContext)
function submitHandler(e){
  e.preventDefault();

  axios.post('/users/register',{
    name,
    email,
    password
  }).then((res)=>{
    console.log(res.data);
    localStorage.setItem('token' , res.data.token)
    setUser(res.data.user)
    navigate('/')
  }).catch((err)=>{
  console.log(err);
  })

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Create an Account
        </h2>
        <form 
        onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
             onChange={(e) =>setUsername(e.target.value)}
            
              type="text"
              id="name"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
             onChange={(e) =>setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
            onChange={(e) =>setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
