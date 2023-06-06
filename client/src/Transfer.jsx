import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [hexMessage, setHexMessage] = useState("");


  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function signHash() {
    try{
      const transactionMessage = {
        sender: privateKey,
        amount: parseInt(sendAmount),
        recipient: recipient
      }

      
      const hexMessage = toHex(keccak256(utf8ToBytes(JSON.stringify(transactionMessage))));
      setHexMessage(hexMessage);

      const signatureArray = await secp.sign(hexMessage, privateKey, {recovered: true});
      const signature = toHex(signatureArray[0]);
      setSignature(signature);

      const recoveryBit = signatureArray[1];
      setRecoveryBit(recoveryBit);

    } catch (error){
      console.log(error);
      alert(error);
    }

  }

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        recoveryBit,
        hexMessage
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send a Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="Type the amount you wish to transfer"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type the recipient's address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="button" className="button" value="Sign transaction" onClick={signHash}></input>

      <div className="info">Signature: {signature} </div>
      <div className="info">Recovery Bit: {recoveryBit} </div>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;