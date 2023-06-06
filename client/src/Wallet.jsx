import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    
    if (privateKey) {
      const {
        data: { balance, address },
      } = await server.get(`balance/${privateKey}`);
      setBalance(balance);
      setAddress(address);
    } else {
      setBalance(0);
      setAddress("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="address">ADDRESS: {address}</div>
      <div className="balance">BALANCE: {balance}</div>
    </div>
  );
}

export default Wallet;