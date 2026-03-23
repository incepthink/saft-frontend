import { useState, useEffect } from "react";
import * as sdk from "@canton-network/dapp-sdk";

export function useAccounts(connectResult?: sdk.dappAPI.ConnectResult) {
  const [accounts, setAccounts] = useState<sdk.dappAPI.Wallet[]>();

  useEffect(() => {
    if (connectResult?.isConnected) {
      sdk.listAccounts().then(setAccounts);
    }
  }, [connectResult]);

  useEffect(() => {
    if (connectResult?.isConnected) {
      const listener = (event: sdk.dappAPI.AccountsChangedEvent) =>
        setAccounts(event);
      sdk.onAccountsChanged(listener);
      return () => {
        sdk.removeOnAccountsChanged(listener);
      };
    }
  }, [connectResult]);

  return accounts;
}
