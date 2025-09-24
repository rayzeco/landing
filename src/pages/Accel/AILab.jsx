import "./ai-lab-page.scss";
import React, { useEffect, useState } from "react";

export default function AILabPage() {
  const [selectedCard, setSelectedCard] = useState('sandbox');
  const [selectedThinkCard, setSelectedThinkCard] = useState('agentic_ai');
  const [selectedBuildCard, setSelectedBuildCard] = useState('genai_maintenance');

  const featureCards = {
    sandbox: {
      id: 'sandbox',
      title: 'Instant AI Sandboxes',
      description: '',
      detailContent: {
        subtitle: 'Instant AI Sandboxes',
        sections: [
          {
            title: 'The Challenge',
            content: 'Corporations across industries struggle with lengthy AI pilot setups, often delayed by data silos and legacy system incompatibilities. A 2025 McKinsey report reveals 70% cite integration as a top barrier, with 20-40% of project time lost to onboarding friction. Companies need quick, accessible ways to test GenAI models like LLMs on real data without complex installations.'
          },
          {
            title: 'The Solution',
            content: 'The Rayze AI Lab team delivered pre-configured cloud sandboxes, packed with 3+ open-source LLMs (e.g., lightweight Phi-3 for efficiency vs. robust Llama 3 for depth). These environments, enhanced with tools like Hugging Face and LangChain, allow instant uploads and comparisons in under 5 minutes. Observability via MLflow tracks experiments, while multimodal extensions (e.g., vision-language models) add versatility.'
          }
        ],
        benefits: [
          { icon: '⚡', text: '30% faster iteration cycles with instant cloud access' },
          { icon: '⏱️', text: '50% reduction in setup delays - months turned into minutes' },
          { icon: '🛠️', text: 'Pre-configured with Hugging Face, LangChain, and MLflow' },
          { icon: '🔍', text: 'Multimodal extensions for vision-language model testing' }
        ],
        impact: 'Clients achieve 30% faster iteration cycles and cut setup delays by 50%, accelerating POC-to-production (per MIT NANDA\'s 5% success rate). Quick wins include streamlined testing across use cases, boosting team productivity and bypassing skills gaps. Rayze\'s self-sufficient design uplifts capabilities, driving innovation. Rayze engineers ensure scalability, offering a no-config, plug-and-play experience.'
      }
    },
    agentic_showdown: {
      id: 'agentic_showdown',
      title: 'Agentic AI platform that works for your organization',
      description: '',
      detailContent: {
        subtitle: 'Agentic AI platform that works for your organization',
        sections: [
          {
            title: 'The Challenge',
            content: 'Overwhelmed by agentic AI hype? With 2025\'s explosion of agentic tools (autonomous workflows doubling efficiency per Uptech trends), companies struggle with selection paralysis—87% of leaders report tool overload as a challenge, per PwC AI Predictions.'
          },
          {
            title: 'The Solution',
            content: 'Our interactive showdown pits top frameworks head-to-head—n8n for no-code automation vs. CrewAI for multi-agent orchestration vs. LangChain for RAG-enhanced chains—running live simulations on your prompts with real-time benchmarks tailored to your vertical.'
          }
        ],
        benefits: [
          { icon: '⚔️', text: 'Side-by-side framework comparisons with real-time benchmarks' },
          { icon: '📊', text: 'Task completion speed and error rate analysis by vertical' },
          { icon: '🔧', text: 'Export configurations to your stack for seamless integration' },
          { icon: '💰', text: 'ROI Simulator showing projected time savings (up to 25%)' }
        ],
        impact: 'Reduces internal resistance and trial-and-error costs (common in 60% of AI adoptions, per Stack AI\'s 2025 challenges), empowering non-experts to validate tools against business KPIs like cost reduction in back-office operations.'
      }
    },
    fine_tuning: {
      id: 'fine_tuning',
      title: 'Compliant Fine-Tuning Playground',
      description: '',
      detailContent: {
        subtitle: 'Compliant Fine-Tuning Playground',
        sections: [
          {
            title: 'The Challenge',
            content: 'Struggling to balance customization with security in regulated industries? Fine-tuning is a 2025 hotspot for ROI (40% accuracy gains in finance per RTS Labs), but 65% of corporations cite ethics/risk as barriers (Intel\'s 2025 AI challenges).'
          },
          {
            title: 'The Solution',
            content: 'Experiment with/without fine-tuning in our secure playground—upload anonymized data to fine-tune models (e.g., BERT for healthcare compliance checks) and compare outputs side-by-side against off-the-shelf versions. Built-in bias audits, governance rails, and one-click rollouts ensure production-grade results.'
          }
        ],
        benefits: [
          { icon: '🔒', text: 'HIPAA/SOC 2 ready with built-in governance rails' },
          { icon: '⚖️', text: 'Ethical AI features with red-teaming via Hugging Face' },
          { icon: '📈', text: 'Before/after comparisons showing accuracy improvements' },
          { icon: '🚀', text: 'One-click rollouts without exposing core infrastructure' }
        ],
        impact: 'Tackles data quality/silos and trust issues (top onboarding hurdles per Aptean 2025), enabling healthcare/crypto clients to prototype compliant solutions without 6-month legal reviews, uplifting team capabilities as per Rayze\'s self-sufficiency promise.'
      }
    }
  };

  const thinkCards = {
    agentic_ai: {
      id: 'agentic_ai',
      title: 'Conquering GenAI Agent Testing Challenges',
      description: '',
      detailContent: {
        subtitle: 'Conquering GenAI Agent Testing Challenges',
        sections: [
          {
            title: 'Background',
            content: 'Companies developing GenAI agents and chatbots face a critical hurdle: infinite user inputs and paths make exhaustive testing impossible, leaving uncertainty about which prompts or questions trigger hallucinations or incorrect results—potentially causing detrimental errors like misinformation or flawed decisions. This unpredictability erodes trust, with 60% of pilots failing post-deployment due to uncaught edge cases, per McKinsey 2025.'
          },
          {
            title: 'Solution', 
            content: 'The Rayze AI Lab created an advanced testing framework, generating diverse personas based on customer segmentation (e.g., for retail) to simulate varied behaviors and automatically crafting comprehensive test cases for each. It checks for predictable, compliant answers and boundary rules, using reinforcement learning mechanisms to refine tests in real-time once live via feedback loops. Seamless CI/CD integration plugs into pipelines with tools like Selenium for UI testing or Postman for APIs, enabling automated validation and end-to-end certainty. Rayze global engineers built it to handle infinite possibilities through adaptive red teaming and custom metrics.'
          }
        ],
        impact: 'Clients gain 40% fewer testing failures and 30% faster iterations, transforming unpredictable agents into dependable systems with high coverage of real-world scenarios. This fosters certainty, minimizes risks, and bridges the GenAI Divide for scalable, production-ready AI.'
      }
    },
    genai_divide: {
      id: 'genai_divide',
      title: 'Crossing the GenAI Divide for Real ROI',
      description: '',
      detailContent: {
        subtitle: 'Crossing the GenAI Divide for Real ROI',
        sections: [
          {
            title: 'Background',
            content: 'Leaders encounter GenAI hype without organization-wide impact, with resistance and skills gaps blocking adoption—McKinsey surveys show most falter, per MIT NANDA\'s "Divide" (80% experiment, 5% scale). Barriers like regulation (Deloitte top issue) and job fears (BCG\'s 46%) hinder ROI.'
          },
          {
            title: 'Solution',
            content: 'Rayze\'s roadmap prioritizes 3 high-ROI use cases (e.g., back-office automation), upskills via workshops, and measures KPIs. Our Strategy Squad validates prototypes, accelerating by 30% with end-to-end models. We bridge gaps without disruptions.'
          }
        ],
        impact: 'Clients transform pilots into 30% productivity boosts and 20% fewer failures, overcoming resistance for scalable gains (BCG\'s comprehensive adopters). This ensures measurable outcomes and team uplift for all sectors.'
      }
    },
    data_estate: {
      id: 'data_estate',
      title: 'Revitalizing Data Estates',
      description: '',
      detailContent: {
        subtitle: 'Revitalizing Data Estates',
        sections: [
          {
            title: 'Background',
            content: 'Corporate data estates are fragmented and insecure, causing 30-50% GenAI failures due to poor inputs—70% face quality/privacy issues (McKinsey Global AI Survey). Challenges like silos, bias, and governance gaps lead to hallucinations and 40% losses (Deloitte, RTS Labs, PwC).'
          },
          {
            title: 'Solution',
            content: 'Rayze\'s blueprint audits and unifies with data lakes (e.g., Databricks), automates cleaning via Great Expectations, and adds lineage tracking. Our Engineering Squad integrates Agentic Blocks for governance, requiring cross-functional teams and phased hybrid cloud modernization. Rayze engineers start with high-value datasets for accurate GenAI.'
          }
        ],
        impact: 'Clients gain 30% faster insights and 40% efficiency, taming chaos for reliable results (PwC\'s centralized platforms). This ensures self-sufficiency, 30% TCO cuts, and contextual data for robust workflows across sectors.'
      }
    }
  };

  const buildCards = {
    genai_maintenance: {
      id: 'genai_maintenance',
    title: 'GenAI Maintenance Agent',
      description: '',
      detailContent: {
        subtitle: 'GenAI Maintenance Agent',
        sections: [
          {
            title: 'Background',
            content: 'Corporations across industries rely on GenAI, but 20-30% accuracy loss from stale vector databases hampers outputs like chatbots or search tools. Manual upkeep is time-consuming and error-prone, a key issue highlighted by MIT NANDA\'s insights on workflow brittleness in 2025 AI deployments.'
          },
          {
            title: 'Solution',
            content: 'Rayze has built a GenAI Maintenance Agent in our AI Lab, designed to clean vector databases (e.g., removing duplicates, outdated embeddings), retrain models on fresh data, and retest for drift—deployable as a cron-job or SDK. Enhanced with observability by Rayze global engineers, it ensures seamless performance across all sectors.'
          }
        ],
        impact: 'When implemented at clients, this agent delivers 30% faster retraining cycles and cuts maintenance effort by 50%, boosting reliability and productivity for universal GenAI adoption.'
      }
    },
    utility_library: {
      id: 'utility_library',
      title: 'Rapid Prototyping Toolkit',
      description: '',
      detailContent: {
        subtitle: 'Rapid Prototyping Toolkit',
        sections: [
          {
            title: 'Background',
            content: 'Teams waste 25% of dev time recreating prompt strategies for GenAI tasks, leading to inconsistent results—60% of pilots fail due to poor prompting, per McKinsey 2025. Companies need efficient tools to streamline workflows.'
          },
          {
            title: 'Solution',
            content: 'Rayze has developed a Foundational GenAI Utility Library in our AI Lab, offering pre-built utilities for prompt engineering, RAG chaining, and evaluations, tailored for any GenAI task. Our Strategy Squad enhances it with Rayze blocks, with 175+ engineers ensuring plug-and-play deployment.'
          }
        ],
        impact: 'When implemented at clients, this library enables 30% faster prototyping and cuts dev time by 25%, enhancing consistency and accelerating MVPs for sustainable AI embedding.'
      }
    },
    enterprise_connector: {
      id: 'enterprise_connector',
      title: 'Enterprise Connector SDK',
      description: '',
      detailContent: {
        subtitle: 'Enterprise Connector SDK',
        sections: [
          {
            title: 'Background',
            content: 'Siloed business systems delay GenAI adoption by 50% due to integration challenges, risking data breaches and inefficiencies, as noted in PwC 2025. Companies need reliable connectors to unlock real-time applications.'
          },
          {
            title: 'Solution',
            content: 'Rayze has created an Enterprise Connector SDK in our AI Lab, featuring pre-configured connectors for HRIS, ERP, and CRM with secure API wrappers and schema mapping. The Rayze global team customizes it for rapid scaling across any tech stack.'
          }
        ],
        impact: 'When implemented at clients, this SDK delivers 30% faster integration and cuts setup delays by 50%, enabling real-time GenAI apps without months-long efforts.'
      }
    },
    data_pipeline: {
      id: 'data_pipeline',
      title: 'Data Engineering Pipeline Tool',
      description: '',
      detailContent: {
        subtitle: 'Data Engineering Pipeline Tool',
        sections: [
          {
            title: 'Background',
            content: 'Poor data quality hampers 70% of AI projects, inflating prep time to 60% and causing 40% model failures due to messy or unlabeled data, per Deloitte 2025. Companies need efficient data solutions.'
          },
          {
            title: 'Solution',
            content: 'Rayze has built a Data Engineering Pipeline Tool in our AI Lab, designed to clean data (e.g., outlier detection) and label with weak supervision, exportable to standard formats. Our Talent Platform integrates it, with 175+ engineers ensuring end-to-end support.'
          }
        ],
        impact: 'When implemented at clients, this tool enables 30% faster data prep and cuts labeling effort by 70%, delivering clean datasets for GenAI training.'
      }
    },
    monitoring_dashboard: {
      id: 'monitoring_dashboard',
      title: 'GenAI Observability & Monitoring Dashboard',
      description: '',
      detailContent: {
        subtitle: 'GenAI Observability & Monitoring Dashboard',
        sections: [
          {
            title: 'Background',
            content: 'Live GenAI apps degrade silently post-deploy, with 50% requiring tweaks due to unmonitored drift, eroding trust, per Gartner 2025 MLOps pains. Companies need real-time oversight.'
          },
          {
            title: 'Solution',
            content: 'Rayze has developed a GenAI Monitoring Dashboard in our AI Lab, tracking input drift and output quality with alerts, integrable to tools like Grafana. Our Strategy Squads enhance it with custom metrics, supported by 175+ engineers.'
          }
        ],
        impact: 'When implemented at clients, this dashboard delivers 30% faster debugging and ensures 99% uptime, maintaining trust and performance in GenAI apps.'
      }
    },
    mcp_agents: {
      id: 'mcp_agents',
      title: 'MCP-Enhanced Agents',
      description: '',
      detailContent: {
        subtitle: 'MCP-Enhanced Agents',
        sections: [
          {
            title: 'Background',
            content: 'Companies face 70% data quality issues and 65% compliance risks with GenAI, inflating prep time and risking fines (Deloitte 2025, Veriff 2025). Manual processes slow productivity by 40%, per MIT NANDA 2025, needing unified solutions.'
          },
          {
            title: 'Solution',
            content: 'Rayze has built MCP-Enhanced Agents in our AI Lab, integrating ready-made MCP types—Multi-Model Context Orchestrator, Secure Data Context Gateway, and Real-Time Context Streamer—with agents including Data Quality Auditor, Compliance Checker, and Process Optimizer. Rayze engineers customize these for privacy, real-time data, and workflow optimization.'
          }
        ],
        impact: 'When implemented at clients, these agents deliver 30% faster automation, cut compliance risks by 50%, and optimize processes, enhancing productivity across all sectors.'
      }
    }
  };

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
                <div className="pillar-overview-card" onClick={() => document.getElementById('experiment-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="pillar-icon">🚀</div>
                  <h3>Experiment</h3>
                  <p>Rayze Lab provides a secure LLM platform to experiment with your AI Agents with your mock data</p>
                </div>
                <div className="pillar-overview-card" onClick={() => document.getElementById('think-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="pillar-icon">🧠</div>
                  <h3>Think</h3>
                  <p>Strategic insights from client engagements and cutting-edge thought leadership.</p>
                </div>
                <div className="pillar-overview-card" onClick={() => document.getElementById('build-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
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

      {/* Pillar 1: Experiment */}
      <section id="experiment-section" className="ai-playground-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">🚀</span> Experiment</h2>
            <p>Secure LLM platform to experiment with AI Agents & workflows. <br/>Bring your own mock data for pilot development.</p>
          </div>
          
          <div className="feature-section">
            <div className="feature-cards-column">
              {Object.values(featureCards).map(card => (
                <div 
                  key={card.id}
                  className={`feature-card compact ${selectedCard === card.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCard(card.id)}
                >
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            
            <div className="detail-view-panel">
              <div className="detail-content">
                <h2 className="case-study-title">{featureCards[selectedCard].detailContent.subtitle}</h2>
                <p className="case-study-subtitle theme-color">Accelerating enterprise AI transformation through secure, scalable experimentation platforms.</p>
                
                <div className="metrics-row">
                  <div className="metric-large">
                    <div className="metric-number">{selectedCard === 'sandbox' ? '30%' : selectedCard === 'agentic_showdown' ? '30%' : '30%'}</div>
                    <div className="metric-description">{selectedCard === 'sandbox' ? 'Faster experimentation time' : selectedCard === 'agentic_showdown' ? 'Development speedup' : 'Faster deployment'}</div>
                  </div>
                  <div className="metric-large">
                    <div className="metric-number">{selectedCard === 'sandbox' ? '50%' : selectedCard === 'agentic_showdown' ? '25%' : '40%'}</div>
                    <div className="metric-description">{selectedCard === 'sandbox' ? 'Reduction in setup delays' : selectedCard === 'agentic_showdown' ? 'Reduction in trial costs' : 'Model accuracy improvement'}</div>
                  </div>
                </div>
                
                {featureCards[selectedCard].detailContent.sections.map((section, index) => (
                  <div key={index} className="case-study-section">
                    <h4 className="section-label">{section.title.toUpperCase()}</h4>
                    <p className="section-content">{section.content}</p>
                  </div>
                ))}
                
                <div className="case-study-section">
                  <h4 className="section-label">IMPACT</h4>
                  <p className="section-content">{featureCards[selectedCard].detailContent.impact}</p>
                </div>
                
                <div className="case-study-quote">
                  <p>
                    {selectedCard === 'sandbox' && "Unlock AI potential without the wait—our sandboxes turn months into minutes for every team."}
                    {selectedCard === 'agentic_showdown' && "Simplify your AI journey—choose the perfect tool with confidence and speed."}
                    {selectedCard === 'fine_tuning' && "Customize with confidence—our playground turns risks into rewards, fast."}
                  </p>
                  <div className="quote-attribution">
                    <strong>Rayze AI Leadership</strong><br/>
                    <span className="quote-title">INNOVATION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Think */}
      <section id="think-section" className="thought-leadership-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">🧠</span> Think</h2>
            <p>Evidence-based insights from enterprise AI implementations and strategic research for informed decision-making</p>
          </div>
          
          <div className="think-section">
            <div className="think-cards-column">
              {Object.values(thinkCards).map(card => (
                <div 
                  key={card.id}
                  className={`think-card compact ${selectedThinkCard === card.id ? 'selected' : ''}`}
                  onClick={() => setSelectedThinkCard(card.id)}
                >
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            
            <div className="think-detail-panel">
              <div className="detail-content">
                <h2 className="case-study-title">{thinkCards[selectedThinkCard].detailContent.subtitle}</h2>
                <p className="case-study-subtitle">Strategic insights from real-world AI implementations driving enterprise transformation.</p>
                
                <div className="metrics-row">
                  <div className="metric-large">
                    <div className="metric-number">{selectedThinkCard === 'agentic_ai' ? '40%' : selectedThinkCard === 'genai_divide' ? '30%' : '30%'}</div>
                    <div className="metric-description">{selectedThinkCard === 'agentic_ai' ? 'Reduction in testing failures' : selectedThinkCard === 'genai_divide' ? 'Productivity gains' : 'Faster insights'}</div>
                  </div>
                  <div className="metric-large">
                    <div className="metric-number">{selectedThinkCard === 'agentic_ai' ? '30%' : selectedThinkCard === 'genai_divide' ? '20%' : '40%'}</div>
                    <div className="metric-description">{selectedThinkCard === 'agentic_ai' ? 'Faster iteration cycles' : selectedThinkCard === 'genai_divide' ? 'Reduction in pilot failures' : 'Efficiency gains'}</div>
                  </div>
                </div>
                
                {thinkCards[selectedThinkCard].detailContent.sections.map((section, index) => (
                  <div key={index} className="case-study-section">
                    <h4 className="section-label">{section.title.toUpperCase()}</h4>
                    <p className="section-content">{section.content}</p>
                  </div>
                ))}
                
                <div className="case-study-section">
                  <h4 className="section-label">IMPACT</h4>
                  <p className="section-content">{thinkCards[selectedThinkCard].detailContent.impact}</p>
                </div>
                
                <div className="case-study-quote">
                  <p>
                    {selectedThinkCard === 'agentic_ai' && "Tame the infinite—our framework brings predictability to GenAI testing, turning risks into reliable results."}
                    {selectedThinkCard === 'genai_divide' && "Bridge the divide—turn pilots into profits with Rayze's strategies."}
                    {selectedThinkCard === 'data_estate' && "Tame data chaos—unlock GenAI with Rayze's revitalization blueprint."}
                  </p>
                  <div className="quote-attribution">
                    <strong>Rayze AI Leadership</strong><br/>
                    <span className="quote-title">THOUGHT LEADERSHIP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Build */}
      <section id="build-section" className="build-leadership-section">
        <div className="container">
          <div className="pillar-header">
            <h2><span className="pillar-icon">⚡</span> Build</h2>
            <p>Production-ready AI agents, tools, and frameworks built in our lab for immediate enterprise deployment and acceleration</p>
          </div>
          
          <div className="think-section">
            <div className="think-cards-column">
              {Object.values(buildCards).map(card => (
                <div 
                  key={card.id}
                  className={`think-card compact ${selectedBuildCard === card.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBuildCard(card.id)}
                >
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            
            <div className="think-detail-panel">
              <div className="detail-content">
                <h2 className="case-study-title">{buildCards[selectedBuildCard].detailContent.subtitle}</h2>
                <p className="case-study-subtitle">Production-ready AI solutions from our lab enabling immediate enterprise deployment and acceleration.</p>
                
                <div className="metrics-row">
                  <div className="metric-large">
                    <div className="metric-number">{
                      selectedBuildCard === 'genai_maintenance' ? '30%' : 
                      selectedBuildCard === 'utility_library' ? '30%' :
                      selectedBuildCard === 'enterprise_connector' ? '30%' :
                      selectedBuildCard === 'data_pipeline' ? '30%' :
                      selectedBuildCard === 'monitoring_dashboard' ? '30%' :
                      '30%'
                    }</div>
                    <div className="metric-description">{
                      selectedBuildCard === 'genai_maintenance' ? 'Faster retraining cycles' :
                      selectedBuildCard === 'utility_library' ? 'Faster prototyping' :
                      selectedBuildCard === 'enterprise_connector' ? 'Faster integration' :
                      selectedBuildCard === 'data_pipeline' ? 'Faster data prep' :
                      selectedBuildCard === 'monitoring_dashboard' ? 'Faster debugging' :
                      'Faster process automation'
                    }</div>
                  </div>
                  <div className="metric-large">
                    <div className="metric-number">{
                      selectedBuildCard === 'genai_maintenance' ? '50%' :
                      selectedBuildCard === 'utility_library' ? '25%' :
                      selectedBuildCard === 'enterprise_connector' ? '50%' :
                      selectedBuildCard === 'data_pipeline' ? '70%' :
                      selectedBuildCard === 'monitoring_dashboard' ? '99%' :
                      '50%'
                    }</div>
                    <div className="metric-description">{
                      selectedBuildCard === 'genai_maintenance' ? 'Reduction in maintenance effort' :
                      selectedBuildCard === 'utility_library' ? 'Reduction in dev time' :
                      selectedBuildCard === 'enterprise_connector' ? 'Reduction in setup delays' :
                      selectedBuildCard === 'data_pipeline' ? 'Reduction in labeling effort' :
                      selectedBuildCard === 'monitoring_dashboard' ? 'Uptime assurance' :
                      'Reduction in compliance risks'
                    }</div>
                  </div>
                </div>
                
                {buildCards[selectedBuildCard].detailContent.sections.map((section, index) => (
                  <div key={index} className="case-study-section">
                    <h4 className="section-label">{section.title.toUpperCase()}</h4>
                    <p className="section-content">{section.content}</p>
                  </div>
                ))}
                
                <div className="case-study-section">
                  <h4 className="section-label">IMPACT</h4>
                  <p className="section-content">{buildCards[selectedBuildCard].detailContent.impact}</p>
                </div>
                
                <div className="case-study-quote">
                  <p>
                    {selectedBuildCard === 'genai_maintenance' && "Keep your GenAI sharp—automate maintenance and save 50% of the effort with our agent."}
                    {selectedBuildCard === 'utility_library' && "Build smarter, faster—unlock prototyping power with our utility library."}
                    {selectedBuildCard === 'enterprise_connector' && "Connect effortlessly—integrate GenAI in days, not months with our SDK."}
                    {selectedBuildCard === 'data_pipeline' && "Clean data, fast results—transform your pipelines with our tool."}
                    {selectedBuildCard === 'monitoring_dashboard' && "Monitor with precision—keep your GenAI at peak performance with our dashboard."}
                    {selectedBuildCard === 'mcp_agents' && "Unify and optimize—master GenAI with our MCP-powered agents."}
                  </p>
                  <div className="quote-attribution">
                    <strong>Rayze AI Leadership</strong><br/>
                    <span className="quote-title">PRODUCTION READY</span>
                  </div>
                </div>
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