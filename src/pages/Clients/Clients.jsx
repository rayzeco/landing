import "./clients-page.scss";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";


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
          <h1><span style={{ color: '#00FFB3' }}>Our clients have big ambitions.</span></h1>
              We know staying ahead means embracing constant digital transformation and modernizing legacy systems.
              Navigating the complexities of infrastructure, skills, and processes is our forte. That's where we step in.
              <h1></h1><h2><span style={{ color: '#00FFB3' }}>Our Client Stories:</span></h2>


          </div>
          <div className="bottom">
            <div>
              <h4>Technology Modernization</h4>
              <p>Modernize your technology platforms, development and delivery practices to deliver business value faster.</p>
              <h1></h1>
              <p>
                <Link to='/story1'>
                <span style={{ color: '#00FFB3' }}>{'>>>'} {'\u00A0'} Read this client story </span>
                </Link>
              </p>

            </div>
            <div>
              <h4>Win with Data & AI</h4>
              <p>Harness the power of data and artificial intelligence (AI) to solve your toughest business challenges in innovative ways.</p>
              <h1></h1>
              <p>
                <Link to='/story2'>
                <span style={{ color: '#00FFB3' }}>{'>>>'} {'\u00A0'} Read this client story </span>
                </Link>
              </p>

            </div>
            <div>
              <h4>Build Strategic offshore talent</h4>
              <p>Increase productivity by strategically offshoring applications & enriching your teams with top offshore engineering talent.</p>
              <h1></h1>
              <p>
                <Link to='/story4'>
                <span style={{ color: '#00FFB3' }}>{'>>>'} {'\u00A0'} Read this client story </span>
                </Link>
              </p>
            </div>

          </div>
          <div className="bottom">
          <div>
              <h4>Democrataize Data Science</h4>
              <p>Slash your ML Costs by streamlining your ML Operations and enhance your predictions. </p>
              <h1></h1>
              <p>
                <Link to='/story3'>
                <span style={{ color: '#00FFB3' }}>{'>>>'} {'\u00A0'} Read this client story </span>
                </Link>
              </p>
            </div>
            <div>
                <h4>Solve your ERP challenges</h4>
                <p>Upgrading your ERP solution to enable business expansion. </p>
                <h1></h1>
                <p>
                  <Link to='/story3'>
                  <span style={{ color: '#00FFB3' }}>{'>>>'} {'\u00A0'} Read this client story </span>
                  </Link>
                </p>
              </div>
            <div>
                <h4>Scale your D365 ERP solution</h4>
                <p>Optimize the performance of your ERP & Insight Analytics engines. </p>
                <h1></h1>
                <p>
                  <Link to='/story5'>
                  <span style={{ color: '#00FFB3' }}>{'>>>'} {'\u00A0'} Read this client story </span>
                  </Link>
                </p>
            </div>
        </div>
        </div>
      </section>


    </div>
  );
}
