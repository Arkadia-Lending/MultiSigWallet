const MultisigWalletWithDailyLimit = artifacts.require('MultiSigWalletWithDailyLimit.sol')
const MultisigWalletWithoutDailyLimit = artifacts.require('MultiSigWallet.sol')
const MultisigWalletFactory = artifacts.require('MultiSigWalletWithDailyLimitFactory.sol')

module.exports = deployer => {
  const args = process.argv.slice()
  if (process.env.DEPLOY_FACTORY) {
    deployer.deploy(MultisigWalletFactory)
    console.log("Factory with Daily Limit deployed")
  } else if (args[3] == 'noLimit') {
    deployer.deploy(MultisigWalletWithoutDailyLimit, args[4].split(","), args[5])
    console.log("Wallet with no daily limit deployed")
  } else if (args[3] == 'withLimit') {
    deployer.deploy(MultisigWalletWithDailyLimit, args[4].split(","), args[5], args[6])
    console.log("Wallet with Daily Limit deployed")
  } else {
    console.error("Multisig with daily limit requires to pass owner " +
                  "list, required confirmations and daily limit")
  }
}
