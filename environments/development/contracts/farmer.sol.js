// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"reasonGiven","type":"string"}],"name":"breach","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"success","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"farmer","type":"address"}],"name":"setPeople","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"max","type":"int256"},{"name":"min","type":"int256"}],"name":"setTemperature","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"dispute","type":"address"}],"name":"setContract","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"temperature","type":"int256"}],"name":"insurance","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"reason","outputs":[{"name":"","type":"string"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"max","type":"int256"},{"indexed":false,"name":"min","type":"int256"}],"name":"_setTemperature","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"farmer","type":"address"}],"name":"_setPeople","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"dispute","type":"address"}],"name":"_setContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"temperature","type":"int256"}],"name":"_insurance","type":"event"},{"anonymous":false,"inputs":[],"name":"_success","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reasonGiven","type":"string"}],"name":"_breach","type":"event"}],
    binary: "60606040526005805460a060020a60ff02191690556104cb806100226000396000f3606060405236156100615760e060020a600035046303a0e24581146100635780630b93381b146101315780632647d56a14610176578063327ab26a1461019f57806375f890ab146101ce578063a5770ac6146101f4578063e134e33d14610265575b005b6040805160206004803580820135601f81018490048402850184019095528484526102c59491936024939092918401919081908401838280828437509496505050505050505b60408051602081019091526000815260055460a060020a900460ff1615610366578160046000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061036b57805160ff19168380011785555b5061039b9291505b80821115610423576000815560010161011d565b61006160005433600160a060020a039081169116141561017457600154604051600160a060020a039182169160009130909116319082818181858883f150505050505b565b6100616004356000805473ffffffffffffffffffffffffffffffffffffffff1916331790555b50565b61006160043560243560005433600160a060020a03908116911614156101ca57600282905560038190555b5050565b6005805473ffffffffffffffffffffffffffffffffffffffff1916600435179055610061565b610061600435600254811315610427576005805474ff0000000000000000000000000000000000000000191660a060020a17905560408051808201909152601e81527f657865656465642061636365707461626c652074656d706572617475726500006020820152610492906100a9565b6102c560048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281529291908301828280156104c35780601f10610498576101008083540402835291602001916104c3565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b81548152906001019060200180831161034157829003601f168201915b505050505090505b919050565b82800160010185558215610115579182015b8281111561011557825182600050559160200191906001019061037d565b5050600554604051600160a060020a039182169160009130909116319082818181858883f150506004805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152955091935090915083018282801561035e5780601f106103335761010080835404028352916020019161035e565b5090565b60035481121561019c576005805474ff0000000000000000000000000000000000000000191660a060020a17905560408051808201909152601c81527f42656c6f772061636365707461626c652074656d70657261747572650000000060208201526101ca906100a9565b5061019c565b820191906000526020600020905b8154815290600101906020018083116104a657829003601f168201915b50505050508156",
    unlinked_binary: "60606040526005805460a060020a60ff02191690556104cb806100226000396000f3606060405236156100615760e060020a600035046303a0e24581146100635780630b93381b146101315780632647d56a14610176578063327ab26a1461019f57806375f890ab146101ce578063a5770ac6146101f4578063e134e33d14610265575b005b6040805160206004803580820135601f81018490048402850184019095528484526102c59491936024939092918401919081908401838280828437509496505050505050505b60408051602081019091526000815260055460a060020a900460ff1615610366578160046000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061036b57805160ff19168380011785555b5061039b9291505b80821115610423576000815560010161011d565b61006160005433600160a060020a039081169116141561017457600154604051600160a060020a039182169160009130909116319082818181858883f150505050505b565b6100616004356000805473ffffffffffffffffffffffffffffffffffffffff1916331790555b50565b61006160043560243560005433600160a060020a03908116911614156101ca57600282905560038190555b5050565b6005805473ffffffffffffffffffffffffffffffffffffffff1916600435179055610061565b610061600435600254811315610427576005805474ff0000000000000000000000000000000000000000191660a060020a17905560408051808201909152601e81527f657865656465642061636365707461626c652074656d706572617475726500006020820152610492906100a9565b6102c560048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281529291908301828280156104c35780601f10610498576101008083540402835291602001916104c3565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b81548152906001019060200180831161034157829003601f168201915b505050505090505b919050565b82800160010185558215610115579182015b8281111561011557825182600050559160200191906001019061037d565b5050600554604051600160a060020a039182169160009130909116319082818181858883f150506004805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152955091935090915083018282801561035e5780601f106103335761010080835404028352916020019161035e565b5090565b60035481121561019c576005805474ff0000000000000000000000000000000000000000191660a060020a17905560408051808201909152601c81527f42656c6f772061636365707461626c652074656d70657261747572650000000060208201526101ca906100a9565b5061019c565b820191906000526020600020905b8154815290600101906020018083116104a657829003601f168201915b50505050508156",
    address: "",
    generated_with: "2.0.9",
    contract_name: "farmer"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("farmer error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("farmer error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("farmer error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("farmer error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.farmer = Contract;
  }

})();