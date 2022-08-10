import "./collection-table.scss";

import React from "react";

export default function CollectionTable() {
  return (
    <table className="collection-table">
      <thead>
        <tr>
          <th>Collection</th>
          <th>Sales (All Time)</th>
          <th>#NFTs Sold</th>
          <th>Avg Price</th>
          <th>Total Supply</th>
          <th>Unique Owners</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="collection-name">
              <div className="collection-image"></div>
              Bull_1
            </div>
          </td>
          <td>25</td>
          <td>25</td>
          <td>1.0</td>
          <td>100</td>
          <td>20</td>
          <td>
            <button>Withdraw ETH</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
