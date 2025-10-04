import "./header.scss";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import ProfileModal from "../../components/ProfileModal/ProfileModal";


export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);
      return {
        name: userData.name || userData.email,
        email: userData.email
      };
    }
    return null;
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfileSave = (profileData) => {
    setUser({
      name: profileData.name || profileData.email,
      email: profileData.email
    });
  };

  const handleAvatarClick = () => {
    setProfileModalOpen(true);
  };

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
          <Link to={"/team"}>Who we are</Link>
          <Link to={"/clients"}>How we help clients</Link>
          <Link to={"/ailab"}>AI Lab</Link>
          <Link to={"/console"}>Console</Link>
          <button
            className="wallet-button"
            onClick={handleLogin}
          >
            <img src="/images/wallet-account.svg" alt="wallet-account" />
            Login
          </button>
          {user && <UserAvatar user={user} onClick={handleAvatarClick} />}
        </div>
      </div>
      <ProfileModal
        isOpen={profileModalOpen}
        onRequestClose={() => setProfileModalOpen(false)}
        user={user}
        onSave={handleProfileSave}
      />
    </header>
  );
}
