import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './add-candidate-page.scss';

const AddCandidatePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [clients, setClients] = useState([]);
    const [openRoles, setOpenRoles] = useState([]);
    const [filteredOpenRoles, setFilteredOpenRoles] = useState([]);
    const [submitCVRoles, setSubmitCVRoles] = useState([]);
    const [isOpenRolesEnabled, setIsOpenRolesEnabled] = useState(false);
    const [showOnlyMatched, setShowOnlyMatched] = useState(true);
    const [showTestModal, setShowTestModal] = useState(false);
    const [currentTestDoc, setCurrentTestDoc] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        role: '',
        location: '',
        phone: '',
        email: '',
        status: ''
    });
    const [newCandidate, setNewCandidate] = useState({
        name: '',
        role: '',
        location: '',
        candidate_cost: '',
        phone: '',
        email: '',
        feedback: '',
        cv_link: '',
        client_id: '',
        open_role_id: ''
    });
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [submissionNotes, setSubmissionNotes] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            const user = JSON.parse(sessionStorage.getItem('user'));
            const id = JSON.parse(sessionStorage.getItem('id'));
            console.log('id is ',id);
            
            try {
                // Fetch candidates
                const candidatesResponse = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_candidates`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch open roles
                const openRolesResponse = await axios.get(
                    `${process.env.REACT_APP_RYZ_SERVER}/list_open_roles`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Fetch submit CV roles
                const submitCVRolesResponse = await axios.get(
                    `${process.env.REACT_APP_RYZ_SERVER}/list_submit_cvroles`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Fetch clients
                const clientsResponse = await axios.get(
                    `${process.env.REACT_APP_RYZ_SERVER}/list_clients`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const allCandidates = candidatesResponse.data;
                const allOpenRoles = openRolesResponse.data;
                const allSubmitCVRoles = submitCVRolesResponse.data;
                const allClients = clientsResponse.data.filter(client => client.client_type === 'Client');

                // Store all data in state
                setCandidates(allCandidates);
                setFilteredCandidates(allCandidates);
                setOpenRoles(allOpenRoles);
                setFilteredOpenRoles(allOpenRoles);
                setSubmitCVRoles(allSubmitCVRoles);
                setClients(allClients);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = candidates.filter(candidate => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                const value = candidate[key]?.toString().toLowerCase() || '';
                return value.includes(filters[key].toLowerCase());
            });
        });

        // Apply matched roles filter if enabled
        if (showOnlyMatched) {
            filtered = filtered.filter(candidate => {
                return submitCVRoles.some(submission => submission.candidates_id === candidate.id);
            });
        }

        setFilteredCandidates(filtered);
    }, [filters, candidates, showOnlyMatched, submitCVRoles]);

    const handleFilterChange = (e, field) => {
        setFilters(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleNewCandidateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'client_id') {

            // When client changes, filter open roles for that client
            const selectedClient = clients.find(client => client.id === parseInt(value));

            if (selectedClient) {
                const filteredRoles = openRoles.filter(role => role.client_id === selectedClient.id);
                //console.log('filteredRoles is ', openRoles[0], 'openRoles is ',  selectedClient.id);
                setFilteredOpenRoles(filteredRoles);
                setIsOpenRolesEnabled(true);
                // Reset open_role_id if it's not valid for the new client
                if (!filteredRoles.some(role => role.id === newCandidate.open_role_id)) {
                    setNewCandidate(prev => ({
                        ...prev,
                        open_role_id: '',
                        [name]: value
                    }));
                    return;
                }
            } else {
                // If no client selected, disable open roles and clear selection
                setIsOpenRolesEnabled(false);
                setFilteredOpenRoles([]);
                setNewCandidate(prev => ({
                    ...prev,
                    open_role_id: '',
                    [name]: value
                }));
                return;
            }
        }
        
        setNewCandidate(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitCandidate = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        
        // Validate all required fields
        const requiredFields = {
            name: 'Name',
            role: 'Current Role',
            location: 'Location',
            phone: 'Phone',
            email: 'Email',
            candidate_cost: 'Candidate Cost',
            cv_link: 'CV Link',
            client_id: 'Client',
            open_role_id: 'Open Role'
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([field]) => !newCandidate[field])
            .map(([_, label]) => label);

        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields:\n${missingFields.join('\n')}`);
            return;
        }

        try {
            // First create the candidate
            const candidateResponse = await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_candidate`, newCandidate, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            // Then create the submit_cvrole entry
            const submitCVRoleData = {
                client_id: newCandidate.client_id,
                open_roles_id: newCandidate.open_role_id,
                candidates_id: candidateResponse.data.id,
                status: 'Submitted',
                submitted_on: new Date().toISOString(),
                remote: 'no',
                cv_link: newCandidate.cv_link
            };

            await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_submit_cvrole`, submitCVRoleData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            setNewCandidate({
                name: '',
                role: '',
                location: '',
                candidate_cost: '',
                phone: '',
                email: '',
                feedback: '',
                cv_link: '',
                client_id: '',
                open_role_id: ''
            });

            // Refresh candidate list
            const fetchCandidates = async () => {
                const response = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_candidates`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCandidates(response.data);
                setFilteredCandidates(response.data);
            };
            fetchCandidates();
            
            alert('Candidate created and submitted successfully!');
        } catch (error) {
            console.error('Error creating candidate:', error);
            alert('Error creating candidate. Please try again.');
        }
    };

    const handleRowClick = (candidateId) => {
        navigate(`/candidate/${candidateId}`);
    };

    const handleCVClick = (e, cvLink) => {
        e.stopPropagation();
        window.open(cvLink, '_blank');
    };

    const handleJDClick = (e, jdLink) => {
        e.stopPropagation();
        window.open(jdLink, '_blank');
    };

    const handleDownloadTest = (e, candidateId) => {
        e.stopPropagation();
        
        // Find the submission for this candidate
        const submission = getCVRoleSubmission(candidateId);
        if (!submission) return;
        
        // Find the open role associated with this submission
        const openRole = openRoles.find(role => role.id === submission.open_roles_id);
        if (!openRole || !openRole.test_doc) {
            alert('No test document available for this role.');
            return;
        }
        
        // Set the test document content and show the modal
        setCurrentTestDoc(openRole.test_doc);
        setShowTestModal(true);
    };

    const handleCloseModal = () => {
        setShowTestModal(false);
        setCurrentTestDoc('');
    };

    // Helper function to get CV role submission for a candidate
    const getCVRoleSubmission = (candidateId) => {
        return submitCVRoles.find(submission => submission.candidates_id === candidateId);
    };

    // Helper function to get client name by ID
    const getClientName = (clientId) => {
        const client = clients.find(client => client.id === clientId);
        return client ? client.name : '-';
    };

    // Helper function to get open role description by ID
    const getOpenRoleDesc = (openRoleId) => {
        const role = openRoles.find(role => role.id === openRoleId);
        return role ? role.role_desc : '-';
    };

    // Helper function to get JD link for an open role
    const getJDLink = (openRoleId) => {
        const role = openRoles.find(role => role.id === openRoleId);
        return role ? role.job_desc_link : null;
    };

    const handleToggleMatched = () => {
        setShowOnlyMatched(!showOnlyMatched);
    };

    const handleCandidateSelect = (e) => {
        setSelectedCandidate(e.target.value);
    };

    const handleClientSelect = (e) => {
        setSelectedClient(e.target.value);
    };

    const handleRoleSelect = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleNotesChange = (e) => {
        setSubmissionNotes(e.target.value);
    };

    const handleSubmitCVRole = () => {
        // Implementation of handleSubmitCVRole function
    };

    return (
        <div className="add-candidate-container">
            <div className="panel">
                <h1>Candidates</h1>

                {/* Submit Candidate for Open Role Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        <h2>Submit Candidate for Open Role</h2>
                        <span className={`arrow ${showAddForm ? 'open' : ''}`}>▼</span>
                    </div>
                    {showAddForm && (
                        <form onSubmit={handleSubmitCandidate} className="add-candidate-form">
                            {/* First Row: Name, Current Role, Location */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter candidate name"
                                        value={newCandidate.name}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Current Role</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        placeholder="Enter current role"
                                        value={newCandidate.role}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder="Enter location"
                                        value={newCandidate.location}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Second Row: Phone, Email, Candidate Cost */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={newCandidate.phone}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        value={newCandidate.email}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="candidate_cost">Candidate Cost</label>
                                    <input
                                        type="number"
                                        id="candidate_cost"
                                        name="candidate_cost"
                                        placeholder="Enter candidate cost"
                                        value={newCandidate.candidate_cost}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Third Row: Feedback */}
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label htmlFor="feedback">Feedback</label>
                                    <textarea
                                        id="feedback"
                                        name="feedback"
                                        placeholder="Enter feedback about the candidate"
                                        value={newCandidate.feedback}
                                        onChange={handleNewCandidateChange}
                                        rows="3"
                                    />
                                </div>
                            </div>
                            {/* Fourth Row: CV Link */}
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label htmlFor="cv_link">CV Link</label>
                                    <input
                                        type="url"
                                        id="cv_link"
                                        name="cv_link"
                                        placeholder="Enter CV link"
                                        value={newCandidate.cv_link}
                                        onChange={handleNewCandidateChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Fifth Row: Client, Open Role, Submit Button */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="client_id">Client</label>
                                    <select
                                        id="client_id"
                                        name="client_id"
                                        value={newCandidate.client_id}
                                        onChange={handleNewCandidateChange}
                                        required
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="open_role_id">Open Role</label>
                                    <select
                                        id="open_role_id"
                                        name="open_role_id"
                                        value={newCandidate.open_role_id}
                                        onChange={handleNewCandidateChange}
                                        required
                                        disabled={!isOpenRolesEnabled}
                                    >
                                        <option value="">Select an open role</option>
                                        {filteredOpenRoles.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.role_desc}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="submit-button">
                                        Add Candidate
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Filters Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <h2>Filter Candidates</h2>
                        <span className={`arrow ${showFilters ? 'open' : ''}`}>▼</span>
                    </div>
                    {showFilters && (
                        <div className="filters">
                            <input
                                type="text"
                                placeholder="Filter by name"
                                value={filters.name}
                                onChange={(e) => handleFilterChange(e, 'name')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Current Role"
                                value={filters.role}
                                onChange={(e) => handleFilterChange(e, 'role')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by location"
                                value={filters.location}
                                onChange={(e) => handleFilterChange(e, 'location')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by phone"
                                value={filters.phone}
                                onChange={(e) => handleFilterChange(e, 'phone')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by email"
                                value={filters.email}
                                onChange={(e) => handleFilterChange(e, 'email')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by status"
                                value={filters.status}
                                onChange={(e) => handleFilterChange(e, 'status')}
                            />
                        </div>
                    )}
                    <div className="toggle-container">
                        <label className="toggle-label">
                            Only show candidates with matched roles
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={showOnlyMatched}
                                    onChange={handleToggleMatched}
                                />
                                <span className="toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div className="table-container">
                    <table cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th colSpan="5" className="section-header" style={{borderRight: '3px solid #00A389'}}>Candidate</th>
                                <th colSpan="6" className="section-header">Open Role</th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th>Current Role</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th style={{borderRight: '3px solid #00A389'}}>CV</th>
                                <th>Client</th>
                                <th>Open Role</th>
                                <th>JD Link</th>
                                <th>Test</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.map(candidate => {
                                const submission = getCVRoleSubmission(candidate.id);
                                const clientId = submission ? submission.client_id : null;
                                const openRoleId = submission ? submission.open_roles_id : null;
                                const jdLink = openRoleId ? getJDLink(openRoleId) : null;
                                
                                return (
                                    <tr 
                                        key={candidate.id} 
                                        onClick={() => handleRowClick(candidate.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{candidate.name || '-'}</td>
                                        <td>{candidate.role || '-'}</td>
                                        <td>{candidate.location || '-'}</td>
                                        <td>{candidate.status || '-'}</td>
                                        <td style={{borderRight: '3px solid #00A389'}}>
                                            {candidate.cv_link ? (
                                                <button 
                                                    type="button"
                                                    className="cv-link"
                                                    onClick={(e) => handleCVClick(e, candidate.cv_link)}
                                                >
                                                    View CV
                                                </button>
                                            ) : '-'}
                                        </td>
                                        <td>{clientId ? getClientName(clientId) : '-'}</td>
                                        <td>{openRoleId ? getOpenRoleDesc(openRoleId) : '-'}</td>
                                        <td>
                                            {jdLink ? (
                                                <button 
                                                    type="button"
                                                    className="jd-link"
                                                    onClick={(e) => handleJDClick(e, jdLink)}
                                                >
                                                    View JD
                                                </button>
                                            ) : '-'}
                                        </td>
                                        <td>
                                            {submission ? (
                                                <button 
                                                    type="button"
                                                    className="download-test"
                                                    onClick={(e) => handleDownloadTest(e, candidate.id)}
                                                >
                                                    Download Test
                                                </button>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Test Document Modal */}
            {showTestModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Test Document</h2>
                            <button className="close-button" onClick={handleCloseModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{ __html: currentTestDoc }} />
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={handleCloseModal}>Close</button>
                            <button 
                                className="modal-button primary"
                                onClick={() => {
                                    // Create a printable version
                                    const printWindow = window.open('', '_blank');
                                    printWindow.document.write(`
                                        <html>
                                            <head>
                                                <title>Test Document</title>
                                                <style>
                                                    body { font-family: Arial, sans-serif; padding: 20px; }
                                                </style>
                                            </head>
                                            <body>
                                                ${currentTestDoc}
                                            </body>
                                        </html>
                                    `);
                                    printWindow.document.close();
                                    printWindow.print();
                                }}
                            >
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCandidatePage;