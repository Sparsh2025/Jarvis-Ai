import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/UserAction";
import { useDispatch } from "react-redux";

export default function Register() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const[loading,setloading]=useState(false)
  const{register,handleSubmit,reset}= useForm()
  const submitHandler=async(e)=>{
   const obj={
    email:e.email,
    password:e.password
   }
   dispatch(loginUser(obj,navigate,setloading))
   reset()   
  }
//   setloading(false)
  return (
    <div className="h-screen flex items-center justify-center bg-[#0b1220] text-white">
      <div className="bg-[#0f1724] p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Welcome Back</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">   
          <input
            type="email"
            placeholder="Email"
             {...register("email")}
            className="w-full bg-[#131c2e] px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full bg-[#131c2e] px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-md font-medium cursor-pointer"
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
