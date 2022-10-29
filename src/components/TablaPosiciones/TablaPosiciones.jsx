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
import { create, getAll } from "../../redux/tbposicionSlice";
function TablaPosiciones({ posicion, setPosicion }) {
    
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);


  const dispatch = useDispatch();
  const posicionState = useSelector((state) => state.posiciones);
  const { posiciones } = posicionState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPosicion({ ...posicion, [name]: value });
  };


  const nuevaFase = (e) => {
    e.preventDefault();
    dispatch(create(posicion));
    setPosicion({
      p_jugados: "",
      p_ganados: "",
      p_empatados: "",
      p_perdidos: "",
      goles_favor: "",
      goles_contra: "",
      direferencia_p: "",
      puntos: "",
      id_equipo: "",
    });
  };

  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/tablaposiciones/${id}`);
    dispatch(getAll());
  };
  const activarModificacion = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/tablaposiciones/${id}`
    );
    setPosicion(response.data);
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const {
      p_jugados,
      p_ganados,
      p_empatados,
      p_perdidos,
      goles_favor,
      goles_contra,
      direferencia_p,
      puntos,
      id_equipo,
    } = posicion;
    await axios.put(`http://localhost:3000/tablaposiciones/${idM}`, {
      p_jugados,
      p_ganados,
      p_empatados,
      p_perdidos,
      goles_favor,
      goles_contra,
      direferencia_p,
      puntos,
      id_equipo,
    });
    dispatch(getAll());
    setValidacionModificion(false);
    setPosicion({
      p_jugados: "",
      p_ganados: "",
      p_empatados: "",
      p_perdidos: "",
      goles_favor: "",
      goles_contra: "",
      direferencia_p: "",
      puntos: "",
      id_equipo: "",
    });
  };
  const cancelar = () => {
    setPosicion({
      p_jugados: "",
      p_ganados: "",
      p_empatados: "",
      p_perdidos: "",
      goles_favor: "",
      goles_contra: "",
      direferencia_p: "",
      puntos: "",
      id_equipo: "",
    });
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Tabla posiciones</h3>
      <div className="row">
        <div className="col-8">
          <Table className="table table-dark mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Pj</th>
                <th>Pg</th>
                <th>Pe</th>
                <th>Pp</th>
                <th>Gf</th>
                <th>Gc</th>
                <th>Puntos</th>
                <th>Id equipo</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {posiciones.map((posi) => (
                <tr key={posi.id}>
                  <td>{posi.id}</td>
                  <td>{posi.p_jugados}</td>
                  <td>{posi.p_ganados}</td>
                  <td>{posi.p_empatados}</td>
                  <td>{posi.p_perdidos}</td>
                  <td>{posi.goles_favor}</td>
                  <td>{posi.goles_contra}</td>
                  <td>{posi.puntos}</td>
                  <td>{posi.id_equipo}</td>
                  <td>
                    <Button
                      variant="btn btn-warning"
                      onClick={() => activarModificacion(posi.id)}
                    >
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(posi.id)}>
                      Eliminar
                    </Button>
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
              <FormLabel>Jugados</FormLabel>
              <FormControl
                type="text"
                id="p_jugados"
                name="p_jugados"
                value={posicion.p_jugados}
                onChange={handleInputChange}
              />
              <FormLabel>Ganados</FormLabel>
              <FormControl
                type="text"
                id="p_ganados"
                name="p_ganados"
                value={posicion.p_ganados}
                onChange={handleInputChange}
              />

              <FormLabel>Empatados</FormLabel>
              <FormControl
                type="text"
                id="p_empatados"
                name="p_empatados"
                value={posicion.p_empatados}
                onChange={handleInputChange}
              />
              <FormLabel>Perdidos</FormLabel>
              <FormControl
                type="text"
                id="p_perdidos"
                name="p_perdidos"
                value={posicion.p_perdidos}
                onChange={handleInputChange}
              />
              <FormLabel>Goles favor</FormLabel>
              <FormControl
                type="text"
                id="goles_favor"
                name="goles_favor"
                value={posicion.goles_favor}
                onChange={handleInputChange}
              />
              <FormLabel>Goles contra</FormLabel>
              <FormControl
                type="text"
                id="goles_contra"
                name="goles_contra"
                value={posicion.goles_contra}
                onChange={handleInputChange}
              />
             
              <FormLabel>Puntos</FormLabel>
              <FormControl
                type="text"
                id="puntos"
                name="puntos"
                value={posicion.puntos}
                onChange={handleInputChange}
              />

              <FormLabel>Id equipo</FormLabel>
              <FormControl
                type="text"
                id="id_equipo"
                name="id_equipo"
                value={posicion.id_equipo}
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
export default TablaPosiciones;
