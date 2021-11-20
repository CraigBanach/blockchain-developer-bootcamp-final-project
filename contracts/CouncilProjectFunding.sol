// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// @title Contract to propose and fund projects of any kind
/// @author Craig Banach https://github.com/CraigBanach
/// @notice Allows any Ethereum address to propose or fund a project
/// @dev Contract is current a WIP and not all desired functionality is implemented
contract CouncilProjectFunding {
  
  /// @notice A mapping of the proposed projects
  mapping(uint => Project) public projects;

  /// @notice The current number of proposed projects
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

  modifier projectExists(uint id) {
    require(id < projectCount, "The supplied project has not been created");
    _;
  }

  /// @notice Propose a new project you wish to accomplish
  /// @dev Currently the project address is not captured, this will be done in future development
  /// @param name The name for the project
  /// @param description A basic description of what the project is attempting to accomplish
  /// @param fundingNeeded The amout of Eth requried for the project to be started
  /// @param thresholdBlock The final block at which the project funds can be deployed. After this block, the project is considered cancelled and users will be able to withdraw their funds
  /// @param success a boolean indicating if the function ran successfully
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

  /// @notice Add funds to a proposed project
  /// @dev Currently this does not check if the project is cancelled or completed and does not track which addresses funded the contract
  /// @param projectId The id of the project you wish to fund
  /// @param success a boolean indicating if the function ran successfully
  function fundProject(uint projectId) public payable 
  projectExists(projectId)
  returns (bool success) {
    projects[projectId].currentFundLevel += msg.value;

    return true;
  }

  /// @notice Deploys the project funds to the project address if successfully funded and before the threshold block
  function deployProjectFunds(uint projectId)
  projectExists(projectId)
  public returns (bool success) {
    // TODO: Check if canDeployFunds()
    // TODO: Send funds to project address
  }

  /// @notice Checks if the supplied project's funds can be deployed
  /// @dev Should check if the funding threshold is reached and if the threshold block is not reached
  function canDeployFunds(uint projectId) private returns (bool canDeploy) {
    // TODO
  }

  /// @notice Allows a user to reclaim their funds if the project is cancelled
  /// @dev Should check if the threshold block has been breached
  function retrieveUnusedFunds(uint projectId) public 
  projectExists(projectId)
  returns (bool success) {
    // TODO
  }
}
