import "./landing-page.scss";

import React, { useEffect } from "react";

export default function LandingPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="landing-page">
      <section className="launch-section">
        <img src="/images/infinite.svg" alt="infinite" className="infinite" />
        <img src="/images/rect.svg" alt="rect" className="rect" />
        <div className="container">
          <div className="left">
            <img src="/images/logo-text-black.svg" alt="logo" />
          </div>
          <div className="right">
            <div className="title">AI.<br/>Data.<br/>Engineering.</div>
            <div className="description">
              <strong>We help businesses  <u>integrate AI</u> into their core systems</strong>, boosting efficiency, driving revenue, and enabling smarter decisions.
              <br /><br />
              <strong>Rayze blends </strong> Product Strategy, Production-grade Engineering, and Agentic AI Tools to deliver <strong>30%+ faster development, lower costs, and rapid solutions</strong>.
              <br /><br />
              We have had real world impact at <strong>90+ global businesses</strong> with our 
              team of <strong> 175+ AI engineers, Researchers, and Product Experts</strong> passionate about shaping AI's future.
            </div>
            <pre>Strategy • AI Engineering • Agentic Tools • AI Talent</pre>
            <a href="mailto:jc@rayze.xyz">Start Your AI Transformation</a>
          </div>
        </div>
      </section>

      <section className="with-rayze-section">
        <div className="container">
          <div className="top">
            <div className="left">
              <img src="/images/arrow.svg" alt="arrow" />
              <pre className="title">With Rayze:</pre>
            </div>
            <div className="right">
              <p>
                In an era where every company must evolve into an AI company to thrive, we empower clients with production-grade AI transformations that embed intelligence into your organization's applications and processes.
              </p>
              <div className="title">From boardroom strategy to production systems.</div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <h4>AI Product Strategy Squad</h4>
              <p>Cross-functional teams of Product Managers, AI practitioners, researchers, and architects who validate prototypes and strategic roadmaps, reducing project risks by 40%.</p>
            </div>
            <div>
              <h4>AI Engineering Squad</h4>
              <p>Execution-focused engineers who architect, build, and scale AI solutions, integrating seamlessly with your existing technology stack while ensuring self-sufficiency post-engagement.</p>
            </div>
            <div>
              <h4>Open-Source Agentic Building Blocks</h4>
              <p>Modular components including intelligent agents, MCP tools, APIs, and SDKs that slash development time by 30%+ and unlock exponential value for enterprise deployments.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="features-section">
        <div className="container">
          <div className="title">
            Our Enterprise <br />
            AI Engagement <br/>
            Methodology <br />
          </div>

          <div className="steps">
            <div className="step">
              <h4>Discover (2-3 weeks)</h4>
              <p>
                Business case development, stakeholder mapping, KPI definition, data reality assessment, and comprehensive risk analysis
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Design (2-4 weeks)</h4>
              <p>Target architecture definition, integration planning, controls framework, prototype development, and rollout strategy
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Build (6-12 weeks)</h4>
              <p>Cross-functional pod delivery, CI/CD implementation, data/model pipelines, evaluations & guardrails, with 125+ AI engineers
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Scale (Ongoing)</h4>
              <p>Client team enablement, cost optimization, capability transfer, and comprehensive playbooks for sustained success</p>
            </div>
          </div>

          <a href="mailto:jc@rayze.xyz">Get In Touch</a>

        </div>
      </section>

      <section className="community-section">
        <img src="/images/circle.svg" alt="circle" className="circle" />
        <div className="container">
          <div className="title">
            Ready to Transform <br />
            Your Enterprise with AI?
          </div>
          <a href="mailto:jc@rayze.xyz">Schedule Strategic Consultation</a>
        </div>
      </section>
    </div>
  );
}
