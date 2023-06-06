const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex } = require ("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log(toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log(toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-20);
console.log(toHex(address));
