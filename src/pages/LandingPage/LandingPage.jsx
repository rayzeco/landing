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
            <div className="title2">We are an Applied AI company.<br/><br/></div>
            We help businesses <strong>integrate AI </strong>into their core workflows, capabilities & systems.<br/>
            <br/><strong>Our expertise </strong>is to deliver client value with AI & Engineering<br/>
            <pre>Boost Efficiency • Drive Revenue • Enable Smarter Decisions</pre>
            </div>
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
              <div className="highlighted-description">
                Rayze blends <span className="highlight">Product Strategy</span>, <span className="highlight">Production-grade Engineering</span>, and <span className="highlight">Agentic AI Tools</span> to deliver <span className="highlight-metric">30%+ faster development</span>, lower costs, and rapid solutions.
              </div>
              <div className="title">From Boardroom strategy to Production systems.</div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <h4>AI Product Strategy Crew</h4>
              <p>A dynamic team of AI experts, product managers, and technical architects tackle challenges, prioritize value, deliver rapid prototypes, and craft strategic roadmaps—proving value fast and cutting risks by 40%.</p>
            </div>
            <div>
              <h4>AI Engineering Crew</h4>
              <p>Execution-focused engineers who architect, build, and scale AI solutions, integrating seamlessly with your existing technology stack while ensuring safety, security, and self-sufficiency post-engagement.</p>
            </div>
            <div>
              <h4>AI Lab & Toolkits</h4>
              <p>The AI Lab has 3 pillars: Experiment. Think. Build. The lab also delivers AI toolkits: Modular components including intelligent agents that slash development time-to-market by 30%+ and unlock exponential value.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="features-section">
        <div className="container">
          <div className="title">
            Clients trust us<br />
            for <span className="theme-color">Expertise</span> in <span className="theme-color">Fullstack</span><br/>
            <span className="theme-color">Core Services</span> <br/>
          </div>

          <div className="steps">
            <div className="step">
              <h4 style={{ color: 'var(--theme-color)' }}>AI Strategy</h4>
              <p>
              <strong>We empower </strong> leadership with robust AI governance, strategic insights to align AI with corporate priorities, and practical execution plans.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4 style={{ color: 'var(--theme-color)' }}>Instrastructure</h4>
              <p>
              <strong> We build </strong> a strong foundation with the right talent, tools, and processes to unlock AI value. Data is key—develop a Data Strategy to ensure it’s accessible, clean, and well-understood.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4 style={{ color: 'var(--theme-color)' }}>AI Engineering</h4>
              <p>
              <strong>We focus</strong> on the right challenges, build user trust with rapid prototyping, and measure impact effectively. Develop adaptable, explainable AI aligned with evolving business priorities.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4 style={{ color: 'var(--theme-color)' }}>AI Operations</h4>
              <p>
              <strong>We ensure</strong> the stability and security of AI applications with top-tier observability, monitoring, and alerting. Enhance performance through automated AI retraining and continuous model evaluations.
              </p>
            </div>
          </div>

          <div className="cta-buttons" style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexWrap: "wrap"}}>
            <a href="mailto:jc@rayze.xyz">Get In Touch</a>
            {/* <a href="/aitest" style={{padding: "14px 30px", borderRadius: "100px", backgroundColor: "var(--theme-color)", color: "black", textDecoration: "none", fontWeight: "bold", fontSize: "16px"}}>Take AI Assessment →</a> */}
          </div>

        </div>
      </section>

      <section className="talent-section">
        <img src="/images/infinite.svg" alt="infinite" className="infinite" />
        <img src="/images/rect.svg" alt="rect" className="rect" />
        <div className="container">
          <div className="left">
            <div className="title">Our relentless focus on AI Talent</div>
            <div className="blurb">
              <p>We've assembled the world's most talented AI engineers, product strategists, and technical architects from leading technology companies and consulting firms.</p>
              <p>Our global team combines deep technical expertise with proven business acumen to deliver transformational AI solutions at enterprise scale.</p>
            </div>
            <div className="talent-sources">
              <div className="sources-title"><br/><br/>Trusted by industry leaders:</div>
              <div className="logos-grid">
                <div className="logo-item">
                  <img src="/images/Google-Logo-700x394.png" alt="Google" />
                </div>
                <div className="logo-item">
                  <img src="/images/OpenAI-Logo-700x394.png" alt="OpenAI" />
                </div>
                <div className="logo-item">
                  <img src="/images/Tesla-Logo-700x394.png" alt="Tesla" />
                </div>
                <div className="logo-item">
                  <img src="/images/Microsoft-Logo-700x394.png" alt="Microsoft" />
                </div>
                <div className="logo-item">
                  <img src="/images/Meta-Logo-300x169.png" alt="Meta" />
                </div>
                <div className="logo-item">
                  <img src="/images/mckinsey-company-seeklogo.png" alt="McKinsey" />
                </div>
                <div className="logo-item">
                  <img src="/images/boston-consulting-group-bcg-seeklogo.png" alt="BCG" />
                </div>
                <div className="logo-item">
                  <img src="/images/Apple-Logo-300x169.png" alt="Apple" />
                </div>
                <div className="logo-item">
                  <img src="/images/Amazon-Logo-300x169.png" alt="Amazon" />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="metrics-grid">
              <div className="metric-box">
                <div className="big-number">125+</div>
                <div className="metric-label">AI Talent</div>
              </div>
              <div className="metric-box">
                <div className="big-number">50+</div>
                <div className="metric-label">Clients</div>
              </div>
              <div className="metric-box">
                <div className="big-number">200+</div>
                <div className="metric-label">Projects</div>
              </div>
              <div className="metric-box">
                <div className="big-number">US, India, Colombia</div>
                <div className="metric-label">Global Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="community-section">
        <img src="/images/circle.svg" alt="circle" className="circle" />
        <div className="container">
          <div className="title">
            Ready to Transform <br />
            Your Enterprise with AI?
          </div>
          <div className="cta-buttons" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
            <a href="mailto:jc@rayze.xyz" style={{fontSize: "24px", fontWeight: "bold"}}>Start Your AI Transformation</a>
            {/* <a href="/aitest" style={{fontSize: "24px", fontWeight: "bold"}}>Take AI Readiness Assessment →</a> */}
          </div>
        </div>
      </section>
    </div>
  );
}
