import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAll=createAsyncThunk('resultados/getResultados',async()=>{
    try {
        const response=await axios.get('http://localhost:3000/resultados');
        return response.data;
    } catch (error) {
        
    }
});
export const create=createAsyncThunk('resultados/createResultado',async(payload)=>{
    const response =await axios.post('http://localhost:3000/resultados',payload)
    return response.data;
});


const resultadoSlice=createSlice({
    name:"resultados",
    initialState:{
        resultados:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(getAll.fulfilled,(state,action)=>{
            state.resultados=action.payload
        });
        builder.addCase(create.fulfilled,(state,action)=>{
            state.resultados.push(action.payload)
        });
       
    }
  
})

export default resultadoSlice.reducer;