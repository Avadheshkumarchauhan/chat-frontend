import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../helper/AxiosInst";
import toast from "react-hot-toast"
const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") ||false,
    data:JSON.parse(localStorage.getItem("data"))||{}

}
export const signUp =createAsyncThunk("/auth/register",async(data)=>{
   try {
   // console.log("data slice : ", data);
    
     const res = axiosInstance.post("auth/signup",data);
     toast.promise(res,{
        loading:"Wait | creating your account",
        success:(data)=>{
            return data?.data?.message
        },
        error:"Faild to create account...... ",
      })
      return ((await res).data);
    } 
   catch (error) {
    toast.error(error?.response?.data?.message);

    
   }
}) 

export const login =createAsyncThunk("/auth/login",async(data)=>{
   try {
     const res = axiosInstance.post("auth/login",data);
     toast.promise(res,{
        loading:"Wait | authontication is proccess.....",
        success:(data)=>{
            return data?.data?.message
        },
        error:"Faild to login ",
      })
      return ((await res).data);
    } 
   catch (error) {
    toast.error(error?.response?.data?.message);

    
   }
}) ;
export const getuser =createAsyncThunk("/auth/getuser",async()=>{
   try {
     const res = axiosInstance.get("user/me");
     toast.promise(res,{
        // loading:"Wait | user details get  is proccessing.....",
        // success:(data)=>{
        //     return data?.data?.message
        // },
        error:"Faild to get user details ",
      })
      return ((await res).data);
    } 
   catch (error) {
    toast.error(error?.response?.data?.message);

    
   }
}) ;
export const saveProfile =createAsyncThunk("/auth/updateuser",async(data)=>{
   try {
     const res = axiosInstance.post("user/edit",data);
     toast.promise(res,{
        loading:"Wait | save profile  is proccessing.....",
        success:(data)=>{
            return data?.data?.message
        },
        error:"Faild to save profile ",
      })
      return ((await res).data);
    } 
   catch (error) {
    toast.error(error?.response?.data?.message);

    
   }
}) ;
export const logout =createAsyncThunk("/auth/logout",async()=>{
   try {
     const res = axiosInstance.get("auth/logout");
     toast.promise(res,{
        loading:"Wait | logout is proccess.....",
        success:(data)=>{
            return data?.data?.message
        },
        error:"Faild to logout ",
      })
      return ((await res).data);
    } 
   catch (error) {
    toast.error(error?.response?.data?.message);

    
   }
}) ;

const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
           
            if(!action?.payload?.success) return;
            
            localStorage.setItem("isLoggedIn",action?.payload?.success);
            localStorage.setItem("data",JSON.stringify(action?.payload?.data));
            state.isLoggedIn= action?.payload?.success;
            state.data=action?.payload?.data
        })
        .addCase(getuser.fulfilled,(state,action)=>{
           
            if(!action?.payload?.success) return;
            
            localStorage.setItem("isLoggedIn",action?.payload?.success);
            localStorage.setItem("data",JSON.stringify(action?.payload?.data));
            state.isLoggedIn= action?.payload?.success;
            state.data=action?.payload?.data
        })
        .addCase(logout.fulfilled,(state,action)=>{
            
            if(!action?.payload?.success) return;
            localStorage.clear();
            state.isLoggedIn=!action?.payload?.success;
            state.data={}
        })
    }

});
//export const {} = authSlice.actions;

export default authSlice.reducer;