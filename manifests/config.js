module.exports.config = {
  mainnet: {
    dataSources: [],
    templates: [],
  },
  kovan: {
    dataSources: [],
    templates: [],
  },
  xdai: {
    dataSources: [],
    templates: [],
  },
  rinkeby: {
    dataSources: [
      {
        name: "nftSale",
        template: "nftSale-ds.yaml",
        address: "0xc0BC16c09b2Bf8AACe917c897A00751f6f798590",
        startBlock: 9059333,
      },
    ],
    templates: [],
  },
  matic: {
    dataSources: [],
    templates: [],
  },
};
