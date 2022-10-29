import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAll=createAsyncThunk('posiciones/getPosiciones',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/tablaposiciones');
        return response.data;
    } catch (error) {
        
    }
});
export const create=createAsyncThunk('posiciones/createPosicion',async(payload)=>{
    const response =await axios.post('http://localhost:3000/tablaposiciones',payload)
    return response.data;
});


const tbposicionSlice=createSlice({
    name:"posiciones",
    initialState:{
        posiciones:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getAll.fulfilled,(state,action)=>{
            state.posiciones=action.payload
        });
        builder.addCase(create.fulfilled,(state,action)=>{
            state.posiciones.push(action.payload)
        });
       
    }
  
})

export default tbposicionSlice.reducer;