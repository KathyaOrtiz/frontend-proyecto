import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet,Link } from 'react-router-dom';
function Navbarlayout(){
  return (
    <>
      <Navbar className='navBg'variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Qatar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/fases">Fases</Nav.Link>
            <Nav.Link as={Link} to="/estadios">Estadios</Nav.Link>
            <Nav.Link as={Link} to="/paises">Paises</Nav.Link>
            <Nav.Link as={Link} to="/equipos">Equipos</Nav.Link>
            <Nav.Link as={Link} to="/grupos">Grupos</Nav.Link>
            <Nav.Link as={Link} to="/partidos">Partidos</Nav.Link>
            <Nav.Link as={Link} to="/resultados">Resultados</Nav.Link>
            <Nav.Link as={Link} to="/tabla">TablaPosiciones</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
     
      <section>
        <Outlet></Outlet>
      </section>
    </>
  );
}
export default Navbarlayout;