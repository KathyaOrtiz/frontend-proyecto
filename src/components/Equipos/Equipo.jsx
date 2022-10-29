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
import { createEquipo, getEquipos } from "../../redux/equipoSlice";
function Equipo({ equipo, setEquipo }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const equipoState = useSelector((state) => state.equipos);
  const { equipos } = equipoState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipo({ ...equipo, [name]: value });
  };

  const nuevaFase = (e) => {
    e.preventDefault();
    dispatch(createEquipo(equipo));
    setEquipo({
      nombre: "",
      id_pais:""
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/equipos/${id}`);
    dispatch(getEquipos());
  };
  const activarModificacion = async (id) => {
    const response=await axios.get(`http://localhost:3000/equipos/${id}`);
    setEquipo(response.data)
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { nombre,id_pais } = equipo;
    await axios.put(`http://localhost:3000/equipos/${idM}`, {
      nombre,
      id_pais
    });
    dispatch(getEquipos());
    setValidacionModificion(false)
    setEquipo({
        nombre: "",
        id_pais:""
      });
  };
  const cancelar=()=>{
    setEquipo({
        nombre: "",
        id_pais:""
      });
  }

  useEffect(() => {
    dispatch(getEquipos());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Equipos</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Id_pais</th>
              
               
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo) => (
                <tr key={equipo.id}>
                  <td>{equipo.id}</td>
                  <td>{equipo.nombre}</td>
                  <td>{equipo.id_pais}</td>
                  <td>
                   
                    <Button variant="btn btn-warning" onClick={() => activarModificacion(equipo.id)}>
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(equipo.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-4">
          <h3 className="text-center">Insertar Equipo</h3>
          <Form className="border p-4 rounded text-light text-center  bg-dark">
            <FormGroup className="form-group form-group-lg">
              <FormLabel>Nombre</FormLabel>
              <FormControl
                type="text"
                id="nombre"
                name="nombre"
                value={equipo.nombre}
                onChange={handleInputChange}
              />
               <FormLabel>Id_Pais</FormLabel>
              <FormControl
                type="text"
                id="id_pais"
                name="id_pais"
                value={equipo.id_pais}
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
export default Equipo;
