import "./header.scss";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation()

  useEffect(() => {
    if(location.pathname === '/dashboard') {
      console.log("dashboard")
    }
  }, [location])

  return (
    <header id="header">
      <Link to="/" className="logo">
        <img src="/images/logo-text-white.svg" alt="logo" />
      </Link>
      <div
        className="top-menu"
        onClick={() => {
          if (showMenu) setShowMenu(false);
        }}
      >
        <div className={"menu-bg" + (showMenu === true ? " show" : "")}></div>
        <div
          className={"menu-button" + (showMenu === true ? " close" : "")}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <div className="line"></div>
        </div>
        <div className={"menu-list" + (showMenu === true ? " show" : "")}>
          <Link to={'/'}>Engagement</Link>
          <Link to={'/'}>Crowd Funding</Link>
          <Link to={'/'}>Share Ownership</Link>
          <Link to={'/'}>Utility Tokens</Link>
          <Link to={'/dashboard'}>Dashboard</Link>
          <a href="#app" className="launch-button">
            Launch Collection
          </a>
        </div>
      </div>
    </header>
  );
}
