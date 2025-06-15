import "./rayze-console.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddCandidatePage from "../AddCandidatePage/AddCandidatePage";
import AddOpenRolesPage from "../AddOpenRoles/AddOpenRolesPage";
import InvoicePage from "../InvoicePage/InvoicePage";
import SelectInvoicePage from "../SelectInvoicePage/SelectInvoicePage";



export default function RayzeConsole() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || "home";
  });
  const [consoleData, setConsoleData] = useState({
    payroll_candidates: 0,
    hired_last_month: 0
  });
  const [activityData, setActivityData] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [openRoles, setOpenRoles] = useState([]);
  const [filteredOpenRoles, setFilteredOpenRoles] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(() => {
    return localStorage.getItem('selectedClientId') || null;
  });
  const [clientSearch, setClientSearch] = useState(() => {
    const savedClientId = localStorage.getItem('selectedClientId');
    if (savedClientId) {
      const savedClient = clients.find(client => client.id === savedClientId);
      return savedClient ? savedClient.name : '';
    }
    return '';
  });
  const [filters, setFilters] = useState({
    name: '',
    role: '',
    location: '',
    status: '',
    role_desc: '',
    client_name: '',
    role_status: ''
  });
  const [showMatchScoreModal, setShowMatchScoreModal] = useState(false);
  const [matchScoreResult, setMatchScoreResult] = useState(null);
  const navigate = useNavigate();

  // Check user role and redirect if unauthorized
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    const role = user.role;
    if (role !== 'ADMIN' && role !== 'Recruiter' && role !== 'Client') {
      navigate('/unauthorized');
      return;
    }

    setUserRole(role);
    
    // If user is Client, force them to Client Console
    if (role === 'Client') {
      setActiveTab("home");
    }
  }, [navigate]);

  // Update localStorage when activeTab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  // Fetch data for home tab
  useEffect(() => {
    const fetchHomeData = async () => {
      if (activeTab !== "home") return;

      try {
        const token = sessionStorage.getItem('token');
        const user_data = JSON.parse(sessionStorage.getItem('user'));
        const user_role = user_data.role;
        const client_id = user_data.client_id;
        const user_id = user_data.id;

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
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, [activeTab]); // Only re-run when activeTab changes

  // Fetch clients first - only for non-client users and client_console tab
  useEffect(() => {
    const fetchClients = async () => {
      // Don't fetch if:
      // 1. User is a Client
      // 2. Not in client_console tab
      if (userRole === 'Client' || activeTab !== "client_console") return;

      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_RYZ_SERVER}/list_clients`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [userRole, activeTab]);

  // Fetch data for client_console tab
  useEffect(() => {
    const fetchClientConsoleData = async () => {
      // Don't fetch if:
      // 1. Not in client_console tab
      // 2. User is a Client
      if (activeTab !== "client_console" || userRole === 'Client') return;

      try {
        const token = sessionStorage.getItem('token');
        const user_data = JSON.parse(sessionStorage.getItem('user'));
        const user_role = user_data.role;
        const user_id = user_data.id;
        const client_id = selectedClientId || user_data.client_id;
        console.log('client_id', client_id);

        const [consoleResponse, activityResponse, candidatesResponse, openRolesResponse] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_RYZ_SERVER}/get_console_data_by_client/${client_id}`,
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
          ),
          axios.get(`${process.env.REACT_APP_RYZ_SERVER}/get_console_candidates_by_client/${client_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${process.env.REACT_APP_RYZ_SERVER}/find_open_roles/${client_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        ]);

        console.log('consoleResponse', consoleResponse.data);
        setConsoleData(consoleResponse.data);
        setActivityData(activityResponse.data);
        setCandidates(candidatesResponse.data);
        setFilteredCandidates(candidatesResponse.data);
        setOpenRoles(openRolesResponse.data);
        setFilteredOpenRoles(openRolesResponse.data);
      } catch (error) {
        console.error('Error fetching client console data:', error);
      }
    };

    fetchClientConsoleData();
  }, [activeTab, userRole, selectedClientId]);

  // Add filter effect
  useEffect(() => {
    let filtered = candidates.filter(candidate => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        const value = candidate[key]?.toString().toLowerCase() || '';
        return value.includes(filters[key].toLowerCase());
      });
    });
    setFilteredCandidates(filtered);
  }, [filters, candidates]);

  // Add client search effect
  useEffect(() => {
    if (clientSearch) {
      const matchingClient = clients.find(client => 
        client.name.toLowerCase() === clientSearch.toLowerCase()
      );
      if (matchingClient) {
        setSelectedClientId(matchingClient.id);
        localStorage.setItem('selectedClientId', matchingClient.id);
      } else {
        setSelectedClientId(null);
        localStorage.removeItem('selectedClientId');
      }
    } else {
      setSelectedClientId(null);
      localStorage.removeItem('selectedClientId');
    }
  }, [clientSearch, clients]);

  const handleFilterChange = (e, field) => {
    setFilters(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleClientSearch = (e) => {
    const value = e.target.value;
    setClientSearch(value);

    // Find matching client names for autocomplete
    const matchingClients = clients.filter(client => 
      client.name.toLowerCase().includes(value.toLowerCase())
    );

    // If there's an exact match, set the client ID immediately
    if (matchingClients.length === 1 && matchingClients[0].name.toLowerCase() === value.toLowerCase()) {
      setSelectedClientId(matchingClients[0].id);
    } else {
      setSelectedClientId(null);
    }
  };

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

  const handleMatchScoreClick = (e, matchScore) => {
    e.stopPropagation();
    setMatchScoreResult(matchScore);
    setShowMatchScoreModal(true);
  };

  const handleCloseMatchScoreModal = () => {
    setShowMatchScoreModal(false);
    setMatchScoreResult(null);
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
      case "client_console":
        return (
          <>
            <div className="content-header">
              <h1>Rayze Overview</h1>
              {userRole !== 'Client' && (
                <div className="client-search">
                  <input
                    type="text"
                    placeholder="Search client..."
                    value={clientSearch}
                    onChange={handleClientSearch}
                    className="filter-input"
                    list="client-list"
                  />
                  <datalist id="client-list">
                    {clients.map(client => (
                      <option key={client.id} value={client.name} />
                    ))}
                  </datalist>
                </div>
              )}
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Active Open Roles</h3>
                <div className="card-value">{consoleData.active_client_roles}</div>
                <div className="card-trend positive">+{consoleData.active_client_roles_last30} this month</div>
              </div>
              <div className="dashboard-card">
                <h3>CVs submitted</h3>
                <div className="card-value">{consoleData.submit_client_cvs}</div>
                <div className="card-trend positive">+{consoleData.submit_client_cvs_last30} this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Active Engineers</h3>
                <div className="card-value">{consoleData.total_active_eng}</div>
                <div className="card-trend positive">+{consoleData.total_active_eng_last30} this month</div>
              </div>
              <div className="dashboard-card">
                <h3>Hired last 30 days</h3>
                <div className="card-value">{consoleData.hired_client_cvs}</div>
                <div className="card-trend positive">+{consoleData.hired_client_cvs_last30} this month</div>
              </div>
            </div>

            {/* Open Candidates Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 style={{ color: 'var(--theme-color)' }}>Your Input Required</h2>
                <div className="filters">
                  <input
                    type="text"
                    placeholder="Filter by name"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, 'name')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by Current Role"
                    value={filters.role}
                    onChange={(e) => handleFilterChange(e, 'role')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange(e, 'location')}
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Proceed</th>
                      <th>Decline</th>
                      <th>Name</th>
                      <th>Current Role</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>CV</th>
                      <th>Match Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates
                      .filter(candidate => candidate.status === 'Submitted')
                      .map(candidate => (
                        <tr key={candidate.id}>
                          <td>
                            <button 
                              className="action-button proceed"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add your proceed logic here
                              }}
                            >
                              ✓
                            </button>
                          </td>
                          <td>
                            <button 
                              className="action-button decline"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add your decline logic here
                              }}
                            >
                              X
                            </button>
                          </td>
                          <td>{candidate.name || '-'}</td>
                          <td>{candidate.role || '-'}</td>
                          <td>{candidate.location || '-'}</td>
                          <td>
                            <span className={`status-badge ${candidate.status?.toLowerCase()}`}>
                              {candidate.status || '-'}
                            </span>
                          </td>
                          <td>
                            {candidate.cv_link && (
                              <button 
                                className="cv-link"
                                onClick={() => window.open(candidate.cv_link, '_blank')}
                              >
                                View CV
                              </button>
                            )}
                          </td>
                          <td>
                            {candidate.match_score ? (
                              <button 
                                type="button"
                                className="view-match-score"
                                onClick={(e) => handleMatchScoreClick(e, candidate.match_score)}
                              >
                                View Match
                              </button>
                            ) : '-'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Open Roles Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Open Roles</h2>
                <div className="filters">
                  <input
                    type="text"
                    placeholder="Filter by role description"
                    value={filters.role_desc || ''}
                    onChange={(e) => handleFilterChange(e, 'role_desc')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by client"
                    value={filters.client_name || ''}
                    onChange={(e) => handleFilterChange(e, 'client_name')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by status"
                    value={filters.role_status || ''}
                    onChange={(e) => handleFilterChange(e, 'role_status')}
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Role Description</th>
                      <th>Candidates Submitted</th>
                      <th>Status</th>
                      <th>JD Link</th>
                      <th>Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOpenRoles.map(role => (
                      <tr key={role.id}>
                        <td>{role.role_desc || '-'}</td>
                        <td>{role.client_name || '-'}</td>
                        <td>
                          <span className={`status-badge ${role.status?.toLowerCase()}`}>
                            {role.status || '-'}
                          </span>
                        </td>
                        <td>
                          {role.job_desc_link ? (
                            <button 
                              type="button"
                              className="action-button"
                              onClick={() => window.open(role.job_desc_link, '_blank')}
                            >
                              View JD
                            </button>
                          ) : '-'}
                        </td>
                        <td>
                          {role.test_doc ? (
                            <button 
                              type="button"
                              className="action-button"
                              onClick={() => {
                                const content = `
                                  <!DOCTYPE html>
                                  <html>
                                    <head>
                                      <title>Test Document</title>
                                      <style>
                                        body { 
                                          font-family: Arial, sans-serif; 
                                          padding: 20px;
                                        }
                                      </style>
                                    </head>
                                    <body>
                                      ${role.test_doc}
                                    </body>
                                  </html>
                                `;
                                const blob = new Blob([content], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                window.open(url, '_blank');
                              }}
                            >
                              Download Test
                            </button>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


            {/* Hired Candidates Section */}
            <div className="dashboard-section" style={{ marginTop: '2rem' }}>
              <div className="section-header">
                <h2>Hired Candidates</h2>
                <div className="filters">
                  <input
                    type="text"
                    placeholder="Filter by name"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, 'name')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by Current Role"
                    value={filters.role}
                    onChange={(e) => handleFilterChange(e, 'role')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange(e, 'location')}
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Current Role</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>CV</th>
                      <th>Hours Last Month</th>
                      <th>Hire Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates
                      .filter(candidate => candidate.status === 'Hired')
                      .map(candidate => (
                      <tr key={candidate.id}>
                        <td>{candidate.name || '-'}</td>
                        <td>{candidate.role || '-'}</td>
                        <td>{candidate.location || '-'}</td>
                        <td>
                          <span className={`status-badge ${candidate.status?.toLowerCase()}`}>
                            {candidate.status || '-'}
                          </span>
                        </td>
                        <td>
                          {candidate.cv_link && (
                            <button 
                              className="cv-link"
                              onClick={() => window.open(candidate.cv_link, '_blank')}
                            >
                              View CV
                            </button>
                          )}
                        </td>
                        <td>{candidate.hours_last_month || '-'}</td>
                        <td>
                          {candidate.hire_date ? new Date(candidate.hire_date).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      }
  };

  // If user role is not set yet, don't render anything
  if (!userRole) {
    return null;
  }

  return (
    <div className="rayze-console">
      <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/images/logo-text-black.svg" alt="Rayze" className="logo" />
      </div>
      <div className="console-content">
        <div className="sidebar">
          <nav className="main-nav">
            {(userRole === 'ADMIN' || userRole === 'Recruiter') && (
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
                  <li className={activeTab === "client_console" ? "active" : ""} onClick={() => setActiveTab("client_console")}>
                    <i className="fas fa-book"></i>
                    Client Console
                  </li>
                </ul>
              </div>
            )}

            {userRole === 'Client' && (
              <div className="nav-section">
                <h3>Client Portal</h3>
                <ul>
                  <li className="active">
                    <i className="fas fa-book"></i>
                    Client Console
                  </li>
                </ul>
              </div>
            )}

            {userRole === 'ADMIN' && (
              <div className="nav-section">
                <h3>Management</h3>
                <ul>
                  <li className={activeTab === "invoice" ? "active" : ""} onClick={() => setActiveTab("invoice")}>
                    <i className="fas fa-project-diagram"></i>
                    Invoice
                  </li>
                  <li className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
                    <i className="fas fa-book"></i>
                    Admin
                  </li>
                  <li className="disabled" style={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    pointerEvents: 'none'
                  }}>
                    <i className="fas fa-code"></i>
                    Recruiting
                  </li>
                  <li className="disabled" style={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    pointerEvents: 'none'
                  }}>
                    <i className="fas fa-headset"></i>
                    Operations
                  </li>
                  <li className="disabled" style={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    pointerEvents: 'none'
                  }}>
                    <i className="fas fa-headset"></i>
                    Finance
                  </li>
                  <li className="disabled" style={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    pointerEvents: 'none'
                  }}>
                    <i className="fas fa-headset"></i>
                    Payroll
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>

        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>

      {/* Match Score Modal */}
      {showMatchScoreModal && (
        <div className="modal-overlay" onClick={handleCloseMatchScoreModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Candidate Match Score</h2>
              <button className="close-button" onClick={handleCloseMatchScoreModal}>×</button>
            </div>
            <div className="modal-body">
              <div dangerouslySetInnerHTML={{ __html: matchScoreResult }} />
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={handleCloseMatchScoreModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
