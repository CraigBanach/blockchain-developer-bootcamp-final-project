import { useEffect, useState } from 'react';
import { Contract } from "web3-eth-contract";
import Accordion from 'react-bootstrap/Accordion';

type Project = {
  currentFundLevel: number,
  description: string,
  fundingNeeded: number,
  id: number,
  name: string,
  thresholdBlock: number,
}

type Props = {
  contract?: Contract
}

const Projects = ({
  contract
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [projects] = useState<Array<Project>>([]);

  useEffect(() => {
    getProjects();
  })

  async function getProjects() {
    if (contract) {
      const numProjects = await contract.methods.projectCount().call();
      for (let i = 0; i < numProjects; i++) {
        let project = await contract.methods.projects(i).call();
        projects.push(project);
      }
      setLoading(false);
    }
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
      <div className="d-flex flex-column align-items-center">
        <h1>Projects</h1>
        <Accordion>
          {projectList}
        </Accordion>
      </div>
  )
}

export default Projects;