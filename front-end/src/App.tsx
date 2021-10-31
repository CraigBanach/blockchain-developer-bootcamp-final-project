import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

import Projects from './pages/Projects';

function AddProject() {
  return <h2>Add Project</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
      <Router>
        <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Council-Project Funding</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-item nav-link" to="/">Projects</Link>
                <Link className="nav-item nav-link" to="/addProject">Add Project</Link>
                <Link className="nav-item nav-link" to="/users">Users</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/addProject">
              <AddProject />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Projects />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
