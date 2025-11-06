import axios from 'axios'
import { loadChat } from '../Slice/ChatSlice'
const backendApi=import.meta.env.VITE_BACKEND_URL

export const createChat=(data)=>async(dispatch)=>{
 try {
    const res=await axios.post(backendApi+'/api/chat/',data,{
    withCredentials:true
  })
  dispatch(getChats())
 } catch (error) {
    console.log(error)
 }
}

export const getChats=()=>async(dispatch)=>{
 try {
    const res=await axios.get(backendApi+'/api/chat/getChats',{
    withCredentials:true
  })
  dispatch(loadChat(res.data.chats.reverse()))
 } catch (error) {
    console.log(error)
 }
}
