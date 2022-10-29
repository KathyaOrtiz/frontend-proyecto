import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAll=createAsyncThunk('partido/getPartidos',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/partidos');
        return response.data;
    } catch (error) {
        
    }
});
export const create=createAsyncThunk('grupos/createPartido',async(payload)=>{
    const response =await axios.post('http://localhost:3000/partidos',payload)
    return response.data;
});


const partidoSlice=createSlice({
    name:"partidos",
    initialState:{
        partidos:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getAll.fulfilled,(state,action)=>{
            state.partidos=action.payload
        });
        builder.addCase(create.fulfilled,(state,action)=>{
            state.partidos.push(action.payload)
        });
       
    }
  
})

export default partidoSlice.reducer;