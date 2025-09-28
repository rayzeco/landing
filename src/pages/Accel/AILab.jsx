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
            content: 'Rayze implemented pre-configured cloud sandboxes directly in client environments, packing them with 3+ open-source LLMs (e.g., lightweight Phi-3 for efficiency vs. robust Llama 3 for depth). These deployed environments were enhanced with tools like Hugging Face and LangChain to allow client teams to instantly upload data and run side-by-side comparisons. Observability via MLflow was configured to track experiments, while multimodal extensions (e.g., vision-language models) were enabled to add versatility for client use cases.'
          }
        ],
        benefits: [
          { icon: '⚡', text: '30% faster iteration cycles with instant cloud access' },
          { icon: '⏱️', text: '50% reduction in setup delays - months turned into minutes' },
          { icon: '🛠️', text: 'Pre-configured with Hugging Face, LangChain, and MLflow' },
          { icon: '🔍', text: 'Multimodal extensions for vision-language model testing' }
        ],
        impact: 'When implemented at clients, these sandboxes enabled teams to achieve 30% faster iteration cycles and 50% reductions in setup delays, accelerating POC-to-production. Quick wins included streamlined testing across use cases, improved team productivity, and reduced dependency on niche skills. Rayze\'s self-sufficient, no-config plug-and-play design scaled across client environments, driving innovation.'
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
            content: 'Rayze deployed interactive showdowns at client organizations that pit top frameworks head-to-head—n8n for no-code automation vs. CrewAI for multi-agent orchestration vs. LangChain for RAG-enhanced chains—running live simulations on client prompts with real-time benchmarks tailored to each client\'s vertical and KPIs.'
          }
        ],
        benefits: [
          { icon: '⚔️', text: 'Side-by-side framework comparisons with real-time benchmarks' },
          { icon: '📊', text: 'Task completion speed and error rate analysis by vertical' },
          { icon: '🔧', text: 'Export configurations to your stack for seamless integration' },
          { icon: '💰', text: 'ROI Simulator showing projected time savings (up to 25%)' }
        ],
        impact: 'At client sites these platform showdowns reduced internal resistance and trial-and-error costs (common in 60% of AI adoptions), empowering non-experts to validate tools against business KPIs like cost reduction in back-office operations and contributing to up to 25% projected time savings in implementation and rollout.'
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
            content: 'Struggling to balance customization with security in regulated industries? Fine-tuning is a 2025 hotspot for clients, but 65% of corporations cite ethics/risk as barriers (Intel\'s 2025 AI challenges).'
          },
          {
            title: 'The Solution',
            content: 'Rayze implemented a secure fine-tuning playground at client organizations: teams upload anonymized or mock data, experiment with and without fine-tuning (e.g., BERT for healthcare compliance checks), and compare outputs side-by-side against off-the-shelf versions. Built-in bias audits, governance rails, and one-click rollout mechanisms were configured to meet client compliance requirements and support production deployments.'
          }
        ],
        benefits: [
          { icon: '🔒', text: 'HIPAA/SOC 2 ready with built-in governance rails' },
          { icon: '⚖️', text: 'Ethical AI features with red-teaming via Hugging Face' },
          { icon: '📈', text: 'Before/after comparisons showing accuracy improvements' },
          { icon: '🚀', text: 'One-click rollouts without exposing core infrastructure' }
        ],
        impact: 'When used by clients, this playground enabled ~40% accuracy gains vs. baseline models and supported one-click rollouts into production while significantly reducing the time required for legal and compliance reviews. Client teams gained confidence to prototype compliant solutions quickly without lengthy governance delays.'
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
            content: 'Companies developing GenAI agents and chatbots face a critical hurdle: infinite user inputs and paths make exhaustive testing impossible, leaving uncertainty about which prompts or questions trigger hallucinations or incorrect results—potentially causing detrimental errors like misinformation or flawed decisions. This unpredictability erodes trust, with 60% of pilots failing post-deployment due to uncaught edge cases.'
          },
          {
            title: 'Solution', 
            content: 'Rayze deployed an advanced testing framework at client sites that generates diverse personas based on customer segmentation (e.g., for retail) to simulate varied behaviors and automatically crafts comprehensive test cases for each persona. The framework checks for predictable, compliant answers and boundary rules, and uses reinforcement-learning-informed mechanisms to refine tests in real-time through production feedback loops. Seamless CI/CD integration was installed to plug into client pipelines using tools like Selenium for UI testing and Postman for API validation, enabling automated end-to-end assurance. The testing evaluation framework was customized per client to handle vast input spaces via adaptive red-teaming and client-specific metrics.'
          }
        ],
        impact: 'Clients who adopted the framework reported 40% fewer testing failures and 30% faster iteration cycles, turning previously unpredictable agents into dependable, production-ready systems with broader coverage of real-world scenarios. This reduced rollout risk and materially increased stakeholder trust.'
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
            content: 'Leaders encounter GenAI hype without organization-wide impact, with resistance and skills gaps blocking adoption— Adoption falters due to barriers such as skills, regulation and job fears which ultimately hinders ROI.'
          },
          {
            title: 'Solution',
            content: 'Rayze partnered with clients to operationalize a focused roadmap: prioritize three high-ROI use cases (e.g., back-office automation), run targeted upskilling workshops, and instrument prototypes with KPIs. The Rayze Strategy Squad validated and accelerated prototypes into production using end-to-end models and governance aligned to client risk tolerances.'
          }
        ],
        impact: 'Clients converted pilots into measurable outcomes—realizing ~30% productivity boosts and ~20% fewer failures—while overcoming internal resistance and skills gaps. These implementations produced sustainable ROI and enabled scaled adoption across functions.'
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
            content: 'Corporate data estates are fragmented and insecure, causing 30–50% GenAI failures due to poor inputs—70% face quality/privacy issues (McKinsey Global AI Survey). Challenges like silos, bias, and governance gaps lead to hallucinations and 40% losses.'
          },
          {
            title: 'Solution',
            content: 'Rayze implemented a data-estate modernization blueprint at client organizations: auditing and unifying data into lakes (e.g., Databricks), automating cleansing with tools like Great Expectations, and adding lineage tracking for governance. The Engineering Squad rolled out phased hybrid-cloud modernization and embedded Agentic Blocks for governance while prioritizing high-value datasets to accelerate accurate GenAI outcomes.'
          }
        ],
        impact: 'Clients realized 30% faster insights and 40% efficiency gains in analytics and ML workflows, along with ~30% TCO reductions in targeted modernization efforts. The now-governed, contextual data estates materially improved GenAI reliability and reduced hallucination risk.'
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
            content: 'Corporations across industries rely on GenAI, but 20–30% accuracy loss from stale vector databases hampers outputs like chatbots or search tools. Manual upkeep is time-consuming and error-prone, a key issue for AI development workflow brittleness in production deployments.'
          },
          {
            title: 'Solution',
            content: 'Rayze built and deployed a GenAI Maintenance Agent at client environments to automate cleaning of vector databases (e.g., removing duplicates and outdated embeddings), retrain models on fresh data, and run retesting for drift. The agent can be deployed as a cron-job or SDK and was instrumented with observability and alerting by Rayze to ensure smooth operation in production.'
          }
        ],
        impact: 'When implemented at clients, the Maintenance Agent produced 30% faster retraining cycles and 50% reduction in manual maintenance effort, improving model freshness and reliability while lowering ongoing operational cost.'
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
            content: 'Rayze developed and rolled out a Foundational GenAI Utility Library in our AI Lab and deployed it into client projects, offering pre-built utilities for prompt engineering, RAG chaining, and evaluations tailored for common GenAI tasks. The Strategy Squad added Rayze blocks to make the library plug-and-play within client pipelines.'
          }
        ],
        impact: 'Clients using the library saw ~30% faster prototyping and ~25% reduction in development time, producing more consistent MVPs and accelerating time-to-market for validated features.'
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
            content: 'Siloed business systems delay GenAI adoption by 50% due to integration challenges, risking data breaches and inefficiencies. Companies need reliable connectors to unlock real-time applications.'
          },
          {
            title: 'Solution',
            content: 'Rayze created and deployed an Enterprise Connector SDK within client infrastructures, delivering pre-configured connectors for HRIS, ERP, and CRM systems with secure API wrappers and schema mapping. The Rayze engineering team customized these connectors to fit each client\'s stack and security posture for rapid scaling.'
          }
        ],
        impact: 'When implemented at clients, the SDK produced 30% faster integrations and 50% reductions in setup delays, enabling real-time GenAI applications without months-long integration projects.'
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
            content: 'Poor data quality hampers 70% of AI projects, inflating prep time to and causing model failures due to messy or unlabeled data. Companies need efficient data solutions.'
          },
          {
            title: 'Solution',
            content: 'Rayze built and deployed a Data Engineering Pipeline Tool at clients, designed to detect outliers, clean datasets automatically, and apply weak-supervision labeling that exports to standard training formats. The tool was integrated with Rayze\'s Talent Platform to provide end-to-end support for productionizing datasets.'
          }
        ],
        impact: 'Clients experienced 30% faster data preparation and 70% reduction in labeling effort, enabling delivery of clean, production-ready datasets for GenAI training.'
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
            content: 'Rayze developed and deployed a GenAI Monitoring Dashboard at client organizations that tracks input drift and output quality, generates alerts, and integrates with tools like Grafana. Strategy Squads worked with clients to define custom metrics and alerting thresholds tailored to their production SLAs.'
          }
        ],
        impact: 'When implemented at clients, the dashboard delivered 30% faster debugging and helped maintain 99% uptime, preserving trust and performance for live GenAI applications.'
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
            content: 'Companies face 70% data quality issues and compliance risks with GenAI, inflating prep time and risking fines. Manual processes slow productivity by 40%, per MIT NANDA 2025, needing unified solutions.'
          },
          {
            title: 'Solution',
            content: 'Rayze built MCP-Enhanced Agents in our AI Lab and deployed them for clients, integrating Multi-Model Context Orchestrator, Secure Data Context Gateway, and Real-Time Context Streamer capabilities with agents such as Data Quality Auditor, Compliance Checker, and Process Optimizer. The Rayze team customized these agents for client privacy needs, real-time data access, and workflow optimization.'
          }
        ],
        impact: 'When implemented at clients, these MCP-Enhanced Agents delivered 30% faster process automation, 50% reduction in compliance risks, and tangible process optimization—reducing manual steps and improving regulatory posture across impacted lines of business.'
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
                <div className="method-content">
                  <h4>Automated Workflows</h4>
                  <p>MCP-powered automation handles 70% of repetitive coding tasks, validated across 50+ industry datasets.</p>
                </div>
              </div>
              <div className="method-card">
                <div className="method-content">
                  <h4>Pre-built Components</h4>
                  <p>Production-ready templates and frameworks eliminate weeks of boilerplate development.</p>
                </div>
              </div>
              <div className="method-card">
                <div className="method-content">
                  <h4>Agile Sprint Enhancement</h4>
                  <p>AI-assisted development increases sprint velocity by 40% through predictive modeling.</p>
                </div>
              </div>
              <div className="method-card">
                <div className="method-content">
                  <h4>A/B Testing Validation</h4>
                  <p>Continuous improvement through data-driven optimization of our acceleration tools.</p>
                </div>
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