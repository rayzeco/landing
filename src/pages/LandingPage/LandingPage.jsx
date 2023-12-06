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
            <div className="title">Strategy. Engineering.  Data & AI. </div>
            <div className="description">
              By integrating these disciplines, you acquire a competitive advantage that <strong>propels your
              business to new heights...</strong>{" "}
              <br /><br/>
              <strong> Our mission </strong> is to accelerate your digital journey,
              helping <strong> you to create a remarkable impact today, tomorrow, and in the future.</strong>
            </div>
            <pre></pre>
            <a href="/">Get In Touch</a>
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
                We help our clients to leverage the potential of Data, Artificial intelligence,
                and engineering to seize new opportunities, and drive digital growth.
              </p>
              <div className="title">Supercharge your digital growth.</div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <h4>Strategy</h4>
              <p>Evolve your organization with pragmatic strategies & technology levers that increase your agility, resilience and ability to compete.</p>
            </div>
            <div>
              <h4>Engineering</h4>
              <p>Modernize your technology platforms, development and delivery practices to deliver business value faster.</p>
            </div>
            <div>
              <h4>Data & AI</h4>
              <p>Drive business growth and enable better decision making with pragmatic data foundations and unrivalled skill sets in AI and ML.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="features-section">
        <div className="container">
          <div className="title">
            How Rayze will <br />
            accelerate your <br/>
            digital growth <br />
          </div>

          <div className="steps">
            <div className="step">
              <h4>Technology Strategy</h4>
              <p>
                Provide C-level expertise with practical operating experience in accelerating business growth with technology
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Engineering Expertise</h4>
              <p>Provide practical technology architectures, solve complex technology problems, advise on technology selection
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Accelerators</h4>
              <p>Leverage our pre-built Rayze modules that accelerate boostrapping of projects.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Global Talent</h4>
              <p>Leverage our global talent pool. We have built out a high end talent pool in India.</p>
            </div>
          </div>

          <a href="/">Get in Touch</a>
        </div>
      </section>

      <section className="community-section">
        <img src="/images/circle.svg" alt="circle" className="circle" />
        <div className="container">
          <div className="title">
            Join our community <br />
            on Discord
          </div>
          <a href="/">Join Discord Channel</a>
        </div>
      </section>
    </div>
  );
}
