import { ChangeEvent, Fragment, useState } from "react";
import { Contract } from "web3-eth-contract";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Web3 from "web3";

type Props = {
    contract?: Contract
    account: string
    web3: Web3 | undefined,
}

const AddProject = ({
    contract,
    account,
    web3,
}: Props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [fundingThreshold, setFundingThreshold] = useState(1000);
    const [thresholdBlock, setThresholdBlock] = useState(2000000);

    const handleFundingThresholdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFundingThreshold(Number(event.target.value));
    }

    const handleThresholdBlockChange = (event: ChangeEvent<HTMLInputElement>) => {
        setThresholdBlock(Number(event.target.value));
    }

    const addProject = () => {
        if (
            name.length > 0
            && description.length > 0
            && fundingThreshold > 0
            && thresholdBlock > 0
            && contract
            && web3
        ) {
            contract.methods.addProject(
                name,
                description,
                web3.utils.toWei(fundingThreshold.toString(), 'ether'),
                thresholdBlock
            ).send({
                from: account
            });
        }
    }

    return (
        <Fragment>
            <h2>Add Project</h2>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter project name" 
                        value={name}
                        onChange={event => setName(event.target.value)}
                        isValid={name.length > 0}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter project description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        isValid={description.length > 0}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fundingThreshold">
                    <Form.Label>Threshold for successful funding (ETH)</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={fundingThreshold} 
                        onChange={handleFundingThresholdChange}
                        isValid={fundingThreshold > 0} 
                    />
                    <Form.Text className="text-muted">
                        Enter the amount of funds (in ETH) that will be required for the project to be triggered
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="thresholdBlock">
                    <Form.Label>Project expiry block</Form.Label>
                    <Form.Control 
                        type="number"
                        value={thresholdBlock}
                        onChange={handleThresholdBlockChange}
                        isValid={thresholdBlock > 0}    
                    />
                    <Form.Text className="text-muted">
                        Enter the block that funding must be reached at, before the project is closed and funds returned to the funders
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" onClick={addProject}>
                    Add project
                </Button>
            </Form>
        </Fragment>
    )
}

export default AddProject;