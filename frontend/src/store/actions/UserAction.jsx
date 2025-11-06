import axios from 'axios'
import { getChats } from './ChatAction'

const backendApi=import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

export const registerUser=async(data,navigate,setloading)=>{
    setloading(true)
 try {
    const res=await axios.post(backendApi+'/api/auth/register',data,{
    withCredentials:true
  })
  setloading(false)
  navigate("/login")
 } catch (error) {
    console.log(error)
 }
}

export const loginUser=(data,navigate,setloading)=>async(dispatch)=>{
    setloading(true)
 try {
    const res=await axios.post(backendApi+'/api/auth/login',data,{
    withCredentials:true
  })
  dispatch(getChats())
  localStorage.setItem("currentUser",JSON.stringify(res.data.user))
  setloading(false)
  navigate("/")
 } catch (error) {
    console.log(error)
 }
}

export const logoutUser=(navigate)=>async(dispatch)=>{
 try {
    const res=await axios.post(backendApi+'/api/auth/logout',{},{
    withCredentials:true
  })
  navigate("/login")
  localStorage.removeItem("currentUser")
 } catch (error) {
    console.log(error)
 }
}

