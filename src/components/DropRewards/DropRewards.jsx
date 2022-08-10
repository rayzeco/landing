import './drop-rewards.scss'

import React from "react";
import wallets from './wallets.json'

export default function DropRewards() {

  const shortenWalletAddress = wallet => {
    return wallet.slice(0, 5) + '...' + wallet.slice(40, 42);
  }

  return (
    <section className="drop-rewards">
      <div className="container">
        <div className="title">Drop Rewards</div>
        <h3>Wallet Addresses</h3>
        <p>A comma separated list of wallets that will be dropped reward tokens.</p>

        <div className='drop-reward-form'>
          <div className='address-list'>
            <div className='content'>
            {
              wallets.map((wallet, index) => (
                <div key={index}>{shortenWalletAddress(wallet)}</div>
              ))
            }
            </div>
          </div>
          <div className='reward-option'>
            <h3>Amount</h3>
            <div className='input-group'>
              <div className='input-wrapper'>
                <input type={'number'} name='reward-amount' />
              </div>
              <button>Drop</button>
            </div>
          </div>
        </div>

        <h3>Upload Reward CSV</h3>
        <p>Upload your CSV file with reward wallet addresses. Download a template <a href="/">here.</a></p>
        <div className=''></div>
      </div>
    </section>
  );
}
