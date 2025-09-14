import "./client-stories-page.scss";
import React, { useEffect, useState } from "react";

export default function ClientStoriesPage() {
  const [selectedDigitalStory, setSelectedDigitalStory] = useState('tech_modernization');
  const [selectedAIStory, setSelectedAIStory] = useState('data_ai_transformation');
  const [selectedGrowthStory, setSelectedGrowthStory] = useState('offshore_talent');

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  // Client Stories Data Structure
  const clientStoryCategories = {
    digital_transformation: {
      id: 'digital_transformation',
      title: 'Digital Transformation Excellence',
      icon: '🚀',
      description: 'Modernizing technology platforms and ERP solutions for enterprise growth',
      stories: {
        tech_modernization: {
          id: 'tech_modernization',
          title: 'Technology Modernization',
          subtitle: 'Fortune 500 Financial Services Transformation',
          challenge: 'A leading financial services company struggled with legacy systems that hindered their ability to deliver business value quickly. Manual processes and outdated development practices created bottlenecks, reducing time-to-market by 40% and limiting competitive advantage.',
          solution: 'Rayze implemented a comprehensive modernization strategy including cloud migration, DevOps transformation, and microservices architecture. We established CI/CD pipelines, automated testing frameworks, and modern development practices across 12 engineering teams.',
          impact: 'Delivered 60% faster time-to-market, reduced operational costs by 35%, and enabled the client to launch 3 new digital products within 6 months. Development velocity increased by 45% while maintaining 99.9% system reliability.',
          metrics: [{ number: '60%', label: 'Faster time-to-market' }, { number: '35%', label: 'Cost reduction' }],
          link: '/story1'
        },
        erp_transformation: {
          id: 'erp_transformation', 
          title: 'Power up your ERP solution',
          subtitle: 'Global Manufacturing ERP Modernization',
          challenge: 'A multinational manufacturing company needed to upgrade their legacy ERP system to support rapid business expansion into new markets. The existing system couldn\'t scale and lacked real-time visibility into global operations.',
          solution: 'Rayze led a comprehensive ERP transformation using modern cloud-native solutions with real-time analytics, automated workflows, and integrated supply chain management. We implemented a phased migration approach to minimize business disruption.',
          impact: 'Enabled expansion into 5 new markets, improved operational efficiency by 40%, and provided real-time visibility across global operations. The new system handles 3x the transaction volume while reducing processing time by 65%.',
          metrics: [{ number: '40%', label: 'Efficiency improvement' }, { number: '65%', label: 'Faster processing' }],
          link: '/story6'
        }
      }
    },
    ai_data_excellence: {
      id: 'ai_data_excellence',
      title: 'AI & Data Excellence',
      icon: '🧠',
      description: 'Harnessing AI and data science to solve complex business challenges',
      stories: {
        data_ai_transformation: {
          id: 'data_ai_transformation',
          title: 'Win with Data & AI',
          subtitle: 'Healthcare AI-Powered Diagnostics Platform',
          challenge: 'A healthcare organization needed to leverage AI to improve diagnostic accuracy and reduce patient wait times. Existing manual processes were error-prone and couldn\'t scale with growing patient volumes.',
          solution: 'Rayze developed an AI-powered diagnostic platform using machine learning models trained on medical imaging data. We implemented real-time data pipelines, automated quality checks, and integrated the solution with existing EMR systems.',
          impact: 'Achieved 95% diagnostic accuracy, reduced patient wait times by 50%, and processed 10x more cases daily. The platform now supports 15 hospitals and has analyzed over 1 million medical images.',
          metrics: [{ number: '95%', label: 'Diagnostic accuracy' }, { number: '50%', label: 'Reduced wait times' }],
          link: '/story2'
        },
        data_science_democratization: {
          id: 'data_science_democratization',
          title: 'Democratize Data Science',
          subtitle: 'Retail Chain ML Operations Optimization',
          challenge: 'A major retail chain faced escalating ML infrastructure costs and inconsistent model performance across stores. Data science teams were siloed, leading to duplicated efforts and poor model governance.',
          solution: 'Rayze streamlined ML operations with automated model deployment pipelines, centralized feature stores, and self-service analytics platforms. We implemented MLOps best practices and established model monitoring and governance frameworks.',
          impact: 'Reduced ML infrastructure costs by 70%, improved model prediction accuracy by 35%, and enabled 200+ business users to access insights. Time-to-deployment for new models decreased from weeks to hours.',
          metrics: [{ number: '70%', label: 'Cost reduction' }, { number: '35%', label: 'Better predictions' }],
          link: '/story3'
        },
        analytics_scaling: {
          id: 'analytics_scaling',
          title: 'Scale up your Analytics',
          subtitle: 'E-commerce Analytics Engine Optimization',
          challenge: 'An e-commerce platform\'s analytics engine couldn\'t handle peak traffic loads, causing system crashes during high-demand periods and limiting real-time insights for business decisions.',
          solution: 'Rayze redesigned the analytics architecture with distributed computing frameworks, real-time stream processing, and auto-scaling capabilities. We implemented data lake solutions and optimized query performance.',
          impact: 'System now handles 100x more concurrent users, provides real-time insights during peak traffic, and supports complex analytics queries in seconds. Revenue attribution accuracy improved by 85%.',
          metrics: [{ number: '100x', label: 'More concurrent users' }, { number: '85%', label: 'Better attribution' }],
          link: '/story5'
        }
      }
    },
    strategic_growth: {
      id: 'strategic_growth',
      title: 'Strategic Growth & Scaling',
      icon: '⚡',
      description: 'Building strategic offshore talent and scaling engineering capabilities',
      stories: {
        offshore_talent: {
          id: 'offshore_talent',
          title: 'Build Strategic Offshore Talent',
          subtitle: 'FinTech Offshore Engineering Team Expansion',
          challenge: 'A fast-growing FinTech startup needed to scale their engineering team rapidly while maintaining code quality and security standards. Local talent acquisition was too slow and expensive to meet growth targets.',
          solution: 'Rayze established a strategic offshore development center with hand-picked senior engineers. We implemented robust security protocols, established 24/7 development cycles, and created seamless collaboration tools between onshore and offshore teams.',
          impact: 'Expanded engineering capacity by 300%, reduced development costs by 60%, and maintained 99.8% security compliance. Offshore team delivered 8 major features while accelerating overall product roadmap by 6 months.',
          metrics: [{ number: '300%', label: 'Capacity expansion' }, { number: '60%', label: 'Cost reduction' }],
          link: '/story4'
        }
      }
    }
  };

  return (
    <div className="client-stories-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <pre className="title">Our Clients</pre>
            <br/><br/>
            <h1 className="tagline">Our Clients have Big Ambitions</h1><br/>
            We seamlessly embedding AI into your legacy stack, modernizing it along the way. Navigating the intricacies of your existing infrastructure, skills, and processes is our expertise.<br/> <span style={{color: "var(--theme-color)"}}>We focus ondelivering measurable business outcomes</span>
            
            <div className="manifesto">
              <div className="category-summary">
                <div className="category-overview-card" onClick={() => document.getElementById('digital-transformation-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="category-icon">🚀</div>
                  <h3>Digital Transformation</h3>
                  <p>Modernizing technology platforms and ERP solutions to accelerate business growth and operational efficiency.</p>
                </div>
                <div className="category-overview-card" onClick={() => document.getElementById('ai-data-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="category-icon">🧠</div>
                  <h3>AI & Data Excellence</h3>
                  <p>Harnessing artificial intelligence and advanced analytics to solve complex business challenges.</p>
                </div>
                <div className="category-overview-card" onClick={() => document.getElementById('strategic-growth-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="category-icon">⚡</div>
                  <h3>Strategic Growth</h3>
                  <p>Building offshore talent capabilities and scaling engineering teams for rapid business expansion.</p>
                </div>
              </div>
            </div>
            <br/><br/>
            <div className="key-metrics">
              <div className="metric">
                <span className="metric-number">98%</span>
                <span className="metric-label">Client Success Rate</span>
              </div>
              <div className="metric">
                <span className="metric-number">50+</span>
                <span className="metric-label">Enterprise Clients</span>
              </div>
              <div className="metric">
                <span className="metric-number">$100M+</span>
                <span className="metric-label">Client Value Created</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Transformation Stories */}
      <section id="digital-transformation-section" className="digital-transformation-section">
        <div className="container">
          <div className="category-header">
            <h2><span className="category-icon">🚀</span> Digital Transformation Excellence</h2>
            <p>Modernizing technology platforms and ERP solutions to accelerate business growth and operational efficiency</p>
          </div>
          
          <div className="story-section">
            <div className="story-cards-column">
              {Object.values(clientStoryCategories.digital_transformation.stories).map(story => (
                <div 
                  key={story.id}
                  className={`story-card compact ${selectedDigitalStory === story.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDigitalStory(story.id)}
                >
                  <h4>{story.title}</h4>
                  <p>{story.subtitle}</p>
                </div>
              ))}
            </div>
            
            <div className="story-detail-panel">
              <div className="detail-content">
                <h2 className="case-study-title">{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].subtitle}</h2>
                <p className="case-study-subtitle">Enterprise technology transformation delivering measurable business outcomes</p>
                
                <div className="metrics-row">
                  {clientStoryCategories.digital_transformation.stories[selectedDigitalStory].metrics.map((metric, index) => (
                    <div key={index} className="metric-large">
                      <div className="metric-number">{metric.number}</div>
                      <div className="metric-description">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">CHALLENGE</h4>
                  <p className="section-content">{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].challenge}</p>
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">SOLUTION</h4>
                  <p className="section-content">{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].solution}</p>
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">IMPACT</h4>
                  <p className="section-content">{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].impact}</p>
                </div>
                
                <div className="case-study-quote">
                  <p>"Rayze transformed our technology landscape, enabling us to deliver business value at unprecedented speed while maintaining enterprise-grade reliability."</p>
                  <div className="quote-attribution">
                    <strong>Fortune 500 CTO</strong><br/>
                    <span className="quote-title">DIGITAL TRANSFORMATION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI & Data Excellence Stories */}
      <section id="ai-data-section" className="ai-data-section">
        <div className="container">
          <div className="category-header">
            <h2><span className="category-icon">🧠</span> AI & Data Excellence</h2>
            <p>Harnessing artificial intelligence and advanced analytics to solve complex business challenges</p>
          </div>
          
          <div className="story-section">
            <div className="story-cards-column">
              {Object.values(clientStoryCategories.ai_data_excellence.stories).map(story => (
                <div 
                  key={story.id}
                  className={`story-card compact ${selectedAIStory === story.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAIStory(story.id)}
                >
                  <h4>{story.title}</h4>
                  <p>{story.subtitle}</p>
                </div>
              ))}
            </div>
            
            <div className="story-detail-panel">
              <div className="detail-content">
                <h2 className="case-study-title">{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].subtitle}</h2>
                <p className="case-study-subtitle">Leveraging AI and data science to drive innovation and competitive advantage</p>
                
                <div className="metrics-row">
                  {clientStoryCategories.ai_data_excellence.stories[selectedAIStory].metrics.map((metric, index) => (
                    <div key={index} className="metric-large">
                      <div className="metric-number">{metric.number}</div>
                      <div className="metric-description">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">CHALLENGE</h4>
                  <p className="section-content">{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].challenge}</p>
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">SOLUTION</h4>
                  <p className="section-content">{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].solution}</p>
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">IMPACT</h4>
                  <p className="section-content">{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].impact}</p>
                </div>
                
                <div className="case-study-quote">
                  <p>"Rayze's AI solutions transformed our operations, delivering insights and automation that seemed impossible just months ago."</p>
                  <div className="quote-attribution">
                    <strong>Healthcare Innovation Director</strong><br/>
                    <span className="quote-title">AI TRANSFORMATION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Growth Stories */}
      <section id="strategic-growth-section" className="strategic-growth-section">
        <div className="container">
          <div className="category-header">
            <h2><span className="category-icon">⚡</span> Strategic Growth & Scaling</h2>
            <p>Building offshore talent capabilities and scaling engineering teams for rapid business expansion</p>
          </div>
          
          <div className="story-section">
            <div className="story-cards-column">
              {Object.values(clientStoryCategories.strategic_growth.stories).map(story => (
                <div 
                  key={story.id}
                  className={`story-card compact ${selectedGrowthStory === story.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGrowthStory(story.id)}
                >
                  <h4>{story.title}</h4>
                  <p>{story.subtitle}</p>
                </div>
              ))}
            </div>
            
            <div className="story-detail-panel">
              <div className="detail-content">
                <h2 className="case-study-title">{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].subtitle}</h2>
                <p className="case-study-subtitle">Strategic talent acquisition and engineering scaling for accelerated growth</p>
                
                <div className="metrics-row">
                  {clientStoryCategories.strategic_growth.stories[selectedGrowthStory].metrics.map((metric, index) => (
                    <div key={index} className="metric-large">
                      <div className="metric-number">{metric.number}</div>
                      <div className="metric-description">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">CHALLENGE</h4>
                  <p className="section-content">{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].challenge}</p>
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">SOLUTION</h4>
                  <p className="section-content">{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].solution}</p>
                </div>
                
                <div className="case-study-section">
                  <h4 className="section-label">IMPACT</h4>
                  <p className="section-content">{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].impact}</p>
                </div>
                
                <div className="case-study-quote">
                  <p>"Rayze didn't just provide talent—they delivered a strategic partnership that transformed our engineering capabilities and accelerated our growth trajectory."</p>
                  <div className="quote-attribution">
                    <strong>FinTech CEO</strong><br/>
                    <span className="quote-title">STRATEGIC SCALING</span>
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
          <h2>Proven Client Success <span className="theme-color">Methodology</span></h2>
          
          <div className="timeline-comparison">
            <div className="timeline-item before">
              <div className="timeline-header">Traditional Approach</div>
              <div className="timeline-duration">18-24 months</div>
              <div className="timeline-phases">
                <div className="phase">Requirements Gathering (4-6 months)</div>
                <div className="phase">Vendor Selection (3-4 months)</div>
                <div className="phase">Development & Integration (8-12 months)</div>
                <div className="phase">Testing & Rollout (3-4 months)</div>
              </div>
            </div>

            <div className="timeline-arrow">→</div>

            <div className="timeline-item after">
              <div className="timeline-header">Rayze Partnership Approach</div>
              <div className="timeline-duration">10-14 months</div>
              <div className="timeline-phases">
                <div className="phase accelerated">Strategic Assessment (2-3 weeks)</div>
                <div className="phase accelerated">Rapid Prototyping (1-2 months)</div>
                <div className="phase accelerated">Agile Development (6-8 months)</div>
                <div className="phase accelerated">Continuous Deployment (2-3 months)</div>
              </div>
            </div>
          </div>

          <div className="methodology">
            <h3>Our Client Success Framework</h3>
            <div className="method-grid">
              <div className="method-card">
                <h4>Strategic Assessment</h4>
                <p>Deep dive into business objectives, technical landscape, and growth goals to create tailored transformation roadmaps.</p>
              </div>
              <div className="method-card">
                <h4>Agile Execution</h4>
                <p>Iterative development approach with continuous feedback loops ensuring alignment with business outcomes.</p>
              </div>
              <div className="method-card">
                <h4>Knowledge Transfer</h4>
                <p>Comprehensive training and documentation ensuring client teams can maintain and extend solutions independently.</p>
              </div>
              <div className="method-card">
                <h4>Ongoing Partnership</h4>
                <p>Long-term strategic support with performance monitoring and continuous optimization of delivered solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Partner with <span className="theme-color">Rayze</span></h2>
          <p>Join 50+ enterprise clients who have transformed their businesses through strategic technology partnerships. 
             Schedule a consultation to explore how we can accelerate your digital transformation journey.</p>
          <div className="cta-buttons">
            <a href="mailto:jc@rayze.xyz" className="cta-primary">Schedule Strategic Consultation</a>
            <a href="/case-studies" className="cta-secondary">Download Case Studies</a>
            <a href="/capabilities" className="cta-secondary">Explore Our Capabilities</a>
          </div>
        </div>
      </section>

    </div>
  );
}