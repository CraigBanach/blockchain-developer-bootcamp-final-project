# Council-Project-Funding

## Introduction

This final project will allow users to propose projects (of any kind) with an Ethereum address.
A project should have a description, outlining its purpose.
A project must have an funding Threshold, to be triggered. 
A project must have a threshold date, after which funds are returned to the contributing users.

Any user can join and fund a project by sending Eth into the contract, specifying a project. This causes them to become part of the project's council.

Once a project has been fully (or excessively) funded, the proposer, can execute the initiation of said project, and the funds will be deployed to the project address.

If the project is not funded by the threshold date, the funds can no longer be deployed to the project address and can only be returned to the council members' originating addresses.

## Dependencies

To run the DApp in a local environment, the following dependencies are required:
* Node
  * download Node: https://nodejs.org/en/download/
* Truffle
  * Truffle: ``npm i -g truffle``
* React
  * React: ``npm i -g react``

## Directory Structure

```
Council-Project-Funding (root)
+-- contracts
|   +-- CouncilProjectFunding.sol
|
+-- front-end
|   +-- contracts
|   +-- src
|   +-- public
|
+-- migrations
|
+-- test
|   +-- CouncilProjectFunding.test.js    
|
```

## How to Interact with the DApp
* Interact through Web Interface
  * Run a local blockchain (`gananche-cli`)
  * Migrate the contracts onto your local blockchain (`truffle migrate` from root dir)
  * navigate to the front-end directory (`cd front-end`)
  * Run `npm install` to install all the dependencies in the package.json file
  * Launch the user interface via port: 3000 by running
  `npm start`
  in the front-end directory
  * Access the user interface via ``http://localhost:3000``
  * Install Metamask in your browser. Connect your Metamask wallet and start interacting with the app

### Contracts
* CouncilProjectFunding contract is compiled using Solidity compiler 0.8.9 and consists of the following key functions:
  * addProject
    * Purpose: for users to create prospective projects they want to accomplish
    * Input: Project name and details (name, description, funding required, threshold block)
    * Output: creates a new project and increases the project count by 1
