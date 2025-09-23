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
          title: 'Enterprise Supplier Engagement Platform',
          subtitle: 'Transforming Supplier Engagement with AI-Powered Insights',
          challenge: 'A leading enterprise struggled with stagnant supplier engagement and a fragmented data landscape, hindering growth and profitability. Suppliers faced challenges accessing actionable insights from siloed datasets, resulting in a low Contract Utilization Rate (CUR) and missed opportunities. The need for a modern, AI-driven solution to empower suppliers with tailored strategies became critical to stay competitive.',
          solution: 'The Rayze AI Lab partnered with the client to deliver the Supplier Central web application. Leveraging existing datasets, we integrated AI-enhanced features to provide prescriptive, actionable insights and conversion measurements. The platform offers a seamless user experience with an intuitive interface, AI-generated swap suggestions, and product optimization algorithms. Our team\'s expertise in data integration, AI development, and UX design ensured a holistic view of supplier performance, driving tailored solutions that adapt to real-time needs.',
          impact: 'When implemented, Supplier Central transformed the client\'s supplier ecosystem, boosting the CUR by 40% through data-driven decisions and increasing supplier productivity by 30%. Suppliers gained a competitive edge with personalized strategies, while the client saw enhanced engagement and revenue growth. This success story showcases Rayze\'s ability to modernize legacy systems with embedded AI, delivering measurable value and long-term scalability.',
          customer_quote: 'Rayze transformed our fragmented supplier data into a unified AI-powered platform that revolutionized how we engage with partners. The 40% improvement in contract utilization has directly impacted our bottom line.',
          metrics: [{ number: '40%', label: 'Increase in Contract Utilization' }, { number: '30%', label: 'Boost in supplier productivity' }],
          link: '/story1'
        },
        erp_transformation: {
          id: 'erp_transformation', 
          title: 'Revolutionizing Payments with a Predictive Engine',
          subtitle: 'Transforming Financial Risk Management with AI-Powered Payment Predictions',
          challenge: 'A financial services client faced unpredictable payment behaviors, with delayed invoices and rising defaults eroding profitability. Traditional methods struggled to account for customer variability, market shifts, and seasonal trends, leaving the company vulnerable to cash flow disruptions. The need for a robust, AI-driven solution to forecast payments and mitigate risks became urgent.',
          solution: 'The Rayze AI Lab collaborated with the client to build a cutting-edge Payment Prediction Engine. This solution features a Days-to-Pay Model using regression to predict payment timing based on customer, invoice, and market factors; a Default Risk Classifier with binary classification to identify high-risk accounts; a Seasonal Adjustment System employing time-series decomposition to handle payment patterns; and an Industry Benchmarking Tool for comparative analysis using industry data. Integrated with the client\'s legacy systems, our team modernized their infrastructure, embedding AI to deliver actionable insights in real-time.',
          impact: 'When implemented, the engine transformed the client\'s payment operations, improving payment timeliness by 35% and reducing default rates by 40%. This enhanced cash flow predictability, minimized financial risks, and empowered strategic decision-making. Rayze\'s tailored approach ensured seamless adoption, showcasing our expertise in applied AI for sustainable growth.',
          customer_quote: 'The Payment Prediction Engine gave us unprecedented visibility into our cash flow. We went from reactive payment management to proactive financial planning, with 35% faster payments and 40% fewer defaults.',
          metrics: [{ number: '35%', label: 'Payment timeliness improvement' }, { number: '40%', label: 'Default rate reduction' }],
          link: '/story6'
        },
        collections_workflow: {
          id: 'collections_workflow',
          title: 'Streamlining Claims with Intelligent Workflow',
          subtitle: 'Revolutionizing Claims Processing Through AI-Driven Coordination and Timing Optimization',
          challenge: 'A commercial insurance services company struggled with inefficient claims processing, facing delayed approvals and stakeholder frustration due to generic communication approaches and poorly timed follow-ups. Manual processes failed to adapt to diverse claim types (emergency vs. planned, seasonal vs. regular), leading to missed SLAs and strained relationships with both clients and service providers.',
          solution: 'The Rayze AI Lab partnered with the client to develop an Intelligent Claims Processing Workflow. This solution includes a Claims Strategy Optimizer using multi-armed bandit algorithms to test various approval approaches, a Communication Timing Predictor model to identify optimal contact times for different stakeholder segments (adjusters, clients, vendors), a Message Personalization Engine with NLP to tailor communications by claim profile and urgency, and a Processing Success Calculator predicting approval likelihood by strategy. Integrated into the client\'s legacy systems, Rayze modernized their workflow, embedding AI for real-time adaptability and precision timing.',
          impact: 'When implemented, the workflow transformed the client\'s claims operations, boosting processing success rates by 45% and reducing unnecessary stakeholder contact by 30%. This enhanced client satisfaction, improved vendor relationships, and accelerated claim resolution times. The AI system particularly excelled during seasonal peak periods, maintaining performance quality while handling 3x normal volume.',
          customer_quote: 'Rayze\'s intelligent claims workflow completely transformed our operations. We\'re now processing 45% more claims successfully while maintaining better relationships through personalized, perfectly timed stakeholder communication.',
          metrics: [{ number: '45%', label: 'Claims processing success increase' }, { number: '30%', label: 'Unnecessary contact reduction' }],
          link: '/story7'
        }      }
    },
    ai_data_excellence: {
      id: 'ai_data_excellence',
      title: 'AI & Data Excellence',
      icon: '🧠',
      description: 'Harnessing AI and data science to solve complex business challenges',
      stories: {
        data_ai_transformation: {
          id: 'data_ai_transformation',
          title: 'Boosting Sales with AI-Powered Data Transformation',
          subtitle: 'Transforming MicroMobility Sales Through Unified Data Intelligence',
          challenge: 'A leader in the booming MicroMobility solutions market, with a strong sales engine and robust US presence, faced a critical challenge. A fragmented data strategy, plagued by disparate data stores, hindered their ability to decode customer behavior, stalling sales growth and competitive edge. The client needed a unified, AI-driven approach to turn data into actionable insights.',
          solution: 'The Rayze AI Lab partnered with the client to build a state-of-the-art data platform. We implemented a sophisticated cloud-based architecture using AWS and Azure, enabling meticulous data ingestion from siloed sources with Apache Kafka for real-time streaming and robust governance via Apache Airflow. Our solution featured advanced compute processes powered by Apache Spark for large-scale analytics, integrated with AI models (e.g., TensorFlow-based predictive algorithms) to deliver strategic product recommendations. Insightful dashboards, built on Power BI, provided real-time visibility, while an orchestration engine automated service dependencies for end-to-end efficiency. Collaborating closely with the client\'s engineering, product, and data science teams, we embedded AI into their legacy stack, modernizing operations and empowering self-sufficiency.',
          impact: 'When implemented, the platform transformed the client\'s sales strategy, driving a 50% increase in conversion rates through precise customer insights and cutting data processing time by 40%. Data scientists and analysts now leverage unified data for predictive modeling and growth strategies, positioning the client as a leader in the dynamic MicroMobility market. This showcases Rayze\'s ability to deliver scalable, production-ready AI solutions.',
          customer_quote: 'Rayze\'s data platform unlocked our potential, turning fragmented data into a sales superpower we never imagined.',
          metrics: [{ number: '50%', label: 'Sales conversion increase' }, { number: '40%', label: 'Data processing time reduction' }],
          link: '/story2'
        },
        data_science_democratization: {
          id: 'data_science_democratization',
          title: 'Democratizing Data Science Operations',
          subtitle: 'Automating Manual ML Operations into an Automated Flywheel for Enhanced Revenue Growth',
          challenge: 'A cutting-edge startup, revolutionizing dining experiences for customers and empowering restaurant operators with modern tech solutions, faced a critical hurdle. Despite a robust technology stack and advanced AI/ML engines, escalating operational costs—driven by manual data cleansing, labeling, and learning processes—threatened profitability. These inefficiencies yielded inconsistent results, stalling revenue growth and challenging their scalability in a competitive market.',
          solution: 'The Rayze AI Lab partnered with the startup to build a transformative ML Data Engine. We designed an automated flywheel that streamlines learning, data cleansing, and labeling, leveraging model outputs to curate high-value datapoints for training—ensuring accuracy and self-consistency. Predictions feed back into the process, creating a self-sustaining loop of continuous improvement. Integrated with their legacy systems, we modernized their infrastructure using cloud-based tools and Python frameworks, collaborating closely with their team for a swift, tailored deployment that minimized disruption.',
          impact: 'When implemented, the ML Data Engine slashed the total cost of each ML run by 65%, unlocking significant savings and fueling a 50% potential revenue uplift by enhancing operational efficiency. Automated processes eliminated manual errors, while improved prediction accuracy strengthened customer offerings and restaurant operator tools. This strategic partnership empowered the client to scale confidently, driving profitability and market leadership.',
          customer_quote: 'Rayze\'s ML engine transformed our operations, cutting costs dramatically while supercharging our growth—truly a game-changer for our business.',
          metrics: [{ number: '65%', label: 'ML operations cost reduction' }, { number: '50%', label: 'Revenue growth potential boost' }],
          link: '/story3'
        },
        erp_analytics_integration: {
          id: 'erp_analytics_integration',
          title: 'Enhancing Operations with Predictive Analytics',
          subtitle: 'Transforming Multi-Location Performance with Machine Learning for Demand Forecasting',
          challenge: 'A national food services company operating 75+ locations across diverse markets struggled with fragmented operational data and inconsistent performance tracking. Their Microsoft Dynamics 365 ERP system provided basic reporting, but direct Power BI queries created performance bottlenecks during peak periods. Location managers lacked real-time visibility into demand patterns, resource allocation, and cross-location performance comparisons, leading to inefficient operations and missed opportunities.',
          solution: 'The Rayze AI Lab addressed this challenge by implementing Microsoft DataCONNECT to create a high-performance data warehouse, extracting data from D365 and location-specific systems while preserving ERP efficiency. We deployed machine learning models using TensorFlow to analyze historical demand patterns, enabling predictive analytics for seasonal forecasting, resource optimization, and performance benchmarking across locations. The system incorporates real-time alerts for operational anomalies and automated recommendations for resource reallocation during peak periods.',
          impact: 'When implemented, this approach transformed the client\'s multi-location operations, accelerating daily reporting processes by 50% and improving demand predictions by 35% through machine learning insights. Real-time operational data enabled proactive resource management across locations, reducing waste by 25% while improving service levels during seasonal peaks. The client expanded the system to all locations within 6 months.',
          customer_quote: 'Rayze\'s predictive analytics solution turned our location management challenges into a competitive advantage, delivering unprecedented operational visibility and efficiency.',
          metrics: [{ number: '50%', label: 'Faster operational reporting' }, { number: '35%', label: 'Demand prediction improvement' }],
          link: '/story9'
        }      }
    },
    strategic_growth: {
      id: 'strategic_growth',
      title: 'Strategic Growth & Scaling',
      icon: '⚡',
      description: 'Building strategic offshore talent and scaling engineering capabilities',
      stories: {
        offshore_talent: {
          id: 'offshore_talent',
          title: 'Achieving Predictable AI Outcomes',
          subtitle: 'AI-Powered Restaurant Discovery Platform with Robust Eval Testing Framework',
          challenge: 'A mature Series B private company, valued at over $1B, powers its profitability through a food credits platform with a vast, curated repository of USA restaurants. Facing the challenge of building an internal LLM to recommend restaurants and popular dishes based on anonymized customer profiles, transaction history, geolocation, and preferences (e.g., taste, ambience), the client hit roadblocks in testing. Infinite user queries led to unpredictable hallucinations or irrelevant suggestions, with issues surfacing only post-launch from real user feedback—too late to prevent lost engagement and trust.',
          solution: 'The Rayze AI Lab teamed up with the client\'s internal development teams to design and deploy a full AI recommendation platform, training the LLM on their rich datasets for hyper-personalized suggestions that captivate users. To tackle testing unpredictability, we engineered a robust framework generating diverse personas (e.g., based on customer segments like budget-conscious families or adventure seekers) and automated test cases for boundary rules, compliant responses, and edge scenarios. Reinforcement learning refines tests in real-time from live feedback, ensuring evolving coverage. Integrated into their CI/CD pipeline for zero manual intervention, it enables fully automated retraining and minimal maintenance, all while embedding AI into their legacy stack for seamless modernization.',
          impact: 'When implemented, the platform and testing framework revolutionized the client\'s app, delivering 45% more accurate recommendations that drive user delight and retention, while accelerating iterations by 35% through predictable, proactive validation. This not only minimized post-launch fixes but also boosted overall engagement, proving Rayze\'s end-to-end applied AI expertise for scalable, reliable innovation.',
          customer_quote: 'Rayze transformed our recommendation chaos into precision dining experiences. The 45% accuracy improvement and 35% faster iterations have revolutionized how our users discover and enjoy restaurants.',
          metrics: [{ number: '45%', label: 'Recommendation accuracy improvement' }, { number: '35%', label: 'Faster development iterations' }],
          link: '/story4'
        },
        ai_center_excellence: {
          id: 'ai_center_excellence',
          title: 'Scaling AI Across Property Operations',
          subtitle: 'Building an AI Center of Excellence for Global Real Estate Management',
          challenge: 'A Fortune 500 commercial real estate management company with $4B in annual revenue managing 800+ properties across diverse markets faced challenges leveraging AI across complex operations including emergency facility response, tenant services, property maintenance, and large capital projects. Disjointed technology efforts across regional offices, inconsistent service delivery standards, and pilot-heavy approaches stalled innovation. The company needed a strategic AI Center of Excellence to integrate AI into their property management systems and drive consistent, production-grade solutions across all markets.',
          solution: 'The Rayze AI Lab collaborated with the client to establish their AI CoE focused on property operations. We crafted a tailored governance structure with ROI-driven prioritization for emergency vs. scheduled maintenance, risk management guidelines for tenant services, and automated processes for cross-property coordination. We set up comprehensive AI infrastructure including predictive maintenance models for HVAC and building systems, emergency response optimization for facility incidents, and tenant satisfaction algorithms. The system integrates with their legacy property management software while ensuring production-ready solutions. Rayze staffed the CoE with AI engineers specializing in real estate operations, empowering regional property managers and facility teams to innovate.',
          impact: 'When implemented, the CoE revolutionized property operations, launching 14 AI solutions into production that improved operational margins by 42% and increased tenant satisfaction scores by 38%. These integrated systems spanning predictive equipment maintenance to optimized emergency facility response transformed multi-property coordination, showcasing scalable AI success in distributed real estate operations.',
          customer_quote: 'Rayze transformed our vision of AI-powered property management into reality, delivering production solutions that revolutionized how we coordinate services across our entire portfolio.',
          metrics: [{ number: '42%', label: 'Operational margin improvement' }, { number: '38%', label: 'Tenant satisfaction increase' }],
          link: '/story8'
        },
        analytics_scaling: {
          id: 'analytics_scaling',
          title: 'Scale your Analytics Infrastructure',
          subtitle: 'Payments Software Performance Engine with Real-Time Analytics',
          challenge: 'A payments software company\'s analytics infrastructure couldn\'t handle real-time transaction monitoring for 50M+ daily payments. System latency during peak volumes caused delayed fraud detection and poor merchant experience with reporting delays up to 4 hours.',
          solution: 'Rayze rebuilt the analytics architecture with distributed stream processing, real-time event handling, and auto-scaling compute resources. We implemented sub-second fraud detection analytics and instant merchant dashboard updates.',
          impact: 'Platform now processes 200M+ daily transactions with sub-100ms latency, provides real-time fraud detection, and delivers instant merchant analytics. Payment processing reliability improved 99.9% uptime with zero data loss.',
          customer_quote: 'Our payment analytics went from batch bottleneck to real-time powerhouse. Rayze delivered 200M+ transaction capability with sub-100ms response times that keep our merchants happy.',
          metrics: [{ number: '200M+', label: 'Daily transactions' }, { number: '<100ms', label: 'Response latency' }],
          link: '/story5'
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
            <h1 className="tagline">We seamlessly embed AI into your workflow & tech stack.<br/> <span style={{color: "var(--theme-color)"}}>...delivering measurable business outcomes</span></h1><br/>
            <div className="manifesto">
              <div className="category-summary">
                <div className="category-overview-card" onClick={() => document.getElementById('digital-transformation-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="category-icon">🚀</div>
                  <h3>Client Impact</h3>
                  <p>Harnessing AI to solve complex business challenges and drive measurable business growth.</p>
                </div>
                <div className="category-overview-card" onClick={() => document.getElementById('ai-data-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="category-icon">🧠</div>
                  <h3>Machine Learning & Data Science</h3>
                  <p>Harnessing Machine Learning to drive predictions and insights with measurable improvements to margins.</p>
                </div>
                <div className="category-overview-card" onClick={() => document.getElementById('strategic-growth-section')?.scrollIntoView({ behavior: 'smooth' })} style={{cursor: 'pointer'}}>
                  <div className="category-icon">⚡</div>
                  <h3>Scale &  Sustain AI</h3>
                  <p>Scaling AI systems with cost optimal solutions. <br/>Automated maintenance to reduce operational costs of AI systems.</p>
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
            <h2><span className="category-icon">🚀</span> Client Impact</h2>
            <p>Harnessing AI to solve complex business challenges and drive measurable business growth.</p>
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
                <h2 className="case-study-title">{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].title}</h2>
                <p className="case-study-subtitle">{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].subtitle}</p>
                
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
                  <p>"{clientStoryCategories.digital_transformation.stories[selectedDigitalStory].customer_quote}"</p>
                  <div className="quote-attribution">
                    <strong>Enterprise Leadership</strong><br/>
                    <span className="quote-title">CLIENT TESTIMONIAL</span>
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
            <h2><span className="category-icon">🧠</span> Machine Learning & Data Science</h2>
            <p>Harnessing Machine Learning to drive predictions and insights with measurable improvements to margins.</p>
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
                <h2 className="case-study-title">{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].title}</h2>
                <p className="case-study-subtitle">{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].subtitle}</p>
                
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
                  <p>"{clientStoryCategories.ai_data_excellence.stories[selectedAIStory].customer_quote}"</p>
                  <div className="quote-attribution">
                    <strong>Client Leadership</strong><br/>
                    <span className="quote-title">CLIENT TESTIMONIAL</span>
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
            <h2><span className="category-icon">⚡</span> Scale & Sustain AI</h2>
            <p>Scaling AI systems with cost optimal solutions. <br/>Automated maintenance to reduce operational costs of AI systems.</p>
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
                <h2 className="case-study-title">{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].title}</h2>
                <p className="case-study-subtitle">{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].subtitle}</p>
                
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
                  <p>"{clientStoryCategories.strategic_growth.stories[selectedGrowthStory].customer_quote}"</p>
                  <div className="quote-attribution">
                    <strong>Client Leadership</strong><br/>
                    <span className="quote-title">CLIENT TESTIMONIAL</span>
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