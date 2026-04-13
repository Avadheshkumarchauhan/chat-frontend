import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/AxiosInst"
import toast from "react-hot-toast"

const initialState={
    message:[],
}
export const sendMessage = createAsyncThunk("/message/send",async(data)=>{
   try {
       
     const res = axiosInstance.post(`message/send/${data[0]}`,data[1]);
     toast.promise(res,{
        loading:"Wait | message is sending...",
        success:(data)=>{
            return data?.data?.message 
        },
        error:"Faild to send message"
     });
     return (await res)?.data
   } catch (error) {
        toast.error(error?.response?.data?.message)
    
   }

})
export const getMessage = createAsyncThunk("/message/get",async(id)=>{
   try {
     
     const res = axiosInstance.get(`message/get/${id}`);
     toast.promise(res,{
        loading:"Wait | message is get...",
        success:(data)=>{
            return data?.data?.message 
        },
        error:"Faild to get message"
     });
     return (await res)?.data
   } catch (error) {
        toast.error(error?.response?.data?.message)
    
   }

})
const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers:{
        setMessage : (state,action)=>{
                        
            state.message=action?.payload;
        } 
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMessage.fulfilled,(state,action )=>{
            if(!action?.payload?.success) return;
            
            state.message= [...action.payload.data];
            
        })
        
    }
})
export const {setMessage} =messageSlice.actions
export default messageSlice.reducer;