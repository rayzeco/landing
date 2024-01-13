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
            A leader in the growing  MicroMobility solutions market
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            Despite possessing a formidable sales engine and a robust presence in the US market, the challenge at hand was deciphering customer behavior for enhanced sales and sustained growth. The obstacle? A fragmented data strategy with disparate data stores, acting as a barrier to their ambitions.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze made a difference: {'\u00A0'} </span>
            Collaborating with the client, we engineered a cutting-edge data platform, revolutionizing our client's approach to data. From meticulous data ingestion and robust controls to efficient compute processes and insightful dashboards, our tailor-made solution equipped the client with the tools needed to dissect and interconnect customer data, provide strategic product recommendations, and empower their Data Scientist teams.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            The implementation of our innovative data solution has empowered our client to become self-sufficient. Their Data Scientists and business analysts now leverage the data platform for in-depth analysis, predictive modeling, and steering sales growth. With a unified data strategy at the helm, our client is poised for sustained success and leadership in the dynamic MicroMobility solutions market.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Key Achievements: {'\u00A0'} </span>
              <p><strong>Unified Data Strategy:</strong> We seamlessly integrated fragmented data sources into a sophisticated cloud-based data store, eradicating data silos and fostering seamless connectivity.</p>
              <p><strong>Standardized Operations:</strong> Through rigorously standardized data sourcing services, transformation processes, and efficient compute engines, we ensured a harmonized and reliable data operation.</p>
              <p><strong>End-to-End Automation:</strong> Our robust orchestration engine automated intricate service dependencies, ensuring a streamlined and efficient data workflow.</p>
              <p><strong>Collaborative Synergy:</strong> We worked in close collaboration with the client's engineering, product, and data science teams, fostering a partnership built on shared expertise and mutual success.</p>
            </p>
          </div>

        </div>
      </section>


    </div>
  );
}
