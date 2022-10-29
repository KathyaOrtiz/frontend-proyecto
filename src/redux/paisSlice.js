import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPaises=createAsyncThunk('fases/getPaises',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/paises');
        return response.data;
    } catch (error) {
        
    }
});
export const createPais=createAsyncThunk('fases/createPais',async(payload)=>{
    const response =await axios.post('http://localhost:3000/paises',payload)
    return response.data;
});


const paisSlice=createSlice({
    name:"paises",
    initialState:{
        paises:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getPaises.fulfilled,(state,action)=>{
            state.paises=action.payload
        });
        builder.addCase(createPais.fulfilled,(state,action)=>{
            state.paises.push(action.payload)
        });
       
    }
  
})

export default paisSlice.reducer;