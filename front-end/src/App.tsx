import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from 'web3-utils';

import Projects from './pages/Projects';
import AddProject from "./pages/AddProject";
import ProjectPage from "./pages/ProjectPage";
import CouncilProjectFunding from './contracts/CouncilProjectFunding.json';
import getWeb3 from "./getWeb3";

type State = {
  storageValue?: number,
  web3?: Web3,
  accounts: Array<string>
  contract?: Contract
}

function App() {
  const [state, setState] = useState<State>({ 
    storageValue: 0, 
    web3: undefined, 
    accounts: [], 
    contract: undefined 
  });

  useEffect(() => {
    initialLoad();
  })

  const initialLoad = async () => {
    console.log("Initial load");
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Get the contract instance.
      const networkId = (await web3.eth.net.getId()).toString();
      // @ts-ignore
      const deployedNetwork = CouncilProjectFunding.networks[networkId];
      const instance = new web3.eth.Contract(
        CouncilProjectFunding.abi as AbiItem[],
        deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Container>
            <Switch>
              <Route path="/addProject">
                <AddProject 
                  contract={state.contract}
                  account={state.accounts[0]}
                  web3={state.web3}
                />
              </Route>
              <Route path="/project/:id" component={(props: RouteComponentProps<{id: string}>) => 
                <ProjectPage 
                  contract={state.contract}
                  account={state.accounts[0]}
                  web3={state.web3}
                  {...props}
                />
              }>
              </Route>
              <Route path="/">
                <Projects 
                  contract={state.contract}
                />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
  );
}

export default App;
