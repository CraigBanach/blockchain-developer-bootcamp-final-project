// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract CouncilProjectFunding {
  
  mapping(uint => Project) public projects;
  uint public projectCount;

  struct Project {
    uint id;
    string name;
    string description;
    uint fundingNeeded;
    uint currentFundLevel;
    uint thresholdBlock;
  }

  modifier stringNotEmpty(string calldata str) {
    require(bytes(str).length != 0);
    _;
  }

  modifier uintGreaterThanZero(uint num) {
    require(num > 0);
    _;
  }

  function addProject(
    string calldata name,
    string calldata description,
    uint fundingNeeded,
    uint thresholdBlock
  ) public 
    stringNotEmpty(name) 
    stringNotEmpty(description) 
    uintGreaterThanZero(fundingNeeded)
    uintGreaterThanZero(thresholdBlock) 
    returns (bool success) 
  {
    projects[projectCount] = Project(
      projectCount,
      name,
      description,
      fundingNeeded,
      0,
      thresholdBlock
    );
    projectCount++;
    return true;
  }

  function fundProject(uint projectId) public payable returns (bool success) {
    require(projectId < projectCount, "The supplied project has not been created");

    projects[projectId].currentFundLevel += msg.value;

    return true;
  }

  function deployProjectFunds(uint projectId) public returns (bool success) {

  }

  function canDeployFunds(uint projectId) public returns (bool canDeploy) {

  }

  function retrieveUnusedFunds(uint projectId) public returns (bool success) {

  }
}
