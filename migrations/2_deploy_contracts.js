var Estate = artifacts.require("./Estate.sol");

module.exports = function(deployer, network) {
  if (network == 'development') {
  	deployer.deploy(Estate, "Estate 1", "20000000000000000000", 864000, "200000000000000000");
    deployer.deploy(Estate, "Estate 2", "40000000000000000000", 864000, "250000000000000000");
  }
  if (network == 'kovan') {
    deployer.deploy(Estate, "Estate 1", "20000000000000000000", 864000, "200000000000000000");
  	deployer.deploy(Estate, "Estate 2", "40000000000000000000", 864000, "250000000000000000");
  }
};
