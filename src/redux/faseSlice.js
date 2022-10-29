import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFases=createAsyncThunk('fases/getFases',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/fases');
        return response.data;
    } catch (error) {
        
    }
});
export const createFase=createAsyncThunk('fases/createFase',async(payload)=>{
    const response =await axios.post('http://localhost:3000/fases',payload)
    return response.data;
});


const faseSlice=createSlice({
    name:"fases",
    initialState:{
        fases:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getFases.fulfilled,(state,action)=>{
            state.fases=action.payload
        });
        builder.addCase(createFase.fulfilled,(state,action)=>{
            state.fases.push(action.payload)
        });
       
    }
  
})

export default faseSlice.reducer;