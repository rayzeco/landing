import "./clients-page.scss";

import React, { useEffect } from "react";

export default function Story1Page() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="clients-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Modernize Core Technology</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Modernize core technology on cloud to scale-up a growing business</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
            A Fortune 500 technology company in the US, specializing in payroll services software
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Situation: {'\u00A0'} </span>
            The client was facing a surge in activity following the successful launch of an online subscription-based service. However, their existing platform, aged and unable to scale efficiently, resulted in customer dissatisfaction due to outages and sluggish response times.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            The challenge was to address scalability and also ensure seamless, reliable, and secure operations on the core platform.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Solution: {'\u00A0'} </span>
            Through meticulous planning and execution, we orchestrated the migration of the client's core platform to the cloud. The impact was transformative, with the platform's transaction processing capabilities skyrocketing from 10 transactions per second (tps) to an impressive 700 tps. This strategic move not only alleviated outages but also resulted in a remarkable 93% reduction in support requests and a substantial 53% reduction in user response times.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            The successful modernization not only addressed immediate challenges but positioned our client for sustainable growth and success in the highly competitive environment.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze made a difference: {'\u00A0'} </span>
            We played a crucial role in this transformation. By leveraging our engineering capabilities on the public cloud, we not only provided enhanced scale, security, and reliability but also empowered the client's engineering teams to prioritize application improvements.</p>
            <p>
            <span style={{ color: '#00FFB3' }}>Key Achievements: {'\u00A0'} </span>
                <p><strong>Unmatched Scaling:</strong> We increased the platform's transaction processing from 10 tps to an impressive 700 tps, meeting the surge in client activity head-on.</p>
                <p><strong>Cost-Effective Support:</strong> We engineered a sustainable solution with the shift to the cloud which led to a 93% reduction in support requests related to outages, directly translating into significant cost savings.</p>
                <p><strong>Optimized User Experience:</strong> Users experienced a substantial 53% reduction in response times, ensuring a seamless and enhanced service.</p>
            </p>
          </div>
          
        </div>
      </section>


    </div>
  );
}
