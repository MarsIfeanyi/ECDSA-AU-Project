const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

// generating random private Keys
const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("private key:", toHex(privateKey));

// Hint: When you run this command it will generate the above private Key on the console...   node scripts/generate.js

// Getting the  Public Keys from the private key
const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log("public Key:", toHex(publicKey));
