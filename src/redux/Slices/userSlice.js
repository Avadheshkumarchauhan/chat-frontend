import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/AxiosInst"
import toast from "react-hot-toast"

const initialState={
    users:[],
    selectData:null,
    
    onLineUsers:null,
    searchUsers:null
}
export const otherUsers = createAsyncThunk("/user/otherUsers",async()=>{
   try {
     const res = axiosInstance.get("user/others");
     toast.promise(res,{
        // loading:"Wait | gething users are proccessing.....",
        // success:(data)=>{
        //     return data?.data?.message 
        // },
        error:"Faild to get users"
     });
     return (await res)?.data
   } catch (error) {
    toast.error(error?.response?.data?.message)
    
   }

})
export const searchUser = createAsyncThunk("/user/searchUser",async(searchData)=>{
   try {
     const res = axiosInstance.post(`user/search?query=${searchData}`);
     toast.promise(res,{
        // loading:"Wait | search users are proccessing.....",
        // success:(data)=>{
        //     return data?.data?.message 
        // },
        error:"Faild to search users"
     });
     return (await res)?.data
   } catch (error) {
    toast.error(error?.response?.data?.message)
    
   }

})
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{ 
        selectUser:(state,action)=>{
            state.selectData=action?.payload

        },
        clearUsers:(state,action)=>{
            state.users=action?.payload

        },
       
        setOnlineUsers :(state,action)=>{
            state.onLineUsers= action?.payload;
        },
        setSearchUser :(state,action)=>{
            state.searchUsers= action?.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(otherUsers.fulfilled,(state,action )=>{
            if(!action?.payload?.success) return
            
            state.users= action.payload.data;
            
        })
        .addCase(searchUser.fulfilled,(state,action )=>{
            if(!action?.payload?.success) return
           
            state.searchUsers= [...action.payload.data];
            
        })
    }
})
export const {selectUser,clearUsers,setSocket,setOnlineUsers,setSearchUser,} =userSlice.actions
export default userSlice.reducer;