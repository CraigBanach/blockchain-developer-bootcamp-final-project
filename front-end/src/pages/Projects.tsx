import { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Contract } from "web3-eth-contract";
import Accordion from 'react-bootstrap/Accordion';
import CSS from 'csstype';

import type { Project } from '../types/Project';

const buttonStyles: CSS.Properties = {
  marginTop: '20px',
};

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
        <Accordion.Item eventKey={project.id.toString()} key={project.id.toString()}>
          <Accordion.Header>{project.name}</Accordion.Header>
          <Accordion.Body>
            <div>
              {project.description}
            </div>
            <div className="d-flex flex-row-reverse">
              <Link className="btn btn-primary pull-right" style={buttonStyles} to={`/project/${project.id}`}>View project</Link>
            </div>
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
    <Fragment>
      <h2>Projects</h2>
      <Accordion>
        {projectList}
      </Accordion>
    </Fragment>
  )
}

export default Projects;