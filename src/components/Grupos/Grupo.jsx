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
import { create, getAll } from "../../redux/grupoSlice";
function Grupo({ grupo, setGrupo }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const estado = useSelector((state) => state.grupos);
  const { grupos } = estado;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrupo({ ...grupo, [name]: value });
  };

  const agregar = (e) => {
    e.preventDefault();
    dispatch(create(grupo));
    setGrupo({
      nombre: "",
      jornada:"",
      id_equipo:""
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/grupos/${id}`);
    dispatch(getAll());
  };
  const activarModificacion = async (id) => {
    const response=await axios.get(`http://localhost:3000/grupos/${id}`);
    setGrupo(response.data)
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { nombre,jornada ,id_equipo} = grupo;
    await axios.put(`http://localhost:3000/grupos/${idM}`, {
      nombre,
      jornada,
      id_equipo
    });
    dispatch(getAll());
    setValidacionModificion(false)
    setGrupo({
        nombre: "",
        jornada:"",
        id_equipo:""
      });
  };
  const cancelar=()=>{
    setGrupo({
        nombre: "",
        jornada:"",
        id_equipo:""
      });
  }

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Grupos</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Jornada</th>
                <th>Id Equipo</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {grupos.map((grupo) => (
                <tr key={grupo.id}>
                  <td>{grupo.id}</td>
                  <td>{grupo.nombre}</td>
                  <td>{grupo.jornada}</td>
                  <td>{grupo.id_equipo}</td>
                  <td>
                   
                    <Button variant="btn btn-warning" onClick={() => activarModificacion(grupo.id)}>
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(grupo.id)}>Eliminar</Button>
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
                value={grupo.nombre}
                onChange={handleInputChange}
              />
               <FormLabel>Jornada</FormLabel>
              <FormControl
                type="text"
                id="jornada"
                name="jornada"
                value={grupo.jornada}
                onChange={handleInputChange}
              />
               <FormLabel>Jornada</FormLabel>
              <FormControl
                type="text"
                id="id_equipo"
                name="id_equipo"
                value={grupo.id_equipo}
                onChange={handleInputChange}
              />
            </FormGroup>
            <br/>
            {validacionModificacion ? (
              <Button variant="btn btn-warning " onClick={(e) => actualizar(e)}>
                Actualizar
              </Button>
            ) : (
              <Button onClick={agregar}>Agregar</Button>
            )}
            <Button variant="btn btn-danger" className="m-3" onClick={cancelar}>Cancelar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Grupo;
