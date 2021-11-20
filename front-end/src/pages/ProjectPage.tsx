import { useState, useEffect, Fragment, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Contract } from "web3-eth-contract";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Web3 from "web3";

import type { Project } from '../types/Project';
import './ProjectPage.css';

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
    contract?: Contract;
    account: string;
    web3: Web3 | undefined;
}

function ProjectPage({
    match: { params: { id }},
    contract,
    account,
    web3,
}: Props) {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project>();
    const [fundsContributing, setFundsContributing] = useState(0);

    useEffect(() => {
        getProject();
    }, [contract])

    async function getProject() {
        if (contract) {
            setProject(await contract.methods.projects(id).call());
            setLoading(false);
        }
    }

    const handleFundsContributingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFundsContributing(Number(event.target.value));
    }

    const addFunds = () => {
        if (fundsContributing > 0 
            && contract
            && web3
        ) {
            // TODO
            contract.methods.fundProject(id).send({
                from: account,
                value: web3.utils.toWei(fundsContributing.toString(), 'ether'),
            })
        }
    }

    if (loading) {
        return ( <h2>Loading</h2> );
    }

    if (!project) {
        return ( <h2>Could not find project with ID {id}</h2> );
    }

    return (
        <Fragment>
            <h2>Project</h2>
            <Form>
                <Form.Group className="label-holder" controlId="name">
                    <Form.Label>Project name:</Form.Label>
                    <Form.Label>{project.name}</Form.Label>
                </Form.Group>

                <Form.Group className="label-holder" controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Label>{project.description}</Form.Label>
                </Form.Group>

                <Form.Group className="label-holder" controlId="fundingThreshold">
                    <Form.Label>Funding needed:</Form.Label>
                    <Form.Label>{web3?.utils.fromWei(project.fundingNeeded.toString())} Ξ</Form.Label>
                </Form.Group>

                <Form.Group className="label-holder" controlId="thresholdBlock">
                    <Form.Label>Project expiry block:</Form.Label>
                    <Form.Label>{project.thresholdBlock}</Form.Label>
                </Form.Group>

                <Form.Group className="label-holder" controlId="currentFundLevel">
                    <Form.Label>Current funding level:</Form.Label>
                    <Form.Label>{web3?.utils.fromWei(project.currentFundLevel.toString())} Ξ</Form.Label>
                </Form.Group>

                <div className="input-wrapper">
                    <Form.Group className="mb-3" controlId="currentFundLevel">
                        <Form.Label>Fund project with ETH:</Form.Label>
                        <Form.Control 
                            type="number"
                            value={fundsContributing}
                            onChange={handleFundsContributingChange}
                            isValid={fundsContributing > 0}   
                            style={{ width: '33%' }}
                        />
                        <Form.Text className="text-muted">
                            Enter the amount of ETH you would like to contribute to the project here
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={addFunds}>
                        Fund project
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
}

export default ProjectPage;