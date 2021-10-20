import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import Projects from './pages/Projects';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function getLibrary(provider?: any, connector?: any): any {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Council-Project Funding</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-item nav-link" to="/">Projects</Link>
                <Link className="nav-item nav-link" to="/about">About</Link>
                <Link className="nav-item nav-link" to="/users">Users</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
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
    </Web3ReactProvider>
  );
}

export default App;
