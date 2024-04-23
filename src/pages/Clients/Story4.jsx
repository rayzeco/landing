import "./story-page.scss";

import React, { useEffect } from "react";

export default function Story4Page() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="clients-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Gain Productivity & Reduce Costs</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Cost reduction with high quality offshore engineering talent</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
            A publicly traded UK based consumer services company with growth ambitions to expand internationally.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Situation: {'\u00A0'} </span>
            Our client had recently gone through a merger with their primary US competitor. As a publicly traded entity, they faced intense pressure post-merger from shareholders to demonstrate synergies and enact cost reductions. With duplicative technology platforms, teams, and software licenses, a decisive strategy was needed.
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            Tasked with executing a project to offshore an entire application portfolio, the goal was clear—achieve significant cost savings of USD 3M in development costs. Simultaneously, this initiative would establish a robust offshore presence, allowing the UK and US teams to concentrate on high-value integration work crucial for post-merger success.
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            Through strategic collaboration, we enabled the client to bootstrap a dedicated space in our offshore facilities in India. Operational within a swift three months, the majority of application teams were seamlessly set up within six months. The result was a substantial cost savings of approximately 4M, coupled with a highly skilled engineering team poised for sustained growth. Furthermore, this initiative freed up invaluable resources in the US and UK for strategic integration efforts.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze made a difference: {'\u00A0'} </span>
            Leveraging our state-of-the-art offshore facilities in India, we created a protective perimeter around the client's engineering staff. A meticulously designed operating and organizational model, complemented by defined KPIs and quarterly review sessions, ensured a seamless transition. Our emphasis on comprehensive training for the new India engineering team and retention strategies for top talent in the US and UK were pivotal. This success story was made possible through unwavering senior support and collaborative efforts within the client organization.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Key Achievements: {'\u00A0'} </span>
              <p><strong>Cost Reduction:</strong> Leveraging our offshore facilities, we were able to reduce the cost of development & ongoing support of the application portfolio.</p>
              <p><strong>Offshore Foundation for growth:</strong> Now that there was a foundation and pattern for migrating applications, the client could offshore further to reduce costs</p>
              <p><strong>High Quality Engineers:</strong> An influx of top engineering talent offshore which could be further leveraged on new technology demand.</p>
            </p>
          </div>

        </div>
      </section>


    </div>
  );
}
