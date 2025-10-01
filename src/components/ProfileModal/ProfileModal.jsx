// ABOUTME: This component displays a modal for editing user profile information
// ABOUTME: Allows users to update their name, email, and other profile fields from the database

import './profile-modal.scss';

import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from 'axios';

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(70, 70, 70, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    border: "none",
    background: "black",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    padding: "40px",
    width: "96%",
    maxWidth: "500px",
    borderRadius: 0,
    inset: "0",
  },
};

export default function ProfileModal({ isOpen, onRequestClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg_id: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // Fetch user data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const sessionUser = JSON.parse(sessionStorage.getItem('user'));
      const token = sessionStorage.getItem('token');

      if (!sessionUser || !token) {
        throw new Error('No session data found');
      }

      const response = await axios.get(
        `${process.env.REACT_APP_RYZ_SERVER}/find_user/${sessionUser.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data;
      const newFormData = {
        name: userData.name || "",
        email: userData.email || "",
        msg_id: userData.msg_id || "",
        role: userData.role || "",
      };

      setFormData(newFormData);
      setOriginalData(newFormData);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const sessionUser = JSON.parse(sessionStorage.getItem('user'));
      const token = sessionStorage.getItem('token');

      if (!sessionUser || !token) {
        throw new Error('No session data found');
      }

      // Only send fields that changed
      const changedFields = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== originalData[key]) {
          changedFields[key] = formData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        onRequestClose();
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_RYZ_SERVER}/update_user/${sessionUser.id}`,
        changedFields,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update session storage with new data
      const updatedUser = { ...sessionUser, ...formData };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));

      // Call the parent's onSave callback
      if (onSave) {
        onSave(formData);
      }

      onRequestClose();
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
    >
      <div className="profile-modal">
        <h1>Edit Profile</h1>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="msg_id">Phone Number</label>
            <input
              type="text"
              id="msg_id"
              name="msg_id"
              value={formData.msg_id}
              onChange={handleChange}
              placeholder="Enter your phone number"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              disabled={true}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="cancel-button" onClick={onRequestClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
