import "./header.scss";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEthers, shortenAddress } from "@usedapp/core";
import WalletModal from "../../components/WalletModal/WalletModal";
import Web3 from 'web3'

import networks from '../../config/networks'

import config from '../../config/config.json'


export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showWalletButton, setShowWalletButton] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const location = useLocation();
  const { account, chainId, library, deactivate } = useEthers();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setShowWalletButton(true);
    }
  }, [location]);

  useEffect(() => {
    if(chainId !== undefined && chainId !== config.chainId) {
      changeNetwork()
    }
  }, [chainId]) //eslint-disable-line

  const changeNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(config.chainId) }]
      });
    } catch (switchError) {
      console.log("ErrorCode: ", switchError.code)
      if (switchError.code === 4902 || switchError.code === -32603) {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networks[config.chainId]]
        })
        .catch((error) => {
          console.log(error.code)
        })
      }
    }
  }

  const handleConnectWallet = () => {
    if(account) {
      deactivate()
    }
    else {
      setWalletModalOpen(true)
    }
  };

  return (
    <header id="header">
      <Link to="/" className="logo">
        <img src="/images/logo-text-white.svg" alt="logo" />
      </Link>
      <div
        className="top-menu"
        onClick={() => {
          if (showMenu) setShowMenu(false);
        }}
      >
        <div className={"menu-bg" + (showMenu === true ? " show" : "")}></div>
        <div
          className={"menu-button" + (showMenu === true ? " close" : "")}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <div className="line"></div>
        </div>
        <div className={"menu-list" + (showMenu === true ? " show" : "")}>
          <Link to={"/"}>Engagement</Link>
          <Link to={"/"}>Crowd Funding</Link>
          <Link to={"/"}>Share Ownership</Link>
          <Link to={"/"}>Utility Tokens</Link>
          <Link to={"/dashboard"}>Dashboard</Link>
          {showWalletButton === false ? (
            <a href="#app" className="launch-button">
              Launch Collection
            </a>
          ) : (
            <button
              className={"wallet-button " + (account ? 'connected' : '')}
              onClick={handleConnectWallet}
            >
              <img src="/images/wallet-account.svg" alt="wallet-account" />
              {account ? shortenAddress(account) : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
      <WalletModal
        isOpen={walletModalOpen}
        onRequestClose={() => setWalletModalOpen(false)}
      />
    </header>
  );
}
