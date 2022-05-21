import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  //creating a new AuthClient object to login user
  const authClient = await AuthClient.create();

  //wait and check if authClient is authenticated (bypass)
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    //if not authenticated
    await authClient.login({
      //passing in an object with identity provider providing frontent login content
      identityProvider: "https://identity.ic0.app/#authorize",
      //what happens if login successfull
      onSuccess: () => {
        handleAuthenticated(authClient);
      },
    });
  }
};

//redirecting user if authenticated true
async function handleAuthenticated(authClient) {
  //identity of authenticated user
  const identity = await authClient.getIdentity();
  //user principal of authenticated user
  const userPrincipal = identity._principal.toString();

  ReactDOM.render(
    //passing userPrincipal to App.jsx as a prop
    <App loggedInPrincipal={userPrincipal} />,
    document.getElementById("root")
  );
}

init();
