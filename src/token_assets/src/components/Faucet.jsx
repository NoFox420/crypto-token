import React, { useState } from "react";
import { canisterID, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Gimme gimme");

  async function handleClick(event) {
    //disabling the button after pressing
    setDisable(true);

    //create client
    const authClient = await AuthClient.create();
    //get identity of authenticated user
    const identity = await authClient.getIdentity();
    //create actor with identity
    const authenticatedCanister = createActor(canisterID, {
      //option object for createActor
      agentOptions: {
        identity,
      },
    });

    //calling payOut from main.mo for the authenticated user
    const result = await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DAngela tokens here! Claim 10,000 DANG coins to
        {props.userPrincipal}.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
