import {createSlice} from '@reduxjs/toolkit'
const initialState={
    chats:[],
    activeChat:null,
    user:null
}

export const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        loadChat:(state,action)=>{
            state.chats=action.payload
        },
        setActiveChat:(state,action)=>{
            state.activeChat=action.payload
        }
    }
})

export const {loadChat,setActiveChat}=chatSlice.actions
export default chatSlice.reducer