import { useState, useEffect } from "react";
import * as sdk from "@canton-network/dapp-sdk";

export function useConnect() {
  const [connectResult, setConnectResult] =
    useState<sdk.dappAPI.ConnectResult>();

  async function connect() {
    await sdk.connect().then(setConnectResult);
  }

  async function disconnect() {
    await sdk.disconnect();
    setConnectResult(undefined);
  }

  useEffect(() => {
    sdk
      .status()
      .then((s) => setConnectResult(s.connection))
      .catch(() => setConnectResult(undefined));
  }, []);

  useEffect(() => {
    if (connectResult?.isConnected) {
      const handler = (s: sdk.dappAPI.StatusEvent) =>
        setConnectResult(s.connection);
      sdk.onStatusChanged(handler);
      return () => {
        sdk.removeOnStatusChanged(handler);
      };
    }
  }, [connectResult]);

  return { connect, disconnect, connectResult };
}
