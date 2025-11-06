import { configureStore } from '@reduxjs/toolkit'
import  chatSlice  from './Slice/ChatSlice'

export const store = configureStore({
  reducer: {
    chat:chatSlice
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})