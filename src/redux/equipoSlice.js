import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import faseSlice from "./faseSlice";

export const getEquipos=createAsyncThunk('equipos/getEquipos',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/equipos');
        return response.data;
    } catch (error) {
        
    }
});
export const createEquipo=createAsyncThunk('equipos/createEquipo',async(payload)=>{
    const response =await axios.post('http://localhost:3000/equipos',payload)
    return response.data;
});


const equipoSlice=createSlice({
    name:"equipos",
    initialState:{
        equipos:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getEquipos.fulfilled,(state,action)=>{
            state.equipos=action.payload
        });
        builder.addCase(createEquipo.fulfilled,(state,action)=>{
            state.equipos.push(action.payload)
        });
       
    }
  
})

export default equipoSlice.reducer;