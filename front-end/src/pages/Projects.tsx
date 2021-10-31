import { useEffect, useState } from 'react';
import Web3 from 'web3';
import CPF_ABI from '../abis';

function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Array<any>>();

  useEffect(() => {
    loadBlockchainData();
  }, [])

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    const cpf = new web3.eth.Contract(CPF_ABI as any, "0x9f148817fd7060C898EAA19ef758Ca9a33902759");
    console.log(await cpf.methods.projectCount().call());
    const projects = await cpf.methods.projects(0).call()
    console.log(projects);
    setProjects([projects, projects]);
    setLoading(false);
  }

  // const [cpf, setCpf] = useState(new ethers.Contract(
  //   "0x9f148817fd7060C898EAA19ef758Ca9a33902759",
  //   CPF_ABI)
  // );
  // //const [projectCount, setProjectCount] = useState();

  // async function getProjectCount() {
  //   try {
  //     const data = await cpf.projectCount().call();
  //     console.log('data: ', data);
  //   } catch (err) {
  //     console.log("Error: ", err)
  //   }
  // }

  async function connect() {
    try {
      // await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      // deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  let projectList = projects != null && projects.length > 0
    ? projects.map((project: { id: number }) => {
      return (<li key={project.id}>{project.id}</li>)
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
    <div className="d-flex justify-content-center">
      <ul>
        {projectList}
      </ul>
    </div>
  )
}

export default Projects;