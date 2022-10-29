import { configureStore } from "@reduxjs/toolkit";
import fasesReducer from './redux/faseSlice';
import estadioReducer from './redux/estadioSlice'
import paisReducer from './redux/paisSlice'
import equipoReducer from './redux/equipoSlice'
import grupoReducer from './redux/grupoSlice'
import partidoReducer from './redux/partidoSlice'
import resultadoReducer from './redux/resultadoSlice'
import tbReducer from './redux/tbposicionSlice'

export default configureStore({
    reducer:{
        fases:fasesReducer,
        estadios:estadioReducer,
        paises:paisReducer,
        equipos:equipoReducer,
        grupos:grupoReducer,
        partidos:partidoReducer,
        resultados:resultadoReducer,
        posiciones:tbReducer,
    },
})