const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");


app.use(cors());
app.use(express.json());

const balances = {
  "d207ab4ee522358371bcc64236584b0ade19eecc": 100,
  "63bf58b98bb187ffbfa4bf5b1546e63b320fbe55": 50,
  "9f723adb835914948b7763c11c166341448ac83a": 75,
};

const privateKeys = {
  "e351710be6cd4b6d5e0c7f8f0b2a73f74304a0bc7b155c6321d5d02a029bfa3c": "d207ab4ee522358371bcc64236584b0ade19eecc",
  "2da2b153e513425755430755f38614c0c069bb3e346163c3c8e79aba7c8235a8": "63bf58b98bb187ffbfa4bf5b1546e63b320fbe55",
  "38fad48e7c86acf8dd61d85238762a9c0ec977b7be7dd2caa6d9227e752668e7": "9f723adb835914948b7763c11c166341448ac83a"
}

app.get("/balance/:privateKey", (req, res) => {
  const { privateKey } = req.params;
  const address = privateKeys[privateKey] || 0;
  const balance = balances[address] || 0;
  res.send({ balance, address });
});

app.post("/send", async (req, res) => {

  try {

  const { signature, hexMessage, recoveryBit, sender, recipient, amount } = req.body;

  // get signature, hash and recovery bit from client-sideand recover the address from signature

  const signaturePublicKey = secp.recoverPublicKey(hexMessage, signature, recoveryBit);
  const signatureAddressUint= keccak256(signaturePublicKey.slice(1)).slice(-20);
  const signatureAddress = toHex(signatureAddressUint);
  

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  else if (signatureAddress !== sender) {
    res.status(400).send({message: "You are not the owner!"})
  }
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
} catch(error){
  console.log(error);
}
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
