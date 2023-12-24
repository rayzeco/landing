import "./accel-page.scss";

import React, { useEffect } from "react";

export default function AccelPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="accel-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Accelerators</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Fast Track your engineering.</span></h1>
          We have a pre-built repository of developer productivity tools, cloud engineering accelerators & integration templates which fast tracks your IT deliveries.
              <h1></h1><h2><span style={{ color: '#00FFB3' }}>Our Accelerators:</span></h2>


          </div>
          <div className="bottom">
            <div>
              <h4>Platform Modernization</h4>
              <p>Evolve your organization with pragmatic strategies & technology levers that increase your agility, resilience and ability to compete.</p>
              <p><span style={{ color: '#00FFB3' }}>{'>>>  '}</span>Read this client story</p>

            </div>
            <div>
              <h4>Cashflow Management</h4>
              <p>Modernize your technology platforms, development and delivery practices to deliver business value faster.</p>
              <p><span style={{ color: '#00FFB3' }}>{'>>>  '}</span>Read this client story</p>

            </div>
            <div>
              <h4>Real time decision making</h4>
              <p>Drive business growth and enable better decision making with pragmatic data foundations and unrivalled skill sets in AI and ML.</p>
              <p><span style={{ color: '#00FFB3' }}>{'>>>  '}</span>Read this client story</p>

            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
