import "./drop-rewards.scss";

import React, { useRef, useState } from "react";
import wallets from "./wallets.json";

export default function DropRewards() {
  const svgFileRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  const shortenWalletAddress = (wallet) => {
    return wallet.slice(0, 5) + "..." + wallet.slice(40, 42);
  };

  const handleUploadButtonClick = () => {
    console.log(svgFileRef);
    svgFileRef.current.click();
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  const handleFile = (files) => {
    alert("Number of files: " + files.length);
  };

  return (
    <section className="drop-rewards">
      <div className="container">
        <div className="title">Drop Rewards</div>
        <h3>Wallet Addresses</h3>
        <p>
          A comma separated list of wallets that will be dropped reward tokens.
        </p>

        <div className="drop-reward-form">
          <div className="address-list">
            <div className="content">
              {wallets.map((wallet, index) => (
                <div key={index}>{shortenWalletAddress(wallet)}</div>
              ))}
            </div>
          </div>
          <div className="reward-option">
            <h3>Amount</h3>
            <div className="input-group">
              <div className="input-wrapper">
                <input type={"number"} name="reward-amount" />
              </div>
              <button>Drop</button>
            </div>
          </div>
        </div>

        <h3>Upload Reward CSV</h3>
        <p>
          Upload your CSV file with reward wallet addresses. Download a template{" "}
          <a href="/">here.</a>
        </p>
        <div className="upload-option">
          <div className="upload-form" onDragEnter={handleDrag}>
            <input
              type="file"
              name="file"
              id="upload-file"
              ref={svgFileRef}
              onChange={handleChange}
            />

            <div className="left">
              <img src="/images/upload.svg" alt="upload" />
              <div>
                <p>Drag or drop file here</p>
                SVG
              </div>
            </div>
            <button onClick={handleUploadButtonClick}>Select File</button>
            {dragActive && (
              <div
                className="drop-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                Drop your file to upload
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
