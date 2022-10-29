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
import { create, getAll } from "../../redux/partidoSlice";
function Partido({ partido, setPartido }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const partidosState = useSelector((state) => state.partidos);
  const { partidos } = partidosState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartido({ ...partido, [name]: value });
  };

  const nuevaFase = (e) => {
    e.preventDefault();
    dispatch(create(partido));
    setPartido({
      fecha: "",
      hora: "",
      id_equipo1: "",
      id_equipo2: "",
      id_estadio: "",
      id_fase: "",
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/partidos/${id}`);
    dispatch(getAll());
  };
  const activarModificacion = async (id) => {
    const response = await axios.get(`http://localhost:3000/partidos/${id}`);
    setPartido(response.data);
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { fecha, hora, id_equipo1, id_equipo2, id_estadio, id_fase } =
      partido;
    await axios.put(`http://localhost:3000/partidos/${idM}`, {
      id_equipo1,
      id_equipo2,
      fecha,
      hora,
      id_estadio,
      id_fase
    });
    dispatch(getAll());
    setValidacionModificion(false);
    setPartido({
     
      id_equipo1: "",
      id_equipo2: "",
      fecha: "",
      hora: "",
      id_estadio: "",
      id_fase: "",
    });
  };
  const cancelar = () => {
    setPartido({
        id_equipo1:"",
        id_equipo2:"",
        fecha:"",
        hora:"",
        id_estadio:"",
        id_fase:""
    });
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Partidos</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Equipo1</th>
                <th>Equipo2</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Id Estadio</th>
                <th>Id Fase</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {partidos.map((partido) => (
                <tr key={partido.id}>
                  <td>{partido.id}</td>
                  <td>{partido.id_equipo1}</td>
                  <td>{partido.id_equipo2}</td>
                  <td>{partido.fecha}</td>
                  <td>{partido.hora}</td>
                  <td>{partido.id_estadio}</td>
                  <td>{partido.id_fase}</td>
                  <td>
                   
                    <Button
                      variant="btn btn-warning"
                      onClick={() => activarModificacion(partido.id)}
                    >
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(partido.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-4">
          <h3 className="text-center">Insertar fase</h3>
          <Form className="border p-4 rounded text-light text-center  bg-dark">
            <FormGroup className="form-group form-group-lg">
              <FormLabel>Id equipo1</FormLabel>
              <FormControl
                type="text"
                id="id_equipo1"
                name="id_equipo1"
                value={partido.id_equipo1}
                onChange={handleInputChange}
              />
               <FormLabel>Id equipo2</FormLabel>
              <FormControl
                type="text"
                id="id_equipo2"
                name="id_equipo2"
                value={partido.id_equipo2}
                onChange={handleInputChange}
              />
                <FormLabel>Id estadio</FormLabel>
               <FormControl
                type="text"
                id="id_estadio"
                name="id_estadio"
                value={partido.id_estadio}
                onChange={handleInputChange}
              />
                <FormLabel>Id fase</FormLabel>
               <FormControl
                type="text"
                id="id_fase"
                name="id_fase"
                value={partido.id_fase}
                onChange={handleInputChange}
              />
               <FormLabel>Fecha</FormLabel>
               <FormControl
              
                type="text"
                id="fecha"
                name="fecha"
                value={partido.fecha}
                onChange={handleInputChange}
              />
               <FormLabel>Hora</FormLabel>
               <FormControl
                type="text"
                id="hora"
                name="hora"
                value={partido.hora}
                onChange={handleInputChange}
              />
            </FormGroup>
            <br />
            {validacionModificacion ? (
              <Button variant="btn btn-warning " onClick={(e) => actualizar(e)}>
                Actualizar
              </Button>
            ) : (
              <Button onClick={nuevaFase}>Agregar</Button>
            )}
            <Button variant="btn btn-danger" className="m-3" onClick={cancelar}>
              Cancelar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Partido;
