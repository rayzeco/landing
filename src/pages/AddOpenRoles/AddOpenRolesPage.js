import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './add-open-roles-page.scss';
import { FaFilePdf } from 'react-icons/fa';

const AddOpenRolesPage = () => {
    const [openRoles, setOpenRoles] = useState([]);
    const [filteredOpenRoles, setFilteredOpenRoles] = useState([]);
    const [clients, setClients] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        clientName: '',
        role_desc: '',
        location: '',
        status: '',
        remote: ''
    });
    const [clientMap, setClientMap] = useState({});
    const workTypeOptions = ['Remote', 'Hybrid', 'Office'];

    const [newOpenRole, setNewOpenRole] = useState({
        clientName: '',
        role_desc: '',
        location: '',
        status: 'Open', // Defaulted to 'Open'
        posted_on: new Date().toISOString().split('T')[0], // Default to today's date
        remote: 'no', // Default to 'no'
        job_desc: '', // Changed from job_desc_link
        job_desc_link: '' // Added new field for job description link
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_RYZ_SERVER}/list_clients`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const clientList = response.data.filter(client => client.client_type === 'Client');
                setClients(clientList);

                // Create map of client IDs to full client objects
                const clientMapping = {};
                clientList.forEach(client => {
                    clientMapping[client.id] = client;
                });
                setClientMap(clientMapping);

                // Fetch open roles after we have the client map
                await fetchOpenRoles(clientMapping);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []); // Only run once on component mount

    const fetchOpenRoles = async (clientMapping) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_open_roles`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const allOpenRoles = response.data.map(role => ({
                ...role,
                clientName: clientMapping[role.client_id]?.name || 'Unknown'
            }));
            setOpenRoles(allOpenRoles);
            setFilteredOpenRoles(allOpenRoles);
        } catch (error) {
            console.error('Error fetching open roles:', error);
        }
    };

    useEffect(() => {
        const filtered = openRoles.filter(openRole => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                const value = openRole[key]?.toString().toLowerCase() || '';
                return value.includes(filters[key].toLowerCase());
            });
        });
        setFilteredOpenRoles(filtered);
    }, [filters, openRoles]);

    const handleFilterChange = (e, field) => {
        setFilters(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleNewOpenRoleChange = (e) => {
        const { name, value } = e.target;
        setNewOpenRole(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerateEvaluation = async (jobDescLink) => {
        try {
            // First, fetch the job description content

            const response = await axios.get(jobDescLink);
            const jobDescription = response.data;
            console.log('jd ',jobDescription);

            // Create the job description object
            const jobDescriptionObj = {
                content: jobDescription
            };

            // Call the evaluation API
            const token = sessionStorage.getItem('token');
            const evalResponse = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/generate_candidate_evaluation`,
                jobDescriptionObj,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (evalResponse.data.status === 'success') {
                return evalResponse.data.evaluation;
            } else {
                throw new Error(evalResponse.data.message || 'Failed to generate evaluation');
            }
        } catch (error) {
            console.error('Error generating evaluation:', error);
            throw error;
        }
    };

    const handleSubmitOpenRole = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        // Get client ID from client name
        const selectedClient = clients.find(client => client.name === newOpenRole.clientName);
        if (!selectedClient) {
            alert('Please select a valid client');
            return;
        }

        try {
            const payload = {
                client_id: selectedClient.id,
                role_desc: newOpenRole.role_desc,
                location: newOpenRole.location,
                status: newOpenRole.status,
                posted_on: newOpenRole.posted_on,
                remote: newOpenRole.remote.toLowerCase(),
                job_desc: newOpenRole.job_desc_link // Use link if available, otherwise use text
            };

            await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_open_role`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            setNewOpenRole({
                clientName: '',
                role_desc: '',
                location: '',
                status: 'Open',
                posted_on: new Date().toISOString().split('T')[0],
                remote: 'no',
                job_desc: '',
                job_desc_link: ''
            });

            // Refresh open roles list
            await fetchOpenRoles(clientMap);

            alert('Open role created successfully!');
        } catch (error) {
            console.error('Error creating open role:', error);
            alert('Error creating open role. Please try again.');
        }
    };

    const handleRowClick = (roleId) => {
        navigate(`/open-role/${roleId}`);
    };

    const handleCVClick = (e, cvLink) => {
        e.stopPropagation();
        window.open(cvLink, '_blank');
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            alert('Please upload a PDF file');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // First, extract text from PDF
            const token = sessionStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/extract_pdf_text`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === 'success') {
                // Clean up the text by removing extra formatting
                let cleanText = response.data.text
                    .replace(/\r\n/g, '\n')
                    .replace(/\r/g, '\n')
                    .replace(/[ \t]+/g, ' ')
                    .replace(/\n\s*\n/g, '\n\n')
                    .trim();

                console.log('Cleaned PDF text:', cleanText);

                // Create the job description JSON object
                const jobDescriptionObj = {
                    content: cleanText
                };

                // Call the evaluation API
                const evalResponse = await axios.post(
                    `${process.env.REACT_APP_RYZ_SERVER}/generate_candidate_evaluation`,
                    jobDescriptionObj,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                console.log('Raw evaluation response:', evalResponse.data);

                if (evalResponse.data.status === 'success') {
                    // Parse the evaluation JSON string into an object
                    const evaluation = JSON.parse(evalResponse.data.evaluation.replace(/^```json\s*|\s*```$/g, ''));
                    console.log('Parsed evaluation:', evaluation);

                    let formattedText = '';

                    // Format Instructions
                    if (evaluation.instruction) {
                        formattedText += '**INSTRUCTIONS:**\n\n';
                        formattedText += evaluation.instruction + '\n\n';
                    }

                    // Format Questions
                    if (evaluation.questions) {
                        formattedText += '**QUESTIONS:**\n\n';
                        const questions = evaluation.questions.split('::::');
                        console.log('Split questions:', questions);
                        questions.forEach((q, index) => {
                            formattedText += `${q.trim()}\n\n`;
                        });
                        formattedText += '\n\n';
                    }

                    // Format Answers
                    if (evaluation.answers) {
                        formattedText += '**ANSWERS:**\n\n';
                        const answers = evaluation.answers.split('::::');
                        console.log('Split answers:', answers);
                        answers.forEach((a, index) => {
                            formattedText += `${a.trim()}\n`;
                        });
                    }

                    console.log('Final formatted text:', formattedText);

                    // Display the formatted text in the textarea
                    setNewOpenRole(prev => ({
                        ...prev,
                        job_desc: formattedText
                    }));
                } else {
                    throw new Error(evalResponse.data.message || 'Failed to generate evaluation');
                }
            }
        } catch (error) {
            console.error('Error processing PDF:', error);
            alert('Error processing PDF. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-open-roles-container">
            <div className="panel">
                <h1>Open Roles</h1>

                {/* Add Open Roles Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        <h2>Add Open Role</h2>
                        <span className={`arrow ${showAddForm ? 'open' : ''}`}>▼</span>
                    </div>
                    {showAddForm && (
                        <div className="add-open-roles-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="clientName">Client Name:</label>
                                    <select
                                        id="clientName"
                                        name="clientName"
                                        value={newOpenRole.clientName}
                                        onChange={handleNewOpenRoleChange}
                                        required
                                    >
                                        <option value="">Select Client...</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.name}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_desc">Role Description:</label>
                                    <input
                                        type="text"
                                        id="role_desc"
                                        name="role_desc"
                                        placeholder="Role Description"
                                        value={newOpenRole.role_desc}
                                        onChange={handleNewOpenRoleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="location">Location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder="Location"
                                        value={newOpenRole.location}
                                        onChange={handleNewOpenRoleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="remote">Remote:</label>
                                    <select
                                        id="remote"
                                        name="remote"
                                        value={newOpenRole.remote}
                                        onChange={handleNewOpenRoleChange}
                                        required
                                    >
                                        <option value="">Select Remote Type...</option>
                                        {workTypeOptions.map(type => (
                                            <option key={type.toLowerCase()} value={type.toLowerCase()}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="job_desc_link">Job Description Link:</label>
                                    <input
                                        type="text"
                                        id="job_desc_link"
                                        name="job_desc_link"
                                        placeholder="Enter job description link"
                                        value={newOpenRole.job_desc_link}
                                        onChange={handleNewOpenRoleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="job_desc">Candidate Evaluation:</label>
                                    <div className="job-desc-container">
                                        <textarea
                                            id="job_desc"
                                            name="job_desc"
                                            value={newOpenRole.job_desc || ''}
                                            onChange={handleNewOpenRoleChange}
                                            rows="10"
                                            placeholder=""
                                            style={{ color: '#333' }}
                                        />
                                        <div className="pdf-upload-container">
                                            {isLoading ? (
                                                <div className="loading-spinner">
                                                    <img src="/rayze-icon.png" alt="Loading..." className="spinning" />
                                                    <span>Generating Evaluation...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <label htmlFor="pdf-upload" className="pdf-upload-label">
                                                        <FaFilePdf className="pdf-icon" />
                                                        <span>Upload JD to generate evaluation</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="pdf-upload"
                                                        accept=".pdf"
                                                        onChange={handleFileUpload}
                                                        style={{ display: 'none' }}
                                                        disabled={isLoading}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="button" 
                                className="submit-button"
                                onClick={handleSubmitOpenRole}
                            >
                                Add Open Role
                            </button>
                        </div>
                    )}
                </div>

                {/* Filter Open Roles Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <h2>Filter Open Roles</h2>
                        <span className={`arrow ${showFilters ? 'open' : ''}`}>▼</span>
                    </div>
                    {showFilters && (
                        <div className="filters">
                            <input
                                type="text"
                                placeholder="Filter by Client Name"
                                value={filters.clientName}
                                onChange={(e) => handleFilterChange(e, 'clientName')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Role Description"
                                value={filters.role_desc}
                                onChange={(e) => handleFilterChange(e, 'role_desc')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Location"
                                value={filters.location}
                                onChange={(e) => handleFilterChange(e, 'location')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Status"
                                value={filters.status}
                                onChange={(e) => handleFilterChange(e, 'status')}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Remote"
                                value={filters.remote}
                                onChange={(e) => handleFilterChange(e, 'remote')}
                            />
                        </div>
                    )}
                </div>

                <div className="table-container">
                    <table cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Role Description</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Posted On</th>
                                <th>Remote</th>
                                <th>Job Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOpenRoles.map(role => (
                                <tr 
                                    key={role.id} 
                                    onClick={() => handleRowClick(role.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{role.clientName || '-'}</td>
                                    <td>{role.role_desc || '-'}</td>
                                    <td>{role.location || '-'}</td>
                                    <td>{role.status || '-'}</td>
                                    <td>{role.posted_on || '-'}</td>
                                    <td>{role.remote || '-'}</td>
                                    <td>
                                        {role.job_desc ? (
                                            <button 
                                                type="button"
                                                className="role-link"
                                                onClick={(e) => handleCVClick(e, role.job_desc)}
                                            >
                                                View Job Description
                                            </button>
                                        ) : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddOpenRolesPage;