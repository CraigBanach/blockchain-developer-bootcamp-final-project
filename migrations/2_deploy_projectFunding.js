const CouncilProjectFunding = artifacts.require("CouncilProjectFunding");

module.exports = function (deployer) {
  deployer.deploy(CouncilProjectFunding);
};
