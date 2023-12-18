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
            <div className="left">
              <h1>We have built a repository of developer productivity tools & integration modules which fast tracks your IT deliveries.
              </h1>
            </div>
          </div>
          <div className="bottom">
            <div>
              <h4>Strategy</h4>
              <p>Evolve your organization with pragmatic strategies & technology levers that increase your agility, resilience and ability to compete.</p>
            </div>
            <div>
              <h4>Engineering</h4>
              <p>Modernize your technology platforms, development and delivery practices to deliver business value faster.</p>
            </div>
            <div>
              <h4>Data & AI</h4>
              <p>Drive business growth and enable better decision making with pragmatic data foundations and unrivalled skill sets in AI and ML.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
