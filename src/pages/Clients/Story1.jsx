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
            A Fortune 500 technology company in the US providing payroll services software to corporate clients
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Ask: {'\u00A0'} </span>
            The client had recently rolled out a successful online subscription based service which caused a surge in the volume of transactions & client activity. Their platform was aging and could not scale up to handle the volume. This led to unhappy customers with outages as well as slow response times.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            By modernizing their core platform & migrating their core platform on the cloud we were able to scale up their platform 70x from 10 tps (transactions per second) to 700 tps. In addition we saw a 93% reduction in support requests due to outages which resulted in direct cost savings, and a 53% reduction in response times for their users. Rayze enabled the client to achieve their growth ambitions
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze helped: {'\u00A0'} </span>
            Transforming the client's platform to the public cloud brought enhanced scale, security, and reliability. This strategic move empowers the client’s engineering teams to prioritize application improvements, ensuring an elevated customer experience.
            Rayze, collaborating seamlessly with the client's team, swiftly implemented intricate changes across cloud platforms, infrastructure, and product codebases.
            </p>
          </div>
          
        </div>
      </section>


    </div>
  );
}
