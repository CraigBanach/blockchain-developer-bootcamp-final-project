# Council-Project-Funding

## Deployed version url

TODO

## Introduction

This final project will allow users to propose projects (of any kind) with an Ethereum address.

A project should have a description, outlining its purpose.

A project must have an funding Threshold, to be actionable. 

A project must have a threshold date, after which funds are returned to the contributing users. (Not implemented in current version)

Any user can join and fund a project by sending Eth into the contract, specifying a project.

Once a project has been fully (or excessively) funded, the contract owner can execute the initiation of said project, and the funds will be deployed to the project address. (Not implemented in current version)

If the project is not funded by the threshold date, the funds can no longer be deployed to the project address and can only be returned to the funders originating addresses. (Not implemented in current version)

## Screencast link

TODO

## How to run this project locally

### Prerequisites

* Node.js >= v14
* Truffle and Ganache
* npm

### Contracts

* Start `ganache-cli` (project is configured to expect ganache running on port 8454, this can be changed in truffle-config.js)
* From the root directory;
  * use npm to install dependencies `npm install`
  * contract tests can be run with `truffle test`
  * the contract can be migrated with `truffle migrate`

### Front end

The front end for this project is a react-based web app in the front-end directory.
Carry out the following steps to run the front end.

* `cd front-end`
* `npm install`
* `npm start`
* Open `http://localhost:3000` in a metamask compatible browser

### Expected workflow

1. An ethereum address will propose a project using the `Add Project` page
2. A list of the projects can be viewed at the `Projects` page
3. Upon opening the accordian item for a project, the description will be viewable. There is also a button here that will take you to the dedicated project page to view more information. Click this button to navigate to the `Project` page
4. On the dedicated project page, you can view all the details of the project, including how much funding is required for the project.
5. On the dedicated project page, an address can fund the project with Ether using the input and button to send ether into the contract and apply it towards the project, do this now.
6. After the transaction has been confirmed, the current funding level of the project will be updated to reflect the sent funds.

### Additional future workflow (Not implemented in current version)

* After the block specified has been reached, the project will be cancelled and all accounts will be able to withdraw their sent funds. This will require tracking which accounts funded which project to be able to return funds.
* After the funding needed threshold has been reached, the proposer will have the ability to deploy the funds for the purpose of completing the project. This will require capturing the desired project address during project creation.

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
```

## Public Ethereum wallet for certification

`0xfAFC26F0Df9e7f201A2B4228F6eDE54d140ce289`