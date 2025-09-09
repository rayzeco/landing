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
            <h1 className="tagline">Where <span className="theme-color">Elite Consultants</span> Meet <span className="theme-color">Proprietary AI Tools</span></h1>
            
            <div className="manifesto">
              <p className="manifesto-text">
                The Rayze AI Lab is our innovation engine, where elite consultants collaborate with proprietary 
                tools—<span className="highlight">MCP</span>, <span className="highlight">custom AI agents</span>, 
                <span className="highlight">scalable software frameworks</span>, and <span className="highlight">curated datasets</span>—to 
                supercharge your R&D. We don't just advise; we build and deploy AI solutions that cut development 
                time by <span className="highlight-metric">30%</span> through automated workflows, predictive modeling, 
                and seamless integration.
              </p>
            </div>

            <div className="key-metrics">
              <div className="metric">
                <span className="metric-number">30%</span>
                <span className="metric-label">Faster Time-to-Market</span>
              </div>
              <div className="metric">
                <span className="metric-number">70%</span>
                <span className="metric-label">Manual Coding Automated</span>
              </div>
              <div className="metric">
                <span className="metric-number">50+</span>
                <span className="metric-label">Industry Datasets</span>
              </div>
            </div>

            <p className="impact-statement">
              <strong>Impact Example:</strong> In a world where AI projects take 12-18 months, our Lab delivers 
              prototypes in weeks, leveraging pre-trained agents for tasks like data synthesis and anomaly detection.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Overview Section */}
      <section className="pillars-overview-section">
        <div className="container">
          <h2 className="section-title">Three Pillars of <span className="theme-color">AI Lab</span></h2>
          
          <div className="pillars-overview">
            <div className="pillar-overview-card">
              <div className="pillar-icon">🚀</div>
              <h3>Experiment: AI Playground</h3>
              <p>Interactive sandbox where clients test MCP, agents, and AI frameworks</p>
              <div className="pillar-highlights">
                <span>• Voice Latency Testing</span>
                <span>• MCP Framework Comparison</span>
                <span>• AI Software Evaluation</span>
              </div>
            </div>
            
            <div className="pillar-overview-card">
              <div className="pillar-icon">🧠</div>
              <h3>Think: Thought Leadership & Learnings</h3>
              <p>Real client stories, failures turned into insights, and cutting-edge AI safety research</p>
              <div className="pillar-highlights">
                <span>• Client Success Stories</span>
                <span>• Innovation from Failures</span>
                <span>• AI Safety Research</span>
              </div>
            </div>
            
            <div className="pillar-overview-card">
              <div className="pillar-icon">⚡</div>
              <h3>Build: AI Booster Packs</h3>
              <p>Production-ready APIs, SDKs, and scripts that fast-track development by 30%</p>
              <div className="pillar-highlights">
                <span>• FraudGuard Agent</span>
                <span>• RetailOpti SDK</span>
                <span>• HealthComp Utility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 1: AI Playground */}
      <section className="ai-playground-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">🚀</span> Experiment: AI Playground</h2>
            <p>Interactive sandbox where clients test MCP, agents, and AI frameworks</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h4>Voice Latency Agent</h4>
              <p>Real-time voice processing with sub-200ms latency testing across multiple frameworks</p>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>
            
            <div className="feature-card">
              <h4>MCP Framework Comparison</h4>
              <p>Side-by-side testing of different MCP agents to optimize results for your use case</p>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>

            <div className="feature-card">
              <h4>AI Software Evaluation</h4>
              <p>Comprehensive testing suite that saved ClientCorp 6 months of AI tool evaluation</p>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Thought Leadership */}
      <section className="thought-leadership-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">🧠</span> Think: Thought Leadership & Learnings</h2>
            <p>Real client stories, failures turned into insights, and cutting-edge AI safety research</p>
          </div>
          
          <div className="insight-grid">
            <div className="insight-card">
              <h4>Client Collaboration: FinTech Giant</h4>
              <p><strong>Challenge:</strong> Fraud detection model deployment<br/>
                 <strong>Learning:</strong> Edge deployment requires 40% less compute than initially estimated<br/>
                 <strong>Result:</strong> $2M annual cost savings</p>
            </div>

            <div className="insight-card">
              <h4>Failure → Innovation: Healthcare AI</h4>
              <p><strong>Initial Failure:</strong> Bias in diagnostic recommendations<br/>
                 <strong>Pivot:</strong> Built comprehensive bias detection framework<br/>
                 <strong>Outcome:</strong> Now our HealthComp Utility used by 12+ clients</p>
            </div>

            <div className="insight-card">
              <h4>Agentic AI Safety Research</h4>
              <p><strong>Research:</strong> Multi-agent system safety protocols<br/>
                 <strong>Publication:</strong> "Guardrails for Enterprise Agentic AI"<br/>
                 <strong>Impact:</strong> Industry standard adopted by 3 Fortune 500 companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: AI Booster Packs */}
      <section className="ai-booster-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">⚡</span> Build: AI Booster Packs</h2>
            <p>Production-ready APIs, SDKs, and scripts that fast-track development by 30%</p>
          </div>
          
          <div className="booster-grid">
            <div className="booster-card">
              <div className="booster-icon">🛡️</div>
              <h4>FraudGuard Agent</h4>
              <p>Autonomous real-time fraud detection using anomaly detection on transaction data. 
                 Pre-built templates slash prototyping from weeks to days.</p>
              <div className="tech-stack">
                <span>LlamaIndex</span>
                <span>MCP</span>
                <span>PyTorch</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">🛒</div>
              <h4>RetailOpti SDK</h4>
              <p>Personalized recommendation agents with inventory forecasting. 
                 Modular components reduce integration effort by 30%.</p>
              <div className="tech-stack">
                <span>CrewAI</span>
                <span>FAISS</span>
                <span>Edge APIs</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">🏥</div>
              <h4>HealthComp Utility</h4>
              <p>Bias detection in healthcare AI with anonymized data pipelines. 
                 Auto-evals cut audit time while ensuring HIPAA compliance.</p>
              <div className="tech-stack">
                <span>Hugging Face</span>
                <span>OpenAI Gym</span>
                <span>Privacy Tools</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">₿</div>
              <h4>CryptoRisk API</h4>
              <p>Risk assessment agents for crypto/fintech with predictive analytics. 
                 Ready foundations enable 30% faster MVP development.</p>
              <div className="tech-stack">
                <span>AutoGen</span>
                <span>TensorFlow</span>
                <span>MCP Context</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
              </div>
            </div>

            <div className="booster-card">
              <div className="booster-icon">🌱</div>
              <h4>EcoAgent Script Kit</h4>
              <p>Energy-optimized agent deployment across verticals. 
                 Optimization slashes compute costs by 30% while aligning with sustainability.</p>
              <div className="tech-stack">
                <span>DeepSpeed</span>
                <span>Quantization</span>
                <span>Rasa</span>
              </div>
              <div className="card-links">
                <a href="#demo" className="demo-link">🎯 Live Demo</a>
                <a href="#github" className="github-link">📂 GitHub</a>
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
          <h2>Ready to <span className="theme-color">Accelerate</span> Your AI Development?</h2>
          <p>Experience the power of the Rayze AI Lab firsthand. Our team is ready to show you how we can cut your development time by 30%.</p>
          <div className="cta-buttons">
            <a href="mailto:jc@rayze.xyz" className="cta-primary">Schedule AI Lab Demo</a>
            <a href="/aitest" className="cta-secondary">Take AI Readiness Test</a>
            <a href="#playground" className="cta-secondary">Try Our Tools</a>
          </div>
        </div>
      </section>

    </div>
  );
}