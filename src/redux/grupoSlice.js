import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAll=createAsyncThunk('grupos/getGrupos',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/grupos');
        return response.data;
    } catch (error) {
        
    }
});
export const create=createAsyncThunk('grupos/createGrupo',async(payload)=>{
    const response =await axios.post('http://localhost:3000/grupos',payload)
    return response.data;
});


const grupoSlice=createSlice({
    name:"grupos",
    initialState:{
        grupos:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getAll.fulfilled,(state,action)=>{
            state.grupos=action.payload
        });
        builder.addCase(create.fulfilled,(state,action)=>{
            state.grupos.push(action.payload)
        });
       
    }
  
})

export default grupoSlice.reducer;