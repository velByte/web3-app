//https://eth-goerli.g.alchemy.com/v2/WN4dcMmACbTiUjbgy9RUV8bc2tv4r4-f

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/WN4dcMmACbTiUjbgy9RUV8bc2tv4r4-f",
      accounts: ["f8c6a1c4dfe4a2ac7021d441e46f05b93d12823155938b9a483b07139ee56ee4"]
    }
  }
};