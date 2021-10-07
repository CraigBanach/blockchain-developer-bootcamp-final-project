// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract CouncilProjectFunding {
  
  struct Project {
    uint id;
    string name;
    string description;
    uint fundingNeeded;
    uint currentFundLevel;
    uint thresholdBlock;
    mapping (address => uint) funders;
  }

  mapping (uint => Project) public projects;

  function fundProject(uint projectId) public payable returns (bool success) {

  }

  function deployProjectFunds(uint projectId) public returns (bool success) {

  }

  function canDeployFunds(uint projectId) public returns (bool canDeploy) {

  }

  function retrieveUnusedFunds(uint projectId) public returns (bool success) {

  }
}
