const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "front-end/src/contracts"),
  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  db: {
    enabled: false
  }
};
