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
import { createFase, getFases } from "../../redux/faseSlice";
function Fase({ fase, setFase }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const fasesState = useSelector((state) => state.fases);
  const { fases } = fasesState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFase({ ...fase, [name]: value });
  };

  const nuevaFase = (e) => {
    e.preventDefault();
    dispatch(createFase(fase));
    setFase({
      nombre: "",
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/fases/${id}`);
    dispatch(getFases());
  };
  const activarModificacion = async (id) => {
    const response=await axios.get(`http://localhost:3000/fases/${id}`);
    setFase(response.data)
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { nombre } = fase;
    await axios.put(`http://localhost:3000/fases/${idM}`, {
      nombre,
    });
    dispatch(getFases());
    setValidacionModificion(false)
    setFase({
        nombre: "",
      });
  };
  const cancelar=()=>{
    setFase({
        nombre: ""
      });
  }

  useEffect(() => {
    dispatch(getFases());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Fases</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {fases.map((fase) => (
                <tr key={fase.id}>
                  <td>{fase.id}</td>
                  <td>{fase.nombre}</td>
                  <td>
                    {" "}
                    <Button variant="btn btn-warning" onClick={() => activarModificacion(fase.id)}>
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(fase.id)}>Eliminar</Button>
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
              <FormLabel>Nombre</FormLabel>
              <FormControl
                type="text"
                id="nombre"
                name="nombre"
                value={fase.nombre}
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
export default Fase;
