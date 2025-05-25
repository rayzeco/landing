import "./rayze-console.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddCandidatePage from "../AddCandidatePage/AddCandidatePage";
import AddOpenRolesPage from "../AddOpenRoles/AddOpenRolesPage";
import InvoicePage from "../InvoicePage/InvoicePage";
import SelectInvoicePage from "../SelectInvoicePage/SelectInvoicePage";


export default function RayzeConsole() {
  const [activeTab, setActiveTab] = useState("home");
  const [consoleData, setConsoleData] = useState({
    payroll_candidates: 0,
    hired_last_month: 0
  });
  const [activityData, setActivityData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const [consoleResponse, activityResponse] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_RYZ_SERVER}/get_console_data`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.get(
            `${process.env.REACT_APP_RYZ_SERVER}/get_console_activity`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ]);
        setConsoleData(consoleResponse.data);
        setActivityData(activityResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getActivityIcon = (title) => {
    switch (title) {
      case 'New Hire':
        return 'H';
      case 'Candidate Submitted':
        return 'C';
      case 'New Open Role':
        return 'R';
      default:
        return '•';
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <div className="content-header">
              <h1>Recruiting Overview</h1>
              <div className="header-actions">
                <button className="btn-primary" onClick={() => setActiveTab("candidates")}>New Candidate</button>
                <button className="btn-primary" onClick={() => setActiveTab("timesheet")}>New Timesheet</button>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Candidates on Payroll</h3>
                <div className="card-value">{consoleData.payroll_candidates}</div>
                <div className="card-trend positive">+{consoleData.hired_last_month} this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Submitted for Open Roles</h3>
                <div className="card-value">{consoleData.submit_cvs}</div>
                <div className="card-trend positive">+{consoleData.submit_last_month} this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Active Open Roles</h3>
                <div className="card-value">{consoleData.active_roles}</div>
                <div className="card-trend positive">+{consoleData.roles_last_month} this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Total Hours last month</h3>
                <div className="card-value">{consoleData.invoice_hours}</div>
                <div className="card-trend neutral">
                  {consoleData.max_invoice_date ? new Date(consoleData.max_invoice_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'No data'}
                </div>
              </div>
            </div>
 
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {activityData.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {getActivityIcon(activity.title)}
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-meta">{activity.name} • {activity.days_ago} days ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case "candidates":
        return <AddCandidatePage />;
      case "open_roles":
        return <AddOpenRolesPage />;
      case "timesheet":
        return <InvoicePage />;
      case "invoice":
        return <SelectInvoicePage />;
      default:
        return (
          <>
            <div className="content-header">
              <h1>Client Overview</h1>
              <div className="header-actions">
                <button className="btn-primary">New Project</button>
                <button className="btn-secondary">Invite Member</button>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Rayze Team size</h3>
                <div className="card-value">12</div>
                <div className="card-trend positive">+2 this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Total Open Roles</h3>
                <div className="card-value">8</div>
                <div className="card-trend positive">+1 this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Candidates to review</h3>
                <div className="card-value">85%</div>
                <div className="card-trend neutral">Stable</div>
              </div>
              <div className="dashboard-card">
                <h3>Pending Interviews</h3>
                <div className="card-value">2.4TB</div>
                <div className="card-trend negative">+15% this month</div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Review Candidates</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-code-branch"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">New deployment completed</div>
                    <div className="activity-meta">Project Alpha • 2 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">New team member joined</div>
                    <div className="activity-meta">Sarah Johnson • 5 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Documentation updated</div>
                    <div className="activity-meta">API Reference • 1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="recent-activity">
              <h2>Pending Invoices</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-code-branch"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">New deployment completed</div>
                    <div className="activity-meta">Project Alpha • 2 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">New team member joined</div>
                    <div className="activity-meta">Sarah Johnson • 5 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Documentation updated</div>
                    <div className="activity-meta">API Reference • 1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="recent-activity">
              <h2>Pending Work Orders</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-code-branch"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">New deployment completed</div>
                    <div className="activity-meta">Project Alpha • 2 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">New team member joined</div>
                    <div className="activity-meta">Sarah Johnson • 5 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Documentation updated</div>
                    <div className="activity-meta">API Reference • 1 day ago</div>
                  </div>
                </div>
              </div>
            </div>

          </>
        );
    }
  };

  return (
    <div className="rayze-console">
      <div className="logo-container">
        <img src="/images/logo-text-black.svg" alt="Rayze" className="logo" />
      </div>
      <div className="console-content">
        <div className="sidebar">
          <nav className="main-nav">
            <div className="nav-section">
              <h3>Main</h3>
              <ul>
                <li className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
                  <i className="fas fa-home"></i>
                  Console Home
                </li>
                <li className={activeTab === "candidates" ? "active" : ""} onClick={() => setActiveTab("candidates")}>
                  <i className="fas fa-users"></i>
                  Candidates
                </li>
                <li className={activeTab === "open_roles" ? "active" : ""} onClick={() => setActiveTab("open_roles")}>
                  <i className="fas fa-chart-line"></i>
                  Open Roles
                </li>
                <li className={activeTab === "timesheet" ? "active" : ""} onClick={() => setActiveTab("timesheet")}>
                  <i className="fas fa-users"></i>
                  Timesheets
                </li>
                <li className={activeTab === "invoice" ? "active" : ""} onClick={() => setActiveTab("invoice")}>
                  <i className="fas fa-project-diagram"></i>
                  Invoice
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h3>Roles</h3>
              <ul>
                <li className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
                  <i className="fas fa-book"></i>
                  Clients
                </li>
                <li className={activeTab === "api" ? "active" : ""} onClick={() => setActiveTab("api")}>
                  <i className="fas fa-code"></i>
                  Recruiting
                </li>
                <li className={activeTab === "support" ? "active" : ""} onClick={() => setActiveTab("support")}>
                  <i className="fas fa-headset"></i>
                  Operations
                </li>
                <li className={activeTab === "support" ? "active" : ""} onClick={() => setActiveTab("support")}>
                  <i className="fas fa-headset"></i>
                  Finance
                </li>
                <li className={activeTab === "support" ? "active" : ""} onClick={() => setActiveTab("support")}>
                  <i className="fas fa-headset"></i>
                  Payroll
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
} 