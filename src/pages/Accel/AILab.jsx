import "./ai-lab-page.scss";
import React, { useEffect } from "react";

export default function AILabPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="ai-lab-page">

      {/* Hero Section - AI Lab Manifesto */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <pre className="title">Rayze AI Lab</pre>
            <br/><br/><h1 className="tagline">The Rayze AI Lab is built on <br/>3 Foundational Pillars<br/> <span style={{color: "var(--theme-color)"}}>...designed to accelerate </span>your AI transformation</h1>
            
            <div className="manifesto">
              {/* <p className="manifesto-text">
                The Rayze AI Lab is built on three foundational pillars designed to accelerate enterprise AI transformation: 
                <strong>Experiment</strong>, <strong>Think</strong>, and <strong>Build</strong>. We provide clients with secure cloud-based 
                playgrounds to test emerging technologies, comprehensive insights from real-world implementations, and a comprehensive 
                toolbox of modular AI components that reduce development time by <span className="highlight-metric">30%</span>.
              </p> */}
              
              <div className="pillar-summary">
                <div className="pillar-overview-card">
                  <div className="pillar-icon">🚀</div>
                  <h3>Experiment</h3>
                  <p>Safe cloud environments for technology validation and proof-of-concept development.</p>
                </div>
                <div className="pillar-overview-card">
                  <div className="pillar-icon">🧠</div>
                  <h3>Think</h3>
                  <p>Strategic insights from client engagements and cutting-edge thought leadership.</p>
                </div>
                <div className="pillar-overview-card">
                  <div className="pillar-icon">⚡</div>
                  <h3>Build</h3>
                  <p>Production-ready agents, MCP tools, APIs, SDKs, and curated datasets for immediate integration.</p>
                </div>
              </div>
            </div>
            <br/><br/>
            <div className="key-metrics">
              <div className="metric">
                <span className="metric-number">30%</span>
                <span className="metric-label">Faster Time-to-Market</span>
              </div>
              <div className="metric">
                <span className="metric-number">40+</span>
                <span className="metric-label">Production-Ready Agents</span>
              </div>
              <div className="metric">
                <span className="metric-number">150+</span>
                <span className="metric-label">Inegration Connectors</span>
              </div>
            </div>

            <div className="ai-assessment-cta">
              <a href="/aitest" className="assessment-button">Take the AI Assessment</a>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}