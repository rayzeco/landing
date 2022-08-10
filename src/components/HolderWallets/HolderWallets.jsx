import "./holder-wallets.scss";

import React from "react";

export default function HolderWallets() {
  return (
    <section className="holder-wallets">
      <div className="container">
        <div className="title">NFT Holder Wallet</div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User Wallet Address</th>
                <th>#Collection Name</th>
                <th># of NFTs Minted </th>
                <th>Total Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bold">wallet_10</td>
                <td>aa</td>
                <td>1</td>
                <td>5</td>
              </tr>
              <tr>
                <td className="bold">wallet_7</td>
                <td>BB</td>
                <td>3</td>
                <td>15</td>
              </tr>
              <tr>
                <td className="bold">wallet_11</td>
                <td>cc</td>
                <td>2</td>
                <td>10</td>
              </tr>
              <tr>
                <td className="bold">wallet_16</td>
                <td>dd</td>
                <td>2</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-wrapper">
          <button>Download CSV file</button>
        </div>
      </div>
    </section>
  );
}
