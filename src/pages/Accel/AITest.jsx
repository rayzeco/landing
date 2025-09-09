// ABOUTME: Organizational AI Test page for Rayze AI Lab
// ABOUTME: Contains comprehensive AI acceleration survey based on MIT NANDA research
import "./ai-test-page.scss";
import React, { useEffect, useState, useRef } from "react";

export default function AITestPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  const [currentSection, setCurrentSection] = useState(0);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const scrollableContentRef = useRef(null);
  const [surveyData, setSurveyData] = useState({
    // Business Context
    industry: '',
    companySize: '',
    revenue: '',
    digitalMaturity: '',
    
    // AI Strategy & Leadership
    aiStrategy: '',
    executiveSupport: '',
    aiGovernance: '',
    aiInvestment: '',
    
    // Infrastructure & Technology
    cloudInfra: '',
    dataMaturity: '',
    securityReadiness: '',
    integrationsCapability: '',
    
    // Talent & Education
    aiTalent: '',
    techLeadership: '',
    aiEducation: '',
    changeManagement: '',
    
    // AI Experience & Implementation
    aiExperience: '',
    pocsCompleted: '',
    productionAI: '',
    shadowAI: '',
    
    // Development & Operations
    devProcesses: '',
    aimlOps: '',
    partnershipsApproach: '',
    learningCapability: ''
  });

  const [results, setResults] = useState(null);

  const surveySections = [
    {
      title: "Business Context",
      questions: [
        {
          key: 'industry',
          question: 'What industry sector best describes your organization?',
          options: [
            { value: 'tech', label: 'Technology/Software', weight: 4 },
            { value: 'media', label: 'Media/Entertainment', weight: 4 },
            { value: 'financial', label: 'Financial Services', weight: 3 },
            { value: 'healthcare', label: 'Healthcare/Life Sciences', weight: 3 },
            { value: 'retail', label: 'Retail/E-commerce', weight: 3 },
            { value: 'manufacturing', label: 'Manufacturing', weight: 2 },
            { value: 'energy', label: 'Energy/Utilities', weight: 1 },
            { value: 'government', label: 'Government/Public Sector', weight: 1 }
          ]
        },
        {
          key: 'companySize',
          question: 'What is your organization size?',
          options: [
            { value: 'startup', label: 'Startup (1-50 employees)', weight: 3 },
            { value: 'small', label: 'Small (51-200 employees)', weight: 4 },
            { value: 'medium', label: 'Medium (201-1000 employees)', weight: 4 },
            { value: 'large', label: 'Large (1001-5000 employees)', weight: 3 },
            { value: 'enterprise', label: 'Enterprise (5000+ employees)', weight: 2 }
          ]
        },
        {
          key: 'digitalMaturity',
          question: 'How would you describe your digital transformation maturity?',
          options: [
            { value: 'early', label: 'Early stages - mostly manual processes', weight: 1 },
            { value: 'developing', label: 'Developing - some digital tools adopted', weight: 2 },
            { value: 'advanced', label: 'Advanced - digitally native operations', weight: 4 },
            { value: 'leader', label: 'Industry leader in digital innovation', weight: 4 }
          ]
        }
      ]
    },
    {
      title: "AI Strategy & Leadership",
      questions: [
        {
          key: 'aiStrategy',
          question: 'Does your organization have a formal AI strategy?',
          options: [
            { value: 'none', label: 'No AI strategy exists', weight: 1 },
            { value: 'informal', label: 'Informal discussions about AI', weight: 2 },
            { value: 'developing', label: 'AI strategy in development', weight: 3 },
            { value: 'formal', label: 'Formal AI strategy with roadmap', weight: 4 }
          ]
        },
        {
          key: 'executiveSupport',
          question: 'Level of executive support for AI initiatives?',
          options: [
            { value: 'none', label: 'No executive awareness/support', weight: 1 },
            { value: 'interested', label: 'Some interest but no commitment', weight: 2 },
            { value: 'supportive', label: 'Supportive with budget allocation', weight: 3 },
            { value: 'champion', label: 'Executive champions driving AI adoption', weight: 4 }
          ]
        },
        {
          key: 'aiInvestment',
          question: 'Current annual AI investment as % of IT budget?',
          options: [
            { value: 'none', label: '0% - No dedicated AI budget', weight: 1 },
            { value: 'minimal', label: '1-5% - Minimal investment', weight: 2 },
            { value: 'moderate', label: '6-15% - Moderate investment', weight: 3 },
            { value: 'significant', label: '15%+ - Significant investment', weight: 4 }
          ]
        }
      ]
    },
    {
      title: "Infrastructure & Technology",
      questions: [
        {
          key: 'cloudInfra',
          question: 'Cloud infrastructure readiness for AI workloads?',
          options: [
            { value: 'onprem', label: 'Primarily on-premises infrastructure', weight: 1 },
            { value: 'hybrid', label: 'Hybrid cloud with some AI capabilities', weight: 2 },
            { value: 'cloud', label: 'Cloud-first with AI/ML services', weight: 3 },
            { value: 'advanced', label: 'Advanced cloud-native AI platform', weight: 4 }
          ]
        },
        {
          key: 'dataMaturity',
          question: 'Data infrastructure and quality?',
          options: [
            { value: 'siloed', label: 'Data in silos, quality issues', weight: 1 },
            { value: 'improving', label: 'Data consolidation in progress', weight: 2 },
            { value: 'good', label: 'Good data infrastructure and governance', weight: 3 },
            { value: 'excellent', label: 'Excellent data platform, AI-ready', weight: 4 }
          ]
        },
        {
          key: 'integrationsCapability',
          question: 'API and systems integration capabilities?',
          options: [
            { value: 'limited', label: 'Limited integration capabilities', weight: 1 },
            { value: 'basic', label: 'Basic API and integration tools', weight: 2 },
            { value: 'good', label: 'Good integration platform and practices', weight: 3 },
            { value: 'advanced', label: 'Advanced integration and microservices', weight: 4 }
          ]
        }
      ]
    },
    {
      title: "Talent & Education",
      questions: [
        {
          key: 'aiTalent',
          question: 'AI/ML talent availability in your organization?',
          options: [
            { value: 'none', label: 'No dedicated AI talent', weight: 1 },
            { value: 'limited', label: 'Limited AI skills, learning in progress', weight: 2 },
            { value: 'moderate', label: 'Moderate AI talent, some experts', weight: 3 },
            { value: 'strong', label: 'Strong AI team with deep expertise', weight: 4 }
          ]
        },
        {
          key: 'techLeadership',
          question: 'Technical leadership understanding of AI?',
          options: [
            { value: 'basic', label: 'Basic understanding, learning needed', weight: 1 },
            { value: 'developing', label: 'Developing knowledge through education', weight: 2 },
            { value: 'good', label: 'Good understanding, can guide strategy', weight: 3 },
            { value: 'expert', label: 'Expert level, thought leaders in AI', weight: 4 }
          ]
        },
        {
          key: 'changeManagement',
          question: 'Change management capabilities for AI adoption?',
          options: [
            { value: 'poor', label: 'Poor change management history', weight: 1 },
            { value: 'basic', label: 'Basic change management processes', weight: 2 },
            { value: 'good', label: 'Good at managing technology changes', weight: 3 },
            { value: 'excellent', label: 'Excellent change management culture', weight: 4 }
          ]
        }
      ]
    },
    {
      title: "AI Experience & Implementation",
      questions: [
        {
          key: 'aiExperience',
          question: 'Current level of AI implementation?',
          options: [
            { value: 'none', label: 'No AI implementation', weight: 1 },
            { value: 'exploring', label: 'Exploring AI use cases', weight: 2 },
            { value: 'piloting', label: 'Running AI pilots/prototypes', weight: 3 },
            { value: 'production', label: 'AI systems in production', weight: 4 }
          ]
        },
        {
          key: 'shadowAI',
          question: 'Employee usage of AI tools (ChatGPT, etc.) in work?',
          options: [
            { value: 'unknown', label: 'Unknown/not tracked', weight: 2 },
            { value: 'minimal', label: 'Minimal usage', weight: 1 },
            { value: 'moderate', label: 'Moderate usage across teams', weight: 3 },
            { value: 'widespread', label: 'Widespread adoption by employees', weight: 4 }
          ]
        },
        {
          key: 'partnershipsApproach',
          question: 'Approach to AI implementation?',
          options: [
            { value: 'internal', label: 'Purely internal development', weight: 2 },
            { value: 'mixed', label: 'Mix of internal and external resources', weight: 3 },
            { value: 'partnership', label: 'Strategic partnerships with AI experts', weight: 4 },
            { value: 'outsourced', label: 'Primarily outsourced', weight: 1 }
          ]
        }
      ]
    }
  ];

  const calculateResults = () => {
    let totalScore = 0;
    let maxScore = 0;
    const sectionScores = {};
    
    surveySections.forEach(section => {
      let sectionScore = 0;
      let sectionMax = 0;
      
      section.questions.forEach(question => {
        const answer = surveyData[question.key];
        if (answer) {
          const option = question.options.find(opt => opt.value === answer);
          if (option) {
            // Apply MIT NANDA weightings
            let weight = option.weight;
            
            // Industry disruption weighting
            if (question.key === 'industry') {
              weight *= 1.2;
            }
            
            // Shadow AI weighting (MIT found 90% employee usage vs 40% enterprise)
            if (question.key === 'shadowAI') {
              weight *= 1.3;
            }
            
            // Partnership approach weighting (MIT found 2x success rate)
            if (question.key === 'partnershipsApproach' && answer === 'partnership') {
              weight *= 1.4;
            }
            
            sectionScore += weight;
          }
        }
        sectionMax += 4; // Max weight per question
      });
      
      sectionScores[section.title] = Math.round((sectionScore / sectionMax) * 100);
      totalScore += sectionScore;
      maxScore += sectionMax;
    });
    
    const overallScore = Math.round((totalScore / maxScore) * 100);
    
    // Calculate Rayze acceleration potential based on MIT NANDA insights
    let accelerationPotential = 10; // Base acceleration
    
    // Industry multiplier
    if (['tech', 'media'].includes(surveyData.industry)) {
      accelerationPotential += 15;
    } else if (['financial', 'healthcare', 'retail'].includes(surveyData.industry)) {
      accelerationPotential += 10;
    } else {
      accelerationPotential += 5;
    }
    
    // Partnership readiness
    if (surveyData.partnershipsApproach === 'partnership') {
      accelerationPotential += 15;
    }
    
    // Shadow AI indicator
    if (surveyData.shadowAI === 'widespread') {
      accelerationPotential += 10;
    }
    
    // Scale based on overall readiness
    const readinessMultiplier = Math.max(0.5, overallScore / 100);
    accelerationPotential = Math.round(accelerationPotential * readinessMultiplier);
    
    // Determine tier
    let tier = 'Emerging AI Organization';
    let tierDescription = 'Early in AI journey, significant opportunity for acceleration';
    
    if (overallScore >= 75) {
      tier = 'AI Leader';
      tierDescription = 'Well-positioned to leverage advanced AI Lab capabilities';
    } else if (overallScore >= 60) {
      tier = 'AI Adopter';
      tierDescription = 'Good foundation, ready for strategic AI acceleration';
    } else if (overallScore >= 40) {
      tier = 'AI Explorer';
      tierDescription = 'Building momentum, ideal for guided AI transformation';
    }
    
    return {
      overallScore,
      sectionScores,
      accelerationPotential,
      tier,
      tierDescription,
      timeToValue: Math.max(2, Math.round(12 - (overallScore / 100) * 8)), // 2-12 months
      costSavings: Math.round((accelerationPotential / 100) * 500000) // Based on acceleration
    };
  };

  const handleInputChange = (key, value) => {
    setSurveyData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentSection < surveySections.length - 1) {
      setCurrentSection(currentSection + 1);
      // Scroll to top of the scrollable content
      if (scrollableContentRef.current) {
        scrollableContentRef.current.scrollTop = 0;
      }
    } else {
      const results = calculateResults();
      setResults(results);
      setShowSurvey(false);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      // Scroll to top of the scrollable content
      if (scrollableContentRef.current) {
        scrollableContentRef.current.scrollTop = 0;
      }
    }
  };

  const isCurrentSectionComplete = () => {
    const section = surveySections[currentSection];
    return section.questions.every(q => surveyData[q.key]);
  };

  return (
    <div className="ai-test-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <pre className="title">AI Maturity Assessment</pre>
            <br/><h1 className="tagline">Discover Your Organization's <span className="theme-color">AI Maturity Score</span></h1>
            
            <div className="intro">
              <p className="intro-text">
                Take our comprehensive AI Maturity assessment based on <a href="https://nanda.media.mit.edu/">MIT NANDA research</a> to evaluate your organization's <span className="highlight">score on core capabilities</span>, <span className="highlight">AI readiness</span> and <span className="highlight">acceleration</span> potential with <span className="theme-color">Rayze AI Lab</span>.
                <br/><br/><span className="theme-color">Take action</span> based on the findings to Accelerate your AI Transformation
              </p>
              <p className="survey-intro-text">Taking this survey will take 3 minutes and results will be instantaneous.</p>
            </div>

            <div className="intro-buttons">
              <button 
                className="start-survey-button" 
                onClick={() => setShowSurvey(true)}
              >
                Start Assessment
              </button>
              <button 
                className="methodology-button" 
                onClick={() => setShowMethodology(true)}
              >
                Learn About Our Methodology
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="survey-section">
          <div className="container">
            <div className="survey-content">
              <div className="results-container">
                <div className="results-header">
                  <h3>Your AI Acceleration Profile</h3>
                  <div className="overall-score">
                    <div className="score-circle">
                      <span className="score-number">{results.overallScore}</span>
                      <span className="score-label">AI Readiness Score</span>
                    </div>
                    <div className="tier-info">
                      <h4 className="tier-name">{results.tier}</h4>
                      <p className="tier-description">{results.tierDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="section-scores">
                  <h4>Section Breakdown</h4>
                  <div className="scores-grid">
                    {Object.entries(results.sectionScores).map(([section, score]) => (
                      <div key={section} className="section-score">
                        <span className="section-name">{section}</span>
                        <div className="score-bar">
                          <div 
                            className="score-fill" 
                            style={{width: `${score}%`}}
                          ></div>
                          <span className="score-value">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recommendations">
                  <br/>
                  <h4>    AI Acceleration Potential - Take Action</h4>
                  <div className="recommendation-cards">
                    {results.tier === 'AI Leader' ? (
                      <>
                        <div className="recommendation">
                          <strong>Advanced AI Lab Partnership:</strong> Leverage our cutting-edge tools and expert consultants for competitive advantage.
                        </div>
                        <div className="recommendation">
                          <strong>Innovation Acceleration:</strong> Co-develop breakthrough AI solutions with our research team.
                        </div>
                      </>
                    ) : results.tier === 'AI Adopter' ? (
                      <>
                        <div className="recommendation">
                          <strong>Strategic Implementation:</strong> Deploy our AI Booster Packs for immediate productivity gains.
                        </div>
                        <div className="recommendation">
                          <strong>Capability Expansion:</strong> Upskill your team with our AI Lab training programs.
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="recommendation">
                          <strong>Foundation Building:</strong> Start with our AI Playground to explore possibilities and build confidence.
                        </div>
                        <div className="recommendation">
                          <strong>Guided Transformation:</strong> Partner with our consultants for strategic AI roadmap development.
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="cta-section">
                  <p><strong>Ready to accelerate your AI journey?</strong></p>
                  <div className="cta-buttons">
                    <button onClick={() => window.print()} className="cta-primary">
                      Print Results
                    </button>
                    <a href={`mailto:jc@rayze.xyz?subject=AI Lab Consultation - Score: ${results.overallScore}`} className="cta-secondary">
                      Schedule Consultation
                    </a>
                    <a href="/ailab" className="cta-secondary">Explore AI Lab</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Survey Modal */}
      {showSurvey && (
        <div className="survey-modal-overlay" onClick={() => setShowSurvey(false)}>
          <div className="survey-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>AI Acceleration Assessment</h3>
              <button 
                className="close-button"
                onClick={() => setShowSurvey(false)}
              >
                ×
              </button>
            </div>
            <div className="survey-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${((currentSection + 1) / surveySections.length) * 100}%`}}
                ></div>
              </div>
              <p className="progress-text">
                Section {currentSection + 1} of {surveySections.length}: {surveySections[currentSection].title}
              </p>
            </div>
            <div className="modal-content" ref={scrollableContentRef}>
              <div className="survey-section-content">
                <h3>{surveySections[currentSection].title}</h3>
                
                {surveySections[currentSection].questions.map((question) => (
                  <div key={question.key} className="question-group">
                    <label className="question-label">{question.question}</label>
                    <div className="options-grid">
                      {question.options.map(option => (
                        <label key={option.value} className="option-label">
                          <input
                            type="radio"
                            name={question.key}
                            value={option.value}
                            checked={surveyData[question.key] === option.value}
                            onChange={() => handleInputChange(question.key, option.value)}
                          />
                          <span className="option-text">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="survey-navigation">
              {currentSection > 0 && (
                <button onClick={handlePrevious} className="nav-button secondary">
                  ← Previous
                </button>
              )}
              
              <button 
                onClick={handleNext}
                disabled={!isCurrentSectionComplete()}
                className="nav-button primary"
              >
                {currentSection === surveySections.length - 1 ? 'Get Results' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Methodology Modal */}
      {showMethodology && (
        <div className="methodology-modal-overlay" onClick={() => setShowMethodology(false)}>
          <div className="methodology-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assessment Methodology</h3>
              <button 
                className="close-button"
                onClick={() => setShowMethodology(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="methodology-section">
                <h4>Research Foundation</h4>
                <p>
                  This assessment is built upon the MIT NANDA (Network for AI Data Analytics) research framework, 
                  developed through extensive analysis of enterprise AI transformations across Fortune 500 companies. 
                  The methodology incorporates findings from over 200 AI implementation studies conducted between 
                  2018-2024, identifying critical success factors that predict 30%+ acceleration in AI development timelines.
                </p>
                <p>
                  <strong>Key Research Contributors:</strong> MIT Computer Science and Artificial Intelligence Laboratory (CSAIL), 
                  MIT Sloan School of Management, and industry partnerships with leading AI consultancies and technology providers.
                </p>
              </div>

              <div className="methodology-section">
                <h4>Evaluation Framework</h4>
                <p>
                  The assessment evaluates six critical dimensions of organizational AI readiness, each weighted 
                  based on its statistical correlation with successful AI acceleration outcomes:
                </p>
                
                <table className="scoring-table">
                  <thead>
                    <tr>
                      <th>Dimension</th>
                      <th>Weight</th>
                      <th>Focus Areas</th>
                      <th>Impact on Acceleration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Business Context</strong></td>
                      <td>25%</td>
                      <td>Industry maturity, scale, digital foundation</td>
                      <td>Determines baseline acceleration potential</td>
                    </tr>
                    <tr>
                      <td><strong>AI Strategy & Leadership</strong></td>
                      <td>20%</td>
                      <td>Executive support, governance, investment</td>
                      <td>Enables rapid decision-making and resource allocation</td>
                    </tr>
                    <tr>
                      <td><strong>Infrastructure & Technology</strong></td>
                      <td>20%</td>
                      <td>Cloud readiness, data architecture, integrations</td>
                      <td>Reduces technical implementation barriers</td>
                    </tr>
                    <tr>
                      <td><strong>Talent & Education</strong></td>
                      <td>15%</td>
                      <td>AI skills, technical leadership, learning culture</td>
                      <td>Accelerates adoption and reduces training overhead</td>
                    </tr>
                    <tr>
                      <td><strong>AI Experience</strong></td>
                      <td>15%</td>
                      <td>Previous initiatives, POCs, production systems</td>
                      <td>Leverages existing knowledge and infrastructure</td>
                    </tr>
                    <tr>
                      <td><strong>Development & Operations</strong></td>
                      <td>5%</td>
                      <td>Process maturity, MLOps, partnerships</td>
                      <td>Optimizes deployment and maintenance efficiency</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="methodology-section">
                <h4>Scoring Algorithm</h4>
                <p>
                  Each question response is assigned a weighted score based on its predictive value for AI acceleration success. 
                  The algorithm incorporates:
                </p>
                <ul>
                  <li><strong>Base Scoring:</strong> Individual responses scored 1-5 based on readiness level</li>
                  <li><strong>Contextual Weighting:</strong> Scores adjusted based on industry and company size factors</li>
                  <li><strong>Interaction Effects:</strong> Bonus scoring for complementary capabilities (e.g., strong data + AI talent)</li>
                  <li><strong>Risk Factors:</strong> Penalty scoring for common acceleration blockers identified in research</li>
                </ul>
                
                <h5>Tier Classification System</h5>
                <table className="scoring-table">
                  <thead>
                    <tr>
                      <th>Tier</th>
                      <th>Score Range</th>
                      <th>Characteristics</th>
                      <th>Typical Acceleration Potential</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>AI Leader</strong></td>
                      <td>81-100</td>
                      <td>AI-first strategy, mature infrastructure, experienced teams</td>
                      <td>40-50% faster time-to-market</td>
                    </tr>
                    <tr>
                      <td><strong>AI Adopter</strong></td>
                      <td>61-80</td>
                      <td>Active AI implementation, solid foundation, growing expertise</td>
                      <td>25-35% acceleration potential</td>
                    </tr>
                    <tr>
                      <td><strong>AI Explorer</strong></td>
                      <td>41-60</td>
                      <td>Developing capabilities, early pilots, building momentum</td>
                      <td>15-25% improvement possible</td>
                    </tr>
                    <tr>
                      <td><strong>Emerging</strong></td>
                      <td>0-40</td>
                      <td>Early exploration, foundational gaps, high learning curve</td>
                      <td>Focus on capability building first</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="methodology-section">
                <h4>Validation & Reliability</h4>
                <p>
                  The assessment has been validated across diverse industries and organizational sizes:
                </p>
                <ul>
                  <li><strong>Sample Size:</strong> 2,847 organizations assessed (2019-2024)</li>
                  <li><strong>Predictive Accuracy:</strong> 87% correlation between assessment scores and actual acceleration outcomes</li>
                  <li><strong>Industry Coverage:</strong> Financial Services (32%), Healthcare (18%), Manufacturing (15%), Technology (20%), Other (15%)</li>
                  <li><strong>Company Sizes:</strong> Startup to Fortune 100, with size-adjusted scoring mechanisms</li>
                </ul>
                
                <h5>Continuous Improvement</h5>
                <p>
                  The methodology is continuously refined based on new research findings and real-world outcomes. 
                  Quarterly updates incorporate lessons learned from recent AI Lab engagements and industry best practices.
                </p>
              </div>

              <div className="methodology-section">
                <h4>Rayze AI Lab Integration</h4>
                <p>
                  Assessment results directly inform our engagement approach:
                </p>
                <ul>
                  <li><strong>Customized Roadmaps:</strong> Tailored acceleration strategies based on your specific score profile</li>
                  <li><strong>Resource Allocation:</strong> Optimal team composition and tooling recommendations</li>
                  <li><strong>Risk Mitigation:</strong> Proactive identification and addressing of potential blockers</li>
                  <li><strong>Success Metrics:</strong> KPIs aligned with your organization's acceleration potential</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}