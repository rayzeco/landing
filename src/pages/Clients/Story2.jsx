import "./clients-page.scss";

import React, { useEffect } from "react";

export default function Story2Page() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="clients-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Win with Data & AI</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Harness data technologies & AI to increase sales</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
            A top player in the growing  MicroMobility solutions market
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Ask: {'\u00A0'} </span>
            The client had big ambitions to expand in the fast-growing micromobility market. They had a robust sales engine, and a strong US presence, but wanted to understand customer behavior to make inroads & improve sales. The client had a fragmented data strategy with several data stores which were disjointed. This was a big impediment towards their growth ambitions
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            A modern data platform with data ingestion, controls, compute, dashboard which enabled the client to dissect & connect customer data, provide recommendations on products & marketing strategies, and enabling their Data Scientist teams. Rayze enabled the client to achieve their growth ambitions
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze helped: {'\u00A0'} </span>
            Unifying the client’s disparate data sources into a cloud based data store. We helped standardized data sourcing services, transformation services, and compute engines. End-End automation achieved by an orchestration engine orchestrated the complex service dependencies. 
            Rayze collaborated with the client’s engineering, product & data science teams. The end result is that the client is now self-sufficient. Their own data scientists & business analysts rely on the data platform for analyzing, predicting and growing sales.
            </p>
          </div>
          
        </div>
      </section>


    </div>
  );
}
