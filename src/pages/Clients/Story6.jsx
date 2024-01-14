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
          <h1><span style={{ color: '#00FFB3' }}>Enabling a retailers expansion plans</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
             A high fashion & lifestyle retailer that offers luxury designer items at discounted prices. The client offers
              its customers flash sales where a limited number of designer items are marked at a deep discount for a few hours.
               The client’s customers (‘members’) pay an annual fee for value added services such as free shipping. The client has a
               strong ecommerce presence and also has 53 brick-n-mortar stores across the US.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            The client had ambitious expansion plans. They were planning to expand into housewares, travel and experiences.
            The challenge was that they were constrained by their current ERP system (Oracle JD Edwards) which had several technical limitations
            and was unable to deal with additional complexity.
          
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Identifying the Problem: {'\u00A0'} </span>
            We started by understanding why the current solution was inadequte. In turned out that the current implementation of the ERP solution had limitations
            on how many joins were performed across multiple datasets. We performed a few POCs (Proof-of-Concepts) to validate our understanding as well as test our proposed solution.
            We conculded the best path forward given the client's time-to-market requirements & cost constraints was to upgrade the ERP to the EnterpriseOne 9.2 version.
            Based on our POC testing, the new version had significant improvements & several limitations had been addressed.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Rayze Solution: {'\u00A0'} </span>
            Partnering with the client, we came up with a scope, an execution plan with work items, milestones and working deliverable releases. In addition, we suggested several opportunities for improvements with cost/benefits.
            We partnered with the clients on building developer-ready business requirements and implemented and improved several areas including sales order, advanced pricing, purchasing, and inventory management.
            We worked in an agile framework with the Product Owner and Technical lead in the US and a pod of 9 engineers in India. Post Go Live, we re-shaped the pod for ongoing maintenance & support.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            The work we performed was instrumental in the client’s expansion into travel and other segments. Over the following year, they gained considerable momentum with the new segments.
            They now have a significant portion of their revenues generated from the newly introduced segments.
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
