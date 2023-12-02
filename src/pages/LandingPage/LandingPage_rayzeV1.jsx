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
            <div className="title">Supercharge your NFTs with Rayze</div>
            <div className="description">
              <strong>Create Incentive NFTs in a Few Simple Steps.</strong>{" "}
              <br />
              Rayze provides robust tooling & infrastructure so you can focus on
              what matters the most.
            </div>
            <pre>Your Creativity | Your Brand | Your Community.</pre>
            <a href="/">Launch Collection</a>
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
                We believe that NFTs & tokens will revolutionize how enterprises
                interact & incentivize their communities.
              </p>
              <div className="title">Rayze makes this simple and easy</div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <h4>Creators</h4>
              <p>can keep a higher share of what they create.</p>
            </div>
            <div>
              <h4>Communities</h4>
              <p>can engage, contribute, grow & earn.</p>
            </div>
            <div>
              <h4>Enterprises</h4>
              <p>can extend their reach beyond their existing customers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="launch-steps-section">
        <img src="/images/arc.svg" alt="arc" className="arc" />
        <div className="container">
          <div className="title">
            Launch a new NFT collection with 4 simple steps
          </div>
          <div className="steps">
            <div className="step">
              <h4>1.</h4>
              <p>Select an NFT Template</p>
              <img
                src="/images/window.svg"
                alt="window"
                style={{ width: 60 }}
              />
            </div>

            <div className="line"></div>

            <div className="step">
              <h4>2.</h4>
              <p>Add Incentive features you need.</p>
              <img src="/images/star.svg" alt="star" />
            </div>

            <div className="line"></div>

            <div className="step">
              <h4>3.</h4>
              <p>Customize the template.</p>
              <img src="/images/gear.svg" alt="gear" />
            </div>

            <div className="line"></div>

            <div className="step">
              <h4>4.</h4>
              <p>Test & Launch.</p>
              <img src="/images/note.svg" alt="note" />
            </div>
          </div>
        </div>
      </section>

      <section className="insentive-section">
        <div className="container">
          <div className="title">
            Rayze Incentive NFTs are feature rich & easy to use
          </div>

          <div className="steps">
            <div className="step">
              <h4>Drop Rewards</h4>
              <p>to your community based on their engagement & contribution.</p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Staking</h4>
              <p>Customize staking for your community.</p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>USDC Balances</h4>
              <p>
                Customize additional rewards for USDC balances held by your
                community.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Collabs</h4>
              <p>Setup collaborations with partner projects.</p>
            </div>
          </div>

          <a href="/">Launch Collection</a>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="title">
            The Rayze Platform <br />
            is built with features & <br />
            scale for the Enterprise
          </div>

          <div className="steps">
            <div className="step">
              <h4>Management Dashboard</h4>
              <p>
                Manage & take action across all your NFT collections & NFT
                wallets.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Analyze Incentives</h4>
              <p>
                Analyze & Manage rewards & balances earned by your community.
              </p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>Multi Chain</h4>
              <p>Deploy & Manage across multiple chains.</p>
            </div>
            <div className="line"></div>

            <div className="step">
              <h4>API/SDK</h4>
              <p>Simple integration with enterprise systems.</p>
            </div>
          </div>

          <a href="/">Dashboard</a>
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
