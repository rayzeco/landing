import "./story-page.scss";

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
            A cutting-edge startup dedicated to enhancing the dining experience for restaurant customers & helping restaurants operators with their modern technology solutions.
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Challenge: {'\u00A0'} </span>
            Despite being built on a robust technology stack and incorporating advanced AI and ML engines, the operational costs associated with building and maintaining ML processes became a bottleneck. The manual efforts required for learning, data cleansing, and labeling were not only unsustainable but also led to mixed results, hindering revenue generation.
            </p>

            <p>
            <span style={{ color: '#00FFB3' }}>The Ask: {'\u00A0'} </span>
            With aspirations for sustained growth, the startup sought a solution to optimize and automate its ML processes. The primary goal was to overcome the challenges of manual operations, reduce costs, and ensure a more efficient and error-free ML flywheel.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>The Outcome: {'\u00A0'} </span>
            Through strategic collaboration with Rayze, the startup successfully implemented a groundbreaking ML engine. This automation streamlined the ML flywheel, encompassing learning, data cleansing, and labeling processes. The outcome was a remarkable 65% reduction in the total cost of each ML run, aligning with the client's growth ambitions.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>How Rayze made a difference: {'\u00A0'} </span>
            Rayze played a pivotal role in building a transformative data flywheel. Leveraging model outputs, Rayze improved training datasets by selecting the most valuable datapoints for labeling, ensuring accuracy and self-consistency in labels. Model predictions were seamlessly integrated into the training process, creating a self-sustaining loop of continuous improvement.
            Through close collaboration with the client's team, Rayze swiftly implemented the ML engine. The results were transformative—higher productivity, automated operations, more accurate predictions, and a substantial reduction in costs.
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Key Achievements: {'\u00A0'} </span>
              <p><strong>Cost Savings:</strong> Achieved a significant 65% reduction in the total cost of each ML run.</p>
              <p><strong>Automated Operations:</strong> Streamlined ML processes, reducing manual efforts and errors.</p>
              <p><strong>Enhanced Predictions:</strong> Improved the accuracy and reliability of ML predictions.</p>
              <p><strong>Collaborative Implementation:</strong> Rayze seamlessly collaborated with the client's team for a swift and successful implementation.</p>
            </p>
            <p>
            <span style={{ color: '#00FFB3' }}>Conclusion: {'\u00A0'} </span>
            Rayze empowered the high-tech startup to navigate its growth stage with confidence. By addressing the challenges in ML operations, we not only optimized costs but also paved the way for enhanced productivity and revenue generation. This success story stands as a testament to the transformative impact of strategic collaboration and cutting-edge solutions in the realm of restaurant technology.
            </p>
          </div>
          
        </div>
      </section>


    </div>
  );
}
