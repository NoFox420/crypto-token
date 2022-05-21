import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

//receiving props from index.jsx and passing it to Faucet.jsx
function App(props) {
  return (
    <div id="screen">
      <Header />
      <Faucet userPrincipal={props.loggedInPrincipal} />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
