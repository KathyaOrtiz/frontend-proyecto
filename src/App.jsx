import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Fase from './components/Fases/Fase'
import Navbar from './layout/navbar';
import './App.css'
import Estadio from './components/Estadios/Estadio';
import Pais from './components/Paises/Pais';
import Equipo from './components/Equipos/Equipo';
import Grupo from './components/Grupos/Grupo';
import Partido from './components/Partidos/Partido';
import Resultado from './components/Resultados/Resultado';
import TablaPosiciones from './components/TablaPosiciones/TablaPosiciones';


function App() {
//state para fases
 const [fase,setFase]=useState({
  nombre:""
 });
 //state para estadios
 const [estadio,setEstadio]=useState({
  nombre:"",
  ubicacion:"",
  capacidad:""
 })
 //state para paises
 const [pais,setPais]=useState({
  nombre:"",
  copas:"",
  rankingfifa:"",
  region:""
 })
 //state para equipos
 const [equipo,setEquipo]=useState({
  nombre:"",
  id_pais:""

 })
 //state para grupos
 const [grupo,setGrupo]=useState({
  nombre:"",
  jornada:"",
  id_equipo:""
 })
 //state para partidos

 const [partido,setPartido]=useState({
  fecha:"",
  hora:"",
  id_equipo1:"",
  id_equipo2:"",
  id_estadio:"",
  id_fase:""
 })

 const [resultado,setResultado]=useState({
  goles_equipo1:"",
  goles_equipo2:"",
  id_partido:""
 })

 const [posicion,setPosicion]=useState({
  p_jugados:"",
  p_ganados:"",
  p_empatados:"",
  p_perdidos:"",
  goles_favor:"",
  goles_contra:"",
  direferencia_p:"",
  puntos:"",
  id_equipo:""
 })
  return (
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<Home/>}/>
        <Route path='fases' element={<Fase fase={fase} setFase={setFase} />}/>
        <Route path='estadios' element={<Estadio estadio={estadio} setEstadio={setEstadio}/>}/>
        <Route path='paises' element={<Pais pais={pais} setPais={setPais}/>}/>
        <Route path='equipos' element={<Equipo equipo={equipo} setEquipo={setEquipo}/>}/>
        <Route path='grupos' element={<Grupo grupo={grupo} setGrupo={setGrupo}/>}/>
        <Route path='partidos'element={<Partido partido={partido} setPartido={setPartido} />}/>
        <Route path='resultados' element={<Resultado  resultado={resultado} setResultado={setResultado} />}/>
        <Route path='tabla' element={<TablaPosiciones posicion={posicion} setPosicion={setPosicion} />}  />
      </Route>
      </Routes>
    
  
  )
}

export default App
