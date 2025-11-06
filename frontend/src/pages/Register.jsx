import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/actions/UserAction";

export default function Register() {
  const navigate = useNavigate()
  const[loading,setloading]=useState(false)
  const{register,handleSubmit,reset}= useForm()
  const submitHandler=async(e)=>{
   const obj={
    fullName:{
        firstName:e.firstName,
        lastName:e.lastName
    },
    email:e.email,
    password:e.password
   }
   registerUser(obj,navigate,setloading)
   reset()   
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#0b1220] text-white">
      <div className="bg-[#0f1724] p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
         <div className="flex gap-3">
           <input
            type="text"
            placeholder="FirstName"
            {...register("firstName")}
            className="w-full bg-[#131c2e] px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

           <input
            type="text"
            placeholder="LastName"
            {...register("lastName")}
            className="w-full bg-[#131c2e] px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

         </div>
         
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
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-md font-medium"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
