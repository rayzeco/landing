import "./footer.scss";

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="top">
        <div className="container">
          <div className="left">
            <Link to='/' className="logo">
              <img src="/images/logo-text-white.svg" alt="logo" />
            </Link>
            <div className="social-buttons">
              <a href="/"><img src="/images/instagram.svg" alt="instagram" /></a>
              <a href="/"><img src="/images/twitter.svg" alt="twitter" /></a>
              <a href="/"><img src="/images/discord.svg" alt="discord" /></a>
            </div>
          </div>
          <div className="right">
            <div className="link-list">
              <h6>Product</h6>
              <a href="/">Features</a>
              <a href="/">Pricing</a>
              <a href="/">Dashboard</a>
            </div>
            <div className="link-list">
              <h6>Company</h6>
              <a href="/">Docs</a>
              <a href="/">Blog</a>
            </div>
            <div className="link-list">
              <h6>Legal</h6>
              <Link to='/policy'>Privacy Policy</Link>
              <Link to='/guidelines'>Membership Guidelines</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <Link to='/guidelines'>Membership Guidelines</Link>
        &
        <Link to='/policy'>Privacy Policy</Link>
      </div>
    </footer>
  );
}
