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
import { createPais, getPaises } from "../../redux/paisSlice";
function Pais({ pais, setPais }) {
  const [validacionModificacion, setValidacionModificion] = useState(false);
  const [idM, setidM] = useState([]);

  const dispatch = useDispatch();
  const paisState = useSelector((state) => state.paises);
  const { paises } = paisState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPais({ ...pais, [name]: value });
  };

  const nuevaFase = (e) => {
    e.preventDefault();
    dispatch(createPais(pais));
    setPais({
      nombre: "",
      copas: "",
      rankingfifa: "",
      region: ""
    });
  };
  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3000/paises/${id}`);
    dispatch(getPaises());
  };
  const activarModificacion = async (id) => {
    const response = await axios.get(`http://localhost:3000/paises/${id}`);
    setPais(response.data);
    setValidacionModificion(true);
    setidM(id);
    console.log(id);
  };
  const actualizar = async (e) => {
    e.preventDefault();
    const { nombre,copas,rankingfifa,region } = pais;
    await axios.put(`http://localhost:3000/paises/${idM}`, {
      nombre,
      copas,
      rankingfifa,
      region
    });
    dispatch(getPaises());
    setValidacionModificion(false);
    setPais({
        nombre: "",
        copas: "",
        rankingfifa: "",
        region: ""
    });
  };
  const cancelar=()=>{
    setPais({
        nombre: "",
        copas: "",
        rankingfifa: "",
        region: ""
      });
  }

  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center">Paises</h3>
      <div className="row">
        <div className="col-8">
        <div className="scroll">
          <Table className="table table-dark table-fixed mt-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Copas</th>
                <th>Ranking</th>
                <th>Region</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {paises.map((pais) => (
                <tr key={pais.id}>
                  <td>{pais.id}</td>
                  <td>{pais.nombre}</td>
                  <td>{pais.copas}</td>
                  <td>{pais.rankingfifa}</td>
                  <td>{pais.region}</td>
                  <td>
                    {" "}
                    <Button
                      variant="btn btn-warning"
                      onClick={() => activarModificacion(pais.id)}
                    >
                      Actualizar
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => eliminar(pais.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </div>
        <div className="col-4">
          <h3 className="text-center">Insertar Pais</h3>
          <Form className="border p-4 rounded text-light text-center  bg-dark">
            <FormGroup className="form-group form-group-lg">
              <FormLabel>Nombre</FormLabel>
              <FormControl
                type="text"
                id="nombre"
                name="nombre"
                value={pais.nombre}
                onChange={handleInputChange}
              />
               <FormLabel>Copas</FormLabel>
              <FormControl
                type="text"
                id="copas"
                name="copas"
                value={pais.copas}
                onChange={handleInputChange}
              />
            <FormLabel>Ranking</FormLabel>
              <FormControl
                type="text"
                id="rankingfifa"
                name="rankingfifa"
                value={pais.rankingfifa}
                onChange={handleInputChange}
              />
                <FormLabel>Region</FormLabel>
              <FormControl
                type="text"
                id="region"
                name="region"
                value={pais.region}
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
              <Button variant="btn btn-danger" className="m-3" onClick={cancelar}>Cancelar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Pais;
