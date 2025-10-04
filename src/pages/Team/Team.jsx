import "./team-page.scss";
import React, { useEffect } from "react";

export default function TeamPage() {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="team-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <pre className="title">Our Team</pre>
            <br/><br/>
            <h1 className="tagline">We are a team of engineers passionate about turning <span className="theme-color">AI into action</span><br/>...delivering <span className="theme-color">real impact</span> to your enterprise.</h1>
            <br/>
            <div className="manifesto">
              <div className="hero-expertise-introduction">
                <div className="hero-expertise-title">
                  <h3><span className="theme-color">Our Story</span></h3>
                </div>
                <div className="hero-expertise-description">
                  <p><span className="theme-color">Rayze was founded in 2023, </span>sparked by OpenAI's ChatGPT release, and we've since collaborated with university research and top-tier AI companies to master these technologies for real-world solutions.</p>
                </div>
              </div><br/><br/><br/>

              <div className="hero-expertise-introduction">
                <div className="hero-expertise-title">
                  <h3><span className="theme-color">Our Mission</span></h3>
                </div>
                <div className="hero-expertise-description">
                  <p>Our mission is to harness AI, <span className="theme-color">to deliver tangible busines value.</span> We focus on practical applications, not fleeting trends, delivering scalable AI that is embedded into your technology stck.</p>
                </div>
              </div><br/><br/><br/>

              <div className="hero-expertise-introduction">
                <div className="hero-expertise-title">
                  <h3><span className="theme-color">Our Impact</span></h3>
                </div>
                <div className="hero-expertise-description">
                  <p>We have partnered with Fortune 500 organizations worldwide, <span className="theme-color">Our team's deep commitment to impactful innovation </span>fuels every project, ensuring your business thrives with AI at its core.</p>
                </div>
              </div><br/><br/><br/>

              <div className="hero-expertise-introduction">
                <div className="hero-expertise-title">
                  <h3><span className="theme-color">Our Values</span></h3>
                </div>
                <div className="hero-expertise-description">
                  <p>
                    <span className="theme-color">FOCUS</span> on client outcomes<br/>
                    <span style={{fontSize: "0.8em"}}>We prioritize delivering measurable business value.</span><br/><br/>
                    <span className="theme-color">EMPATHY</span> for client needs<br/>
                    <span style={{fontSize: "0.8em"}}>We listen deeply to align solutions with your goals.</span><br/><br/>
                    <span className="theme-color">INTENSITY</span> in execution<br/>
                    <span style={{fontSize: "0.8em"}}>We pursue excellence with unwavering determination.</span><br/><br/>
                    <span className="theme-color">DISCIPLINE</span> in delivery<br/>
                    <span style={{fontSize: "0.8em"}}>We build solutions that stand the test of time.</span>
                  </p>
                </div>
              </div>
            </div>
            <br/><br/>
          </div>
        </div>
      </section>

      {/* Team Expertise Section */}
      <section className="team-expertise-section">
        <div className="container">
          <div className="team-overview">
            <h2>Our expertise is to <span className="theme-color">deliver client value </span> with AI & Engineering</h2>
            <br/> <br/><br/>          
            <div className="expertise-introduction">
              <div className="expertise-title">
                <h3><span className="theme-color">Our team</span><br/></h3><br/>
              </div>
              <div className="expertise-description">
                <p><span className="theme-color">We are a talented team</span> of elite AI Product Owners, Forward-Deployed Engineers, and Core Engineers, each bringing <span className="theme-color">a proven track record of success </span>from leading AI companies, cutting-edge startups, and strategy consulting houses.</p>
                <br/><br/>
              </div>
            </div>
          </div>

          <div className="story-section">
            <div className="expertise-boxes">
              <div className="expertise-box">
                <div className="expertise-content">
                  <h4>AI Product Strategy</h4>
                  <p>Expertise in business strategy, Product Mangement, and Data Science. <span className="theme-color">This team leads </span>the engagement to deliver rapid ROI while navigating complex stakeholder environments.</p>
                </div>
              </div>

              <div className="expertise-box">
                <div className="expertise-content">
                  <h4>Forward-Deployed Engineers</h4>
                  <p>Expertise in breaking down the business problem and architecting scalable technical solutions. <span className="theme-color">This team works directly with the client to build </span> rapid prototypes which is incrementally integrated into the client tech stack</p>
                </div>
              </div>

              <div className="expertise-box">
                <div className="expertise-content">
                  <h4>Core Engineers</h4>
                  <p><span className="theme-color">Deep Expertise in engineering</span>, working with large scale complex systems and accelerating delivery with Agentic AI development. <span className="theme-color">This team delivers scalable AI solutions </span>which is integrated into the client's tech stack</p>
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
                <div className="method-content">
                  <h4>Strategic Assessment</h4>
                  <p>Deep dive into business objectives, technical landscape, and growth goals to create tailored transformation roadmaps.</p>
                </div>
              </div>
              <div className="method-card">
                <div className="method-content">
                  <h4>Agile Execution</h4>
                  <p>Iterative development approach with continuous feedback loops ensuring alignment with business outcomes.</p>
                </div>
              </div>
              <div className="method-card">
                <div className="method-content">
                  <h4>Knowledge Transfer</h4>
                  <p>Comprehensive training and documentation ensuring client teams can maintain and extend solutions independently.</p>
                </div>
              </div>
              <div className="method-card">
                <div className="method-content">
                  <h4>Ongoing Partnership</h4>
                  <p>Long-term strategic support with performance monitoring and continuous optimization of delivered solutions.</p>
                </div>
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