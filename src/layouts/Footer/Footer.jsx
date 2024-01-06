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
            <h1></h1>
            <div className="social-buttons">
              <a href="mailto:rayzeco@github.com" target="_blank"><img src="/images/github3.png" alt="github" /></a>
              <a href="https://t.me/+RXiRbUJ3FagzN2U5" target="_blank"><img src="/images/telegram2.png" alt="telegram" /></a>
              <a href="https://discord.gg/aKR7Vg8qyS" target="_blank"><img src="/images/discord.svg" alt="discord" /></a>
            </div>
          </div>
        </div>
      </div>


      <div className="bottom">
        <p>Rayze is an O3 Ventures company {'\u00A0'}{'\u00A0'}|{'\u00A0'} {'\u00A0'}</p>
        <Link to='/guidelines'>Terms of Use</Link>
        &
        <Link to='/policy'>Privacy Policy</Link>
      </div>
    </footer>
  );
}
