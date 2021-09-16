# Council-Project-Funding

## Introduction

This final project will allow users to propose projects (of any kind) with an Ethereum address.
A project should have a description, outlining its purpose.
A project must have an funding Threshold, to be triggered. 
A project must have a threshold date, after which funds are returned to the contributing users.

Any user can join and fund a project by sending Eth into the contract, specifying a project. This causes them to become part of the project's council.

Once a project has been fully (or excessively) funded, either the proposer, or a quorum of council members (weighted by contibutions) can execute the initiation of said project, and the funds will be deployed to the project address.

If the project is not funded by the threshold date, the funds can no longer be deployed to the project address and can only be returned to the council members' originating addresses.