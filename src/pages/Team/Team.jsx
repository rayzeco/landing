import "./team-page.scss";

import React, { useEffect } from "react";

export default function TeamPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="team-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Who we are</pre>
          <div className="top">
            <div className="left">
              <h1><p>We are all about our people.</p>
              <p>We empower our team, practice continous learning, and create positive impacts wherever we operate. This ensures our clients succeed in their goals.</p>
              Let's introduce you to the leadership team.
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
