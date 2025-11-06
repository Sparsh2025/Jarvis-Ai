import React, { useEffect } from 'react'
import ChatSideBar from '../components/ChatSideBar'
import { useDispatch, useSelector } from 'react-redux'
import ChatWindow from '../components/ChatWindow'
import { setActiveChat } from '../store/Slice/ChatSlice'
import { getChats } from '../store/actions/ChatAction'

const Home = () => {
 const{activeChat}= useSelector(state=>state.chat)
 
 const user=JSON.parse(localStorage.getItem("currentUser"))

 const dispatch = useDispatch()
  useEffect(()=>{
    if(user){
    dispatch(getChats())
    }
   },[])
  return (
    <div className="h-screen flex bg-[#0b1220] text-white">
      <ChatSideBar activeChat={activeChat} onSelect={(chat)=>dispatch(setActiveChat(chat))} />
       <div className="flex-1">
        {activeChat ? (
          <ChatWindow chat={activeChat} activeChat={activeChat} />
        ) : (
         <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center space-y-4">
  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
    Welcome to <span className="text-emerald-500">Jarvis</span>
  </h1>
  <p className="text-base md:text-lg text-gray-400 max-w-md">
    Your intelligent AI assistant is ready to help.  
    Select a conversation or start a new chat to begin.
  </p>
  <div className="flex items-center gap-2 mt-4 text-emerald-500/80 animate-pulse">
    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
    <span className="text-sm">Awaiting your command...</span>
  </div>
</div>

        )}
      </div>
    </div>
  )
}

export default Home
