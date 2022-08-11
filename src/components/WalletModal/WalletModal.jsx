import './wallet-modal.scss'

import React from "react";
import ReactModal from "react-modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useEthers } from '@usedapp/core'

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(70, 70, 70, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    border: "none",
    background: "black",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    padding: "20px",
    width: "96%",
    maxWidth: "400px",
    borderRadius: 0,
    inset: "0",
  },
};

export default function WalletModal({ isOpen, onRequestClose }) {

  const { activate, activateBrowserWallet } = useEthers()

  const handleConnectMetamask = () => {
    onRequestClose()
    activateBrowserWallet()
  }

  const handleConnectWalletConnect = async () => {
    onRequestClose()
    try {
      const provider = new WalletConnectProvider({
        infuraId: '62687d1a985d4508b2b7a24827551934',
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
    >
      <div className="wallet-modal">
        <h1>Connect Wallet</h1>
        <div className="wallet-buttons">
          <button onClick={handleConnectMetamask}>
            <img src="/images/metamask.svg" alt="metamask" />
            <p>Metamask</p>
          </button>
          <button onClick={handleConnectWalletConnect}>
            <img src="/images/wallet-connect.svg" alt="wallet-connect" />
            <p>Wallet Connect</p>
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
