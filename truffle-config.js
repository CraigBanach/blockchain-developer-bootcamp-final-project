require('dotenv').config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = process.env.GOERLI_MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "front-end/src/contracts"),
  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
    goerli: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicPhrase
        },
        providerOrUrl: 'https://goerli.infura.io/v3/1f8dfa07703241868d0ef130d8cb9f64'
      }),
      network_id: '5',
      gas: 4465030,
      gasPrice: 10000000000,
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
