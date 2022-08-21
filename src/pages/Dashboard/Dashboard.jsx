import "./dashboard.scss";

import React, { useEffect, useState } from "react";
import NumberEasing from "react-number-easing";
import CollectionTable from "../../components/CollectionTable/CollectionTable";
import DropRewards from "../../components/DropRewards/DropRewards";
import HolderWallets from "../../components/HolderWallets/HolderWallets";

export default function Dashboard() {
  const [collectionCnt, setCollectionCnt] = useState(0);
  const [listedNFTCnt, setListedNFTCnt] = useState(0);
  const [soldNFTCnt, setSoldNFTCnt] = useState(0);
  const [uniqueUsersCnt, setUniqueUsersCnt] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCollectionCnt(3);
      setListedNFTCnt(400);
      setSoldNFTCnt(36);
      setUniqueUsersCnt(19);
    }, 1000);
  }, []);

  return (
    <div className="dashboard">
      <div className="banner">
        <div className="container">
          <div className="title">Management Dashboard</div>
          <div className="breadcrumbs">
            <div>Collection Management</div>
            <img src="/images/right-arrow.svg" alt="right arrow" />
            <div>
              <strong>Management Dashboard</strong>
            </div>
          </div>
          <a href="/" target={"_blank"}>
            <img src="/images/chain.svg" alt="chain" />
          </a>
        </div>
      </div>

      <div className="dashboard-info">
        <img src="/images/circle1.svg" alt="circle1" className="circld1" />
        <div className="container">
          <div className="info-item">
            <p className="width1">Number Of Collections</p>
            <div>
              <NumberEasing value={collectionCnt} decimals={0} ease="quintInOut" />
            </div>
          </div>

          <div className="line"></div>
          <div className="info-item">
            <p className="width2">NFTs Listed</p>
            <div className="info-item-number">
              <NumberEasing value={listedNFTCnt} decimals={0} ease="quintInOut" />
            </div>
          </div>

          <div className="line"></div>
          <div className="info-item">
            <p className="width2">NFTs Sold</p>
            <div>
              <NumberEasing value={soldNFTCnt} decimals={0} ease="quintInOut" />
            </div>
          </div>

          <div className="line"></div>
          <div className="info-item">
            <p className="width1">Unique Users</p>
            <div>
              <NumberEasing value={uniqueUsersCnt} decimals={0} ease="quintInOut" />
            </div>
          </div>
        </div>
      </div>

      <section className="your-collections">
        <div className="container">
          <div className="title">Your Collections</div>
          <div className="table">
            <CollectionTable />
          </div>
        </div>
      </section>

      <DropRewards />

      <HolderWallets />
    </div>
  );
}
