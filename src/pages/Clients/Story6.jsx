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
        <pre className="title">Powering a retailer with ERP</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Enabling a retailers expansion plans with ERP implementation</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
             is a retail savings club that provides their members with the lowest prices on thousands of products & brands
              in the home and lifestyle sector. The client’s customers (‘members’) pay an annual fee
              which entitles them to buy products at a deep discount price.
              The client has a strong ecommerce presence and also has 117 brick-n-mortar stores in 50 states.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            The client had ambitious plans, however their current ERP system (Oracle JD Edwards) had several technical limitations which constrained the client to build
             a more compelling membership offering and international expansion into Europe.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Identifying the Problem: {'\u00A0'} </span>
            We started by understanding why the current solution was inadequte. In turned out that the current implementation of the ERP solution had limitations
            on how many joins were performed across multiple datasets. Based on our analysis, we conculded the best path forward given
            the time-to-market constraints & cost constraints. We jointly agreed that the most optimal course of action was to upgrade to the EnterpriseOne 9.2 version.
            This had significant improvements & several limitations had been addressed.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Rayze Solution: {'\u00A0'} </span>
            Partnering with the client, we came up with a scope, a project plan with milestones and working deliverables, 8 proof-of-concepts as well as several opportunities for improvements with cost/benefits. We partnered with the clients on building developer-ready business requirements and implemented and improved several areas including sales order, advanced pricing, purchasing, and inventory management. We worked in an agile framework with the Product Owner and Technical lead in the US and a pod of 9 engineers in India. Post Go Live, we re-shaped the pod for ongoing maintenance & support.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            The work we performed was instrumental in the client’s expansion to Europe. Over the following year, they gained considerable momentum & grew the franchise to 12 locations in Europe. They now have a significant portion of their revenues generated out of the region.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Conclusion: {'\u00A0'} </span>
            This work enabled us to gain trust with the client & demonstrate our practical approach to engineering solutions. We were able to be their trusted partner for several future projects.
            </p>
          </div>

        </div>
      </section>


    </div>
  );
}
