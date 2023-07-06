import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import './App.css'
import Logo from './assets/logo.png';
import Hospital from './Components/Hospital';
import Details from './Components/Details';

function App() {

  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            MedStart
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element= {<Hospital/>}/>
        <Route path='/details/' element={<Details/>}/>
      </Routes>
    </div>
     )
}

export default App
