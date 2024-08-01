// Libs = bip32 , bip39 and bitcoinjs
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
// Define the web or network
// The .testnet is the Test area
// The principal is the .bitcoin
const network = bitcoin.networks.testnet
// Derivation of HD(hierarquical derivation) wallet
const path = `m/49'/1'/0'/0` // Use m/49'/1'/0'/0 for testnet
// Create a mnemonic for the Seed ( Pass words )
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
//Create root of HD wallet.
let root = bip32.fromSeed(seed, network)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address
console.log("Carteira gerada.")
console.log(`Endereço: ${btcAddress}`)
console.log(`Chave privada: ${node.toWIF()}`)
console.log(`Seed: ${mnemonic}`)