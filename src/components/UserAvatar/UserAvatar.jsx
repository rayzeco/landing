// ABOUTME: This component displays a user avatar with initials or profile image
// ABOUTME: Clicking the avatar opens the profile editing modal

import "./user-avatar.scss";
import React from "react";

export default function UserAvatar({ user, onClick }) {
  const getInitials = () => {
    if (!user) return "?";

    if (user.name) {
      const names = user.name.trim().split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }

    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  const displayName = user?.name || user?.email || "User";

  return (
    <div className="user-avatar" onClick={onClick} data-name={displayName}>
      <div className="user-initials">{getInitials()}</div>
    </div>
  );
}
