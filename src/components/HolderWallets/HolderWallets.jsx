import "./holder-wallets.scss";

import React from "react";
import holders from "./holders.json";
import Papa from "papaparse";

export default function HolderWallets() {
  const handleDownloadCSV = () => {
    let csvContent = Papa.unparse(holders, { header: true });
    
    let fileName = "NFT Holder Wallet.csv";
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="holder-wallets">
      <div className="container">
        <div className="title">NFT Holder Wallet</div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {Object.keys(holders[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holders.map((info, index) => (
                <tr key={index}>
                  <td className="bold">{info["User Wallet Address"]}</td>
                  <td>{info["#Collection Name"]}</td>
                  <td>{info["# of NFTs Minted"]}</td>
                  <td>{info["Total Rewards"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-wrapper">
          <button onClick={handleDownloadCSV}>Download CSV file</button>
        </div>
      </div>
    </section>
  );
}
