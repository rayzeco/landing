import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin-page.scss';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeEntity, setActiveEntity] = useState('clients');
  const [userRole, setUserRole] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeoutError, setTimeoutError] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0 });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const entities = {
    clients: {
      name: 'Clients',
      apiEndpoint: 'clients',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'client_mgr', label: 'Client Manager', type: 'text', required: true },
        { key: 'client_email', label: 'Email', type: 'email', required: true },
        { key: 'client_addr', label: 'Address', type: 'textarea', required: true },
        { key: 'client_phone', label: 'Phone', type: 'text', required: true },
        { key: 'payment_freq', label: 'Payment Frequency', type: 'text' },
        { key: 'client_type', label: 'Client Type', type: 'text' },
        { key: 'projects', label: 'Projects', type: 'textarea', searchable: true }
      ]
    },
    users: {
      name: 'Users',
      apiEndpoint: 'users',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'msg_id', label: 'Message ID', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'select', required: true, options: ['ADMIN', 'Recruiter', 'Client'] },
        { key: 'password', label: 'Password', type: 'password', required: true, hideInTable: true },
        { key: 'client_id', label: 'Client ID', type: 'number' },
        { key: 'projects', label: 'Projects', type: 'textarea', searchable: true }
      ]
    },
    candidates: {
      name: 'Candidates',
      apiEndpoint: 'candidates',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'location', label: 'Location', type: 'text', required: true },
        { key: 'candidate_cost', label: 'Cost', type: 'number', required: true },
        { key: 'phone', label: 'Phone', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'feedback', label: 'Feedback', type: 'textarea', searchable: true },
        { key: 'cv_link', label: 'CV Link', type: 'url' },
        { key: 'status', label: 'Status', type: 'text' },
        { key: 'client_id', label: 'Client ID', type: 'number' },
        { key: 'project_name', label: 'Project Name', type: 'text' },
        { key: 'recruiter_id', label: 'Recruiter ID', type: 'number' }
      ]
    },
    open_roles: {
      name: 'Open Roles',
      apiEndpoint: 'open_roles',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'client_id', label: 'Client ID', type: 'number', required: true },
        { key: 'role_desc', label: 'Role Description', type: 'textarea', required: true, searchable: true },
        { key: 'location', label: 'Location', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'text', required: true },
        { key: 'posted_on', label: 'Posted On', type: 'datetime-local', required: true },
        { key: 'remote', label: 'Remote', type: 'text', required: true },
        { key: 'job_desc_link', label: 'Job Description Link', type: 'url', required: true },
        { key: 'test_doc', label: 'Test Document', type: 'textarea', searchable: true },
        { key: 'jd_doc', label: 'JD Document', type: 'textarea', searchable: true },
        { key: 'project_name', label: 'Project Name', type: 'text' }
      ]
    },
    submit_cv_roles: {
      name: 'Submit CV Roles',
      apiEndpoint: 'submit_cvroles',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'client_id', label: 'Client ID', type: 'number', required: true },
        { key: 'open_roles_id', label: 'Open Role ID', type: 'number', required: true },
        { key: 'candidates_id', label: 'Candidate ID', type: 'number', required: true },
        { key: 'status', label: 'Status', type: 'text', required: true },
        { key: 'submitted_on', label: 'Submitted On', type: 'datetime-local', required: true },
        { key: 'remote', label: 'Remote', type: 'text', required: true },
        { key: 'cv_link', label: 'CV Link', type: 'url', required: true },
        { key: 'test_answers', label: 'Test Answers', type: 'textarea', searchable: true },
        { key: 'test_score', label: 'Test Score', type: 'textarea', searchable: true },
        { key: 'match_score', label: 'Match Score', type: 'textarea', searchable: true },
        { key: 'interview_options', label: 'Interview Options', type: 'textarea', searchable: true },
        { key: 'interview_confirmed_on', label: 'Interview Confirmed On', type: 'datetime-local' }
      ]
    },
    transactions: {
      name: 'Transactions',
      apiEndpoint: 'transactions',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'txn_date', label: 'Transaction Date', type: 'datetime-local' },
        { key: 'candidate_id', label: 'Candidate ID', type: 'number', required: true },
        { key: 'client_id', label: 'Client ID', type: 'number', required: true },
        { key: 'recruiter_id', label: 'Recruiter ID', type: 'number' },
        { key: 'referral_id', label: 'Referral ID', type: 'number' },
        { key: 'client_price', label: 'Client Price', type: 'number', required: true },
        { key: 'referral_price', label: 'Referral Price', type: 'number' },
        { key: 'recruiter_price', label: 'Recruiter Price', type: 'number' },
        { key: 'start_date', label: 'Start Date', type: 'datetime-local', required: true },
        { key: 'end_date', label: 'End Date', type: 'datetime-local', required: true },
        { key: 'num_payments_received', label: 'Payments Received', type: 'number' },
        { key: 'total_client_recv', label: 'Total Client Received', type: 'number' },
        { key: 'total_recruiter_paid', label: 'Total Recruiter Paid', type: 'number' },
        { key: 'total_referral_paid', label: 'Total Referral Paid', type: 'number' },
        { key: 'last_payment_date', label: 'Last Payment Date', type: 'datetime-local' }
      ]
    },
    client_invoices: {
      name: 'Client Invoices',
      apiEndpoint: 'client_invoices',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'inv_date', label: 'Invoice Date', type: 'text' },
        { key: 'due_date', label: 'Due Date', type: 'text' },
        { key: 'period_start', label: 'Period Start', type: 'text' },
        { key: 'period_end', label: 'Period End', type: 'text' },
        { key: 'client_id', label: 'Client ID', type: 'number', required: true },
        { key: 'client_name', label: 'Client Name', type: 'text', required: true },
        { key: 'client_contact', label: 'Client Contact', type: 'text', required: true },
        { key: 'client_email', label: 'Client Email', type: 'email', required: true },
        { key: 'client_addr', label: 'Client Address', type: 'textarea', required: true },
        { key: 'client_phone', label: 'Client Phone', type: 'text', required: true },
        { key: 'explain_str', label: 'Explanation', type: 'textarea', required: true, searchable: true },
        { key: 'inv_html', label: 'Invoice HTML', type: 'textarea', required: true, searchable: true, hideInTable: true },
        { key: 'inv_hash', label: 'Invoice Hash', type: 'text', required: true },
        { key: 'inv_value', label: 'Invoice Value', type: 'number', required: true },
        { key: 'inv_status', label: 'Invoice Status', type: 'text', required: true },
        { key: 'invoice_link', label: 'Invoice Link', type: 'url' },
        { key: 'pay_recruiter', label: 'Pay Recruiter', type: 'number' }
      ]
    },
    invoices: {
      name: 'Invoices',
      apiEndpoint: 'invoices',
      fields: [
        { key: 'id', label: 'ID', type: 'number', readonly: true },
        { key: 'inv_date', label: 'Invoice Date', type: 'text' },
        { key: 'candidate_id', label: 'Candidate ID', type: 'number', required: true },
        { key: 'period_start', label: 'Period Start', type: 'text' },
        { key: 'period_end', label: 'Period End', type: 'text' },
        { key: 'txn_id', label: 'Transaction ID', type: 'number', required: true },
        { key: 'hours_worked', label: 'Hours Worked', type: 'number' },
        { key: 'inv_value', label: 'Invoice Value', type: 'number', required: true },
        { key: 'inv_status', label: 'Invoice Status', type: 'text' },
        { key: 'recruiter_price', label: 'Recruiter Price', type: 'number' },
        { key: 'client_price', label: 'Client Price', type: 'number' },
        { key: 'recruiter_total', label: 'Recruiter Total', type: 'number' },
        { key: 'client_total', label: 'Client Total', type: 'number' }
      ]
    }
  };

  const currentEntity = entities[activeEntity];

  // Check user role and redirect if unauthorized
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    const role = user.role;
    if (role !== 'ADMIN') {
      navigate('/unauthorized');
      return;
    }

    setUserRole(role);
  }, [navigate]);

  useEffect(() => {
    if (userRole) {
      fetchData();
    }
  }, [activeEntity, userRole]);

  const fetchData = async () => {
    setLoading(true);
    setTimeoutError(null);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_RYZ_SERVER}/list_${currentEntity.apiEndpoint}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${currentEntity.name}:`, error);
      setTimeoutError({
        type: 'session_expired',
        message: 'Your session has expired. Please log in again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreate = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_RYZ_SERVER}/new_${currentEntity.apiEndpoint.slice(0, -1)}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowCreateModal(false);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error(`Error creating ${currentEntity.name}:`, error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_RYZ_SERVER}/update_${currentEntity.apiEndpoint.slice(0, -1)}/${selectedRecord.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowEditModal(false);
      setSelectedRecord(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error(`Error updating ${currentEntity.name}:`, error);
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setFormData({ ...record });
    setShowEditModal(true);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (fieldKey) => {
    if (sortConfig.key !== fieldKey) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const filteredData = React.useMemo(() => {
    let filtered = data.filter(item => {
      return Object.keys(searchFilters).every(field => {
        if (!searchFilters[field]) return true;
        const value = item[field]?.toString().toLowerCase() || '';
        return value.includes(searchFilters[field].toLowerCase());
      });
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle null/undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
        if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
        
        // Handle different data types
        let comparison = 0;
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        } else {
          // Convert to string for comparison
          comparison = String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase());
        }
        
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, searchFilters, sortConfig]);

  const renderField = (field, value, onChange) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="form-input"
            rows="3"
          />
        );
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="form-input"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="form-input"
            readOnly={field.readonly}
          />
        );
    }
  };

  const renderModal = (isEdit = false) => (
    <div className="modal-overlay" onClick={() => isEdit ? setShowEditModal(false) : setShowCreateModal(false)}>
      <div className="modal-content admin-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? 'Edit' : 'Create'} {currentEntity.name}</h2>
          <button 
            className="close-button" 
            onClick={() => isEdit ? setShowEditModal(false) : setShowCreateModal(false)}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            {currentEntity.fields.map(field => (
              <div key={field.key} className="form-group">
                <label htmlFor={field.key}>
                  {field.label}
                  {field.required && <span className="required">*</span>}
                </label>
                {renderField(field, formData[field.key], (key, value) => 
                  setFormData(prev => ({ ...prev, [key]: value }))
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button 
            className="modal-button cancel" 
            onClick={() => isEdit ? setShowEditModal(false) : setShowCreateModal(false)}
          >
            Cancel
          </button>
          <button 
            className="modal-button confirm" 
            onClick={isEdit ? handleUpdate : handleCreate}
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );

  // If user role is not set yet, don't render anything
  if (!userRole) {
    return null;
  }

  return (
    <div className="admin-crud">
      <div className="content-header">
        <h1>Admin CRUD Operations</h1>

        {/* Error State */}
        {timeoutError && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {timeoutError.message}
            <button
              className="login-redirect-button"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        )}
        <div className="header-actions">
          <button 
            className="btn-primary" 
            onClick={() => setShowCreateModal(true)}
          >
            Create New {currentEntity.name}
          </button>
        </div>
      </div>

      <div className="entity-tabs">
        {Object.keys(entities).map(entityKey => (
          <button
            key={entityKey}
            className={`entity-tab ${activeEntity === entityKey ? 'active' : ''}`}
            onClick={() => setActiveEntity(entityKey)}
          >
            {entities[entityKey].name}
          </button>
        ))}
      </div>

      <div className="search-section">
        <h3>Search & Filter</h3>
        <div className="search-grid">
          {currentEntity.fields
            .filter(field => field.searchable || ['text', 'email', 'number'].includes(field.type))
            .map(field => (
            <div key={field.key} className="search-group">
              <label>{field.label}</label>
              <input
                type="text"
                placeholder={`Search by ${field.label.toLowerCase()}`}
                value={searchFilters[field.key] || ''}
                onChange={(e) => handleSearch(field.key, e.target.value)}
                className="search-input"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Actions</th>
                {currentEntity.fields
                  .filter(field => !field.hideInTable)
                  .map(field => (
                  <th 
                    key={field.key}
                    className="sortable-header"
                    onClick={() => handleSort(field.key)}
                  >
                    <div className="header-content">
                      <span>{field.label}</span>
                      <span className="sort-icon">{getSortIcon(field.key)}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(record => (
                <tr key={record.id}>
                  <td>
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </button>
                  </td>
                  {currentEntity.fields
                    .filter(field => !field.hideInTable)
                    .map(field => (
                    <td key={field.key}>
                      {field.type === 'textarea' && record[field.key] ? 
                        <div title={record[field.key]}>
                          {record[field.key].substring(0, 100)}
                          {record[field.key].length > 100 ? '...' : ''}
                        </div>
                        : record[field.key] || '-'
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-footer">
        <span>Total Records: {filteredData.length}</span>
      </div>

      {showCreateModal && renderModal(false)}
      {showEditModal && renderModal(true)}
    </div>
  );
};

export default AdminPage;