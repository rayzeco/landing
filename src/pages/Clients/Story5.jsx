import "./story-page.scss";

import React, { useEffect } from "react";

export default function Story5Page() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="clients-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Scaling your D365 ERP solution</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Optimizing data access performance for Microsoft Dynamics 365</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
            A prominent software publishing company specializing in mapping software for
        consumer electronics, commercial transportation, and education markets.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Situation: {'\u00A0'} </span>
            The client recently embraced a cloud-based ERP
            solution, leveraging Microsoft Dynamics 365 alongside Power BI for analytics and insights.
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            Their PowerBI analytics and reporting suite was very valuable.
            However, running PowerBI reports and quries directly degraded the performance of D365.
            A direct impact of this was that the client could not get accurate book-closes for month-end which was hampering their operations.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Identifying the Problem: {'\u00A0'} </span>
            We started the project with recreating & understanding the problem the client was facing. We had to create more observability within their run-time environments to pinpoint the problem.
             Based on our analysis, we concluded that the problem was the way in which PowerBI was implemented. It had direct access to the D365 datastore. We identified this as a choke point in the information flow.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Rayze Solution: {'\u00A0'} </span>
            To overcome this obstacle, we recommended and implemented Microsoft DataCONNECT, a pre-built data warehouse
        designed to extract data seamlessly from Dynamics 365 and other custom data sources. By directing PowerBI to DataCONNECT, we revolutionized the
        client's D365 experience. Near real time performant access to accurate D365 data with drill-down capabilities. All of this capability without degrading Dynamics 365
        performance.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            The implementation of DataCONNECT proved to be a game-changer for our client. With enhanced historical data
                    extraction from diverse sources, the client gained valuable insights for predicting sales and optimizing
                    customer service operations. Real-time access to ERP data became a reality, empowering users to make informed
                    decisions promptly.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Conclusion: {'\u00A0'} </span>
            The client was impressed with our engineering & D365 capabilities and enlisted us for their transformation project.
            We were retained to further implement Customer Service, and Field Service modules of D365.
            </p>
          </div>

        </div>
      </section>


    </div>
  );
}
