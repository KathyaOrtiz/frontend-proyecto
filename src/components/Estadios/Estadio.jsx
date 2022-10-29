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
import { createEstadio, getEstadios } from "../../redux/estadioSlice";
function Estadio({ estadio, setEstadio }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const estadioState = useSelector((state) => state.estadios);
  const { estadios } = estadioState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstadio({ ...estadio, [name]: value });
  };

  const nuevoEstadio = (e) => {
    e.preventDefault();
    dispatch(createEstadio(estadio));
    setEstadio({
      nombre: "",
      ubicacion:"",
      capacidad:""
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/estadios/${id}`);
    dispatch(getEstadios());
  };
  const activarModificacion = async (id) => {
    const response=await axios.get(`http://localhost:3000/estadios/${id}`);
    setEstadio(response.data)
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
    
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { nombre,ubicacion,capacidad } = estadio;
    await axios.put(`http://localhost:3000/estadios/${idM}`, {
      nombre,
      ubicacion,
      capacidad
    });
    dispatch(getEstadios());
    setValidacionModificion(false)
    setEstadio({
        nombre: "",
        ubicacion:"",
        capacidad:""
      });
  };
  const cancelar=()=>{
    setEstadio({
        nombre: "",
        ubicacion:"",
        capacidad:"",
      });
  }

  useEffect(() => {
    dispatch(getEstadios());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Estadios</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Ubicacion</th>
                <th>Capacidad</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {estadios.map((estadio) => (
                <tr key={estadio.id}>
                  <td>{estadio.id}</td>
                  <td>{estadio.nombre}</td>
                  <td>{estadio.ubicacion}</td>
                  <td>{estadio.capacidad}</td>
                  <td>
                    {" "}
                    <Button variant="btn btn-warning" onClick={() => activarModificacion(estadio.id)}>
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(estadio.id)}>Eliminar</Button>
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
              <FormLabel>Nombre</FormLabel>
              <FormControl
                type="text"
                id="nombre"
                name="nombre"
                value={estadio.nombre}
                onChange={handleInputChange}
              />
              <FormLabel>Ubicacion</FormLabel>
              <FormControl
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={estadio.ubicacion}
                onChange={handleInputChange}
              />
             <FormLabel>Capacidad</FormLabel>
             <FormControl
              type="text"
              id="capacidad"
              name="capacidad"
              value={estadio.capacidad}
              onChange={handleInputChange}
             />
            </FormGroup>
            <br/>
            {validacionModificacion ? (
              <Button variant="btn btn-warning " onClick={(e) => actualizar(e)}>
                Actualizar
              </Button>
            ) : (
              <Button onClick={nuevoEstadio}>Agregar</Button>
            )}
            <Button variant="btn btn-danger" className="m-3" onClick={cancelar}>Cancelar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Estadio;
