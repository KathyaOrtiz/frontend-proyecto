import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { create, getAll } from "../../redux/resultadoSlice";
function Resultado({ resultado, setResultado }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const resultadosState = useSelector((state) => state.resultados);
  const { resultados } = resultadosState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResultado({ ...resultado, [name]: value });
  };

  const nuevaFase = (e) => {
    e.preventDefault();
    dispatch(create(resultado));
    setResultado({
        goles_equipo1:"",
        goles_equipo2:"",
        id_partido:""
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/resultados/${id}`);
    dispatch(getAll());
  };
  const activarModificacion = async (id) => {
    const response=await axios.get(`http://localhost:3000/resultados/${id}`);
    setResultado(response.data)
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { goles_equipo1,goles_equipo2,id_partido } = resultado;
    await axios.put(`http://localhost:3000/resultados/${idM}`, {
      goles_equipo1,
      goles_equipo2,
      id_partido
    });
    dispatch(getAll());
    setValidacionModificion(false)
    setResultado({
        goles_equipo1:"",
        goles_equipo2:"",
        id_partido:""
      });
  };
  const cancelar=()=>{
    setResultado({
        goles_equipo1:"",
        goles_equipo2:"",
        id_partido:""
      });
  }

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Resultados</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Goles equipo1</th>
                <th>Goles equipo2</th>
                <th>Id partido</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((resultado) => (
                <tr key={resultado.id}>
                  <td>{resultado.id}</td>
                  <td>{resultado.goles_equipo1}</td>
                  <td>{resultado.goles_equipo2}</td>
                  <td>{resultado.id_partido}</td>
                  <td>
                
                    <Button variant="btn btn-warning" onClick={() => activarModificacion(resultado.id)}>
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(resultado.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-4">
          <h3 className="text-center">Insertar</h3>
          <Form className="border p-4 rounded text-light text-center  bg-dark">
            <FormGroup className="form-group form-group-lg">
              <FormLabel>Goles equipo1</FormLabel>
              <FormControl
                type="text"
                id="goles_equipo1"
                name="goles_equipo1"
                value={resultado.goles_equipo1}
                onChange={handleInputChange}
              />
               <FormLabel>Goles equipo2</FormLabel>
              <FormControl
                type="text"
                id="goles_equipo2"
                name="goles_equipo2"
                value={resultado.goles_equipo2}
                onChange={handleInputChange}
              />
               <FormLabel>Id partido</FormLabel>
              <FormControl
                type="text"
                id="id_partido"
                name="id_partido"
                value={resultado.id_partido}
                onChange={handleInputChange}
              />
            </FormGroup>
            <br/>
            {validacionModificacion ? (
              <Button variant="btn btn-warning " onClick={(e) => actualizar(e)}>
                Actualizar
              </Button>
            ) : (
              <Button onClick={nuevaFase}>Agregar</Button>
            )}
            <Button variant="btn btn-danger" className="m-3" onClick={cancelar}>Cancelar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Resultado;
