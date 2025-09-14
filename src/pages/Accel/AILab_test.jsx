import "./ai-lab-page.scss";
import React, { useEffect } from "react";

export default function AILabTestPage() {

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
            <br/><br/><h1 className="tagline">The Rayze AI Lab is built on three foundational pillars<br/> designed to accelerate your AI transformation</h1>
            
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
                  <p>A Secure LLM platform in our lab to experiment with LLMs, AI Agents, workflows. Option to bring your own test data for pilot development.</p>
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

            <p className="impact-statement">
              <strong>Enterprise Impact:</strong> While traditional AI implementations require 12-18 months, our integrated approach 
              delivers functional prototypes in weeks through pre-validated components and streamlined deployment processes.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Overview Section */}

      {/* Pillar 1: Experiment */}
      <section className="ai-playground-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">🚀</span> Experiment</h2>
            <p>Secure Cloud based testing environments that enable safe exploration of emerging AI technologies without operational risk</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h4>Performance Testing Environment</h4>
              <p>Comprehensive latency and performance validation for voice processing and real-time AI applications across enterprise frameworks</p>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>
            
            <div className="feature-card">
              <h4>Multi-Framework Evaluation</h4>
              <p>Comparative analysis platform for AI frameworks and tooling to identify optimal solutions for specific enterprise requirements</p>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>

            <div className="feature-card">
              <h4>Technology Assessment Suite</h4>
              <p>Structured evaluation methodology that reduces AI technology selection timelines by up to 6 months through systematic testing</p>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Think */}
      <section className="thought-leadership-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">🧠</span> Think: Strategic Intelligence & Research</h2>
            <p>Evidence-based insights from enterprise AI implementations and strategic research for informed decision-making</p>
          </div>
          
          <div className="insight-grid">
            <div className="insight-card">
              <h4>Enterprise Case Study: Financial Services</h4>
              <p><strong>Challenge:</strong> Deploying fraud detection models at scale<br/>
                 <strong>Strategic Insight:</strong> Edge deployment optimization achieved 40% compute reduction<br/>
                 <strong>Business Impact:</strong> $2M annual operational cost savings</p>
            </div>

            <div className="insight-card">
              <h4>Research Development: Healthcare AI Ethics</h4>
              <p><strong>Research Challenge:</strong> Addressing algorithmic bias in diagnostic systems<br/>
                 <strong>Innovation:</strong> Comprehensive bias detection and mitigation framework<br/>
                 <strong>Market Adoption:</strong> Framework deployed across 12+ enterprise clients</p>
            </div>

            <div className="insight-card">
              <h4>Industry Leadership: AI Governance Framework</h4>
              <p><strong>Research Focus:</strong> Enterprise multi-agent system governance<br/>
                 <strong>Publication:</strong> "Guardrails for Enterprise Agentic AI"<br/>
                 <strong>Industry Impact:</strong> Framework adopted by 3 Fortune 500 companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Build */}
      <section className="ai-booster-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">⚡</span> Build: Enterprise AI Toolkit</h2>
            <p>Comprehensive suite of modular AI components—agents, APIs, SDKs, and datasets—designed for immediate enterprise integration and 30% development acceleration</p>
          </div>
          
          <div className="booster-grid">
            <div className="booster-card">
              <div className="booster-icon">🛡️</div>
              <h4>Fraud Detection Agents</h4>
              <p>Enterprise-grade autonomous fraud detection systems with real-time anomaly detection capabilities. 
                 Pre-configured templates accelerate deployment from months to weeks.</p>
              <div className="tech-stack">
                <span>LlamaIndex</span>
                <span>MCP</span>
                <span>PyTorch</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">🛒</div>
              <h4>Retail Intelligence SDK</h4>
              <p>Comprehensive recommendation and forecasting system with personalization engines and inventory optimization. 
                 Modular architecture enables 30% faster integration.</p>
              <div className="tech-stack">
                <span>CrewAI</span>
                <span>FAISS</span>
                <span>Edge APIs</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">🏥</div>
              <h4>Healthcare Compliance Suite</h4>
              <p>Comprehensive bias detection and mitigation tools for healthcare AI systems with privacy-preserving data pipelines. 
                 Automated evaluation reduces audit timelines while ensuring regulatory compliance.</p>
              <div className="tech-stack">
                <span>Hugging Face</span>
                <span>OpenAI Gym</span>
                <span>Privacy Tools</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">₿</div>
              <h4>Financial Risk Assessment API</h4>
              <p>Advanced risk analysis platform for cryptocurrency and financial technology applications with predictive modeling capabilities. 
                 Pre-built components enable 30% faster product development cycles.</p>
              <div className="tech-stack">
                <span>AutoGen</span>
                <span>TensorFlow</span>
                <span>MCP Context</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">🌱</div>
              <h4>Sustainable AI Deployment Kit</h4>
              <p>Energy-efficient AI agent deployment framework optimized for enterprise sustainability goals. 
                 Advanced optimization techniques reduce compute costs by 30% while meeting environmental standards.</p>
              <div className="tech-stack">
                <span>DeepSpeed</span>
                <span>Quantization</span>
                <span>Rasa</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Request Demo</a>
                <a href="#github" className="github-link">📂 Documentation</a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Results & Methodology */}
      <section className="results-section">
        <div className="container">
          <h2>Proven Results & <span className="theme-color">Methodology</span></h2>
          
          <div className="timeline-comparison">
            <div className="timeline-item before">
              <div className="timeline-header">Before Rayze AI Lab</div>
              <div className="timeline-duration">12-18 months</div>
              <div className="timeline-phases">
                <div className="phase">Research & Planning (3-4 months)</div>
                <div className="phase">Tool Selection (2-3 months)</div>
                <div className="phase">Development (6-8 months)</div>
                <div className="phase">Testing & Deployment (2-3 months)</div>
              </div>
            </div>

            <div className="timeline-arrow">→</div>

            <div className="timeline-item after">
              <div className="timeline-header">With Rayze AI Lab</div>
              <div className="timeline-duration">8.4 months</div>
              <div className="timeline-phases">
                <div className="phase accelerated">Pre-built Templates (2 weeks)</div>
                <div className="phase accelerated">MCP Automation (3-4 months)</div>
                <div className="phase accelerated">AI-Assisted Development (3-4 months)</div>
                <div className="phase accelerated">Automated Testing (1 month)</div>
              </div>
            </div>
          </div>

          <div className="methodology">
            <h3>Our 30% Acceleration Methodology</h3>
            <div className="method-grid">
              <div className="method-card">
                <h4>Automated Workflows</h4>
                <p>MCP-powered automation handles 70% of repetitive coding tasks, validated across 50+ industry datasets.</p>
              </div>
              <div className="method-card">
                <h4>Pre-built Components</h4>
                <p>Production-ready templates and frameworks eliminate weeks of boilerplate development.</p>
              </div>
              <div className="method-card">
                <h4>Agile Sprint Enhancement</h4>
                <p>AI-assisted development increases sprint velocity by 40% through predictive modeling.</p>
              </div>
              <div className="method-card">
                <h4>A/B Testing Validation</h4>
                <p>Continuous improvement through data-driven optimization of our acceleration tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Partner with the <span className="theme-color">Rayze AI Lab</span></h2>
          <p>Accelerate your enterprise AI transformation through our proven three-pillar methodology. 
             Schedule a consultation to explore how our comprehensive toolkit can reduce your development cycles by 30%.</p>
          <div className="cta-buttons">
            <a href="mailto:jc@rayze.xyz" className="cta-primary">Schedule Enterprise Consultation</a>
            <a href="/aitest" className="cta-secondary">AI Maturity Assessment</a>
            <a href="#playground" className="cta-secondary">Explore Our Platform</a>
          </div>
        </div>
      </section>

    </div>
  );
}