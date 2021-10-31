import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Accordion from 'react-bootstrap/Accordion';

import CPF_ABI from '../abis';

type Project = {
  currentFundLevel: number,
  description: string,
  fundingNeeded: number,
  id: number,
  name: string,
  thresholdBlock: number,
}

function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects] = useState<Array<Project>>([]);

  useEffect(() => {
    getProjects();
  })

  async function getProjects() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const cpf = new web3.eth.Contract(CPF_ABI as any, "0x23b111A56e552b6EceE65b4d5Cc76054400694E5");
    const numProjects = await cpf.methods.projectCount().call();
    for (let i = 0; i < numProjects; i++) {
      let project = await cpf.methods.projects(i).call();
      projects.push(project);
    }
    setLoading(false);
  }

  let projectList = projects != null && projects.length > 0
    ? projects.map((project) => {
      return (
        <Accordion.Item eventKey={project.id.toString()}>
          <Accordion.Header>{project.name}</Accordion.Header>
          <Accordion.Body>
            {project.description}
          </Accordion.Body>
        </Accordion.Item>
      )
    })
    : null;

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        Loading
      </div>
    )
  }
  return (
    <div>
      <div className="d-flex flex-column align-items-center">
          <h1>Projects</h1>
          <Accordion>
        {projectList}
        </Accordion>
      </div>
    </div>
  )
}

export default Projects;