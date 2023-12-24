import "./clients-page.scss";

import React, { useEffect } from "react";

export default function Story3Page() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="clients-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Democrataize Data Science</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Making AI/ML sustainable by building an ML Data engine</span></h1>
            <p>
            <span style={{ color: '#00FFB3' }}>The Client: {'\u00A0'} </span>
            A high tech startup aimed at helping restaurant operators & providing its customers with an enhanced restaurant dining experience.
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Ask: {'\u00A0'} </span>
            The startup is in this prime growth stage. Whilst they were built on a modern technology stack, and supported several AI & ML engines. The operational cost of building out ML was not sustainable, highly manual and very error prone resulting in mixed results and lack of revenue/$ spent.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            By building out an ML Engine which automated the ML flywheel of learning, data cleansing, and labeling the startup was able to save 65% of total cost of each ML run. Rayze enabled the client to achieve their growth ambitions
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze helped: {'\u00A0'} </span>
            We helped build a data-flywheel where we use model outputs to improve training data sets, selecting the most valuable datapoints for labeling, ensuring labels were accurate & self-consistent, and using model predictions as a starting point for training labels.
Rayze, collaborating seamlessly with the client's team, swiftly implemented the ML engine resulting in higher productivity, automated operations, better predictions and reduced costs.
            </p>
          </div>
          
        </div>
      </section>


    </div>
  );
}
