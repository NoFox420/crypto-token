import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [inputValue, setInput] = useState("");
  const [balanceResult, SetBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    //converting the inputed value to principal
    const principal = Principal.fromText(inputValue);

    //calling balanceOf from main.mo
    const balance = await token.balanceOf(principal);
    SetBalance(balance.toLocaleString());

    //adding token symbol
    setSymbol(await token.getSymbol());

    //unhide <p/> when checking balance
    setHidden(false);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>
        This account has a balance of {balanceResult} {cryptoSymbol}.
      </p>
    </div>
  );
}

export default Balance;
