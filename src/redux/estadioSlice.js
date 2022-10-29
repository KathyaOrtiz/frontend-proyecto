import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEstadios=createAsyncThunk('fases/getEstadios',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/estadios');
        return response.data;
    } catch (error) {
        
    }
});
export const createEstadio=createAsyncThunk('fases/createEstadio',async(payload)=>{
    const response =await axios.post('http://localhost:3000/estadios',payload)
    return response.data;
});


const estadioSlice=createSlice({
    name:"estadios",
    initialState:{
        estadios:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getEstadios.fulfilled,(state,action)=>{
            state.estadios=action.payload
        });
        builder.addCase(createEstadio.fulfilled,(state,action)=>{
            state.estadios.push(action.payload)
        });
       
    }
  
})

export default estadioSlice.reducer;