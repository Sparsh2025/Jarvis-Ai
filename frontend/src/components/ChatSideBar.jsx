import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { createChat } from "../store/actions/ChatAction";
import ChatListItem from "./ChatListItem";
import { useNavigate,Link } from "react-router-dom";
import { logoutUser } from "../store/actions/UserAction";
import { toast } from "react-toastify";
import { User, LogOut } from "lucide-react";


export default function ChatSideBar({onSelect,activeChat}) {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
 
 const user=JSON.parse(localStorage.getItem("currentUser"))
 const userChat= useSelector(state=>state.chat.chats)
  const handleNewChat = (e) => {
    e.preventDefault();
    if(!user){
      return toast.error('login please')  
    }
    if (!title.trim()) return toast.error('enter chat title');
    const obj={
        title:title
    }
    dispatch(createChat(obj));
    setTitle("");
  };


  return (
    <div className="w-72 bg-[#0f1724] border-r border-[#1b2538] flex flex-col">
      <div className="p-4 border-b border-[#1b2538] flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chats</h2>
       {user ?  <button
          onClick={() => dispatch(logoutUser(navigate))}
          className="text-gray-400 hover:text-emerald-400 text-sm"
        >
     <LogOut size={18} className="inline mr-2" />
          Logout
        </button> :  <Link
          to={'/login'}
          className="text-gray-400 font-bold hover:text-emerald-400 text-md"
        >
        <User size={18} className="inline mr-1 mb-1" />
          Login
        </Link>}
      </div>

      <div className="p-3">
        <form onSubmit={handleNewChat} className="flex gap-2">
          <input
            type="text"
            placeholder="New chat title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-[#131c2e] px-3 py-2 rounded-md outline-none text-sm text-gray-200"
          />
          <button
            type="submit"
            className="bg-emerald-600 px-3 rounded-md text-sm font-medium hover:bg-emerald-700"
          >
            +
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {userChat.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">
            No chats yet
          </p>
        )}
           {userChat.map((chat) => (
          <ChatListItem
            key={chat._id}
            chat={chat}
            active={activeChat?._id === chat._id}
            onSelect={() => onSelect(chat)}
          />
        ))}
      </div>
    </div>
  );
}
