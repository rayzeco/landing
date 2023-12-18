import "./clients-page.scss";

import React, { useEffect } from "react";

export default function ClientsPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="clients-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Our Clients</pre>
          <div className="top">
            <div className="left">
              <h1>
              <p>Our clients have big ambitions.</p>

              <p>We know staying ahead means embracing constant digital transformation and modernizing legacy systems.</p>
              Navigating the complexities of infrastructure, skills, and processes is our forte. That's where we step in.
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
