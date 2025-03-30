import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './submit-candidate-page.scss';

const SubmitCandidatePage = () => {
    const [clients, setClients] = useState([]);
    const [openRoles, setOpenRoles] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    
    const [selectedValues, setSelectedValues] = useState({
        clientName: '',
        openRole: '',
        candidate: '',
        workType: ''
    });

    // Store the full objects for ID lookup
    const [clientMap, setClientMap] = useState({});
    const [roleMap, setRoleMap] = useState({});
    const [candidateMap, setCandidateMap] = useState({});

    const workTypeOptions = ['Remote', 'Hybrid', 'Office'];

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
                
                // Create map of client names to full client objects
                const clientMapping = {};
                clientList.forEach(client => {
                    clientMapping[client.name] = client;
                });
                setClientMap(clientMapping);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        const fetchCandidates = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_RYZ_SERVER}/list_candidates`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const openCandidates = response.data.filter(candidate => candidate.status === 'Open');
                setCandidates(openCandidates);

                // Create map of candidate names to full candidate objects
                const candidateMapping = {};
                openCandidates.forEach(candidate => {
                    candidateMapping[candidate.name] = candidate;
                });
                setCandidateMap(candidateMapping);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchClients();
        fetchCandidates();
    }, []);

    useEffect(() => {
        const fetchOpenRoles = async () => {
            if (!selectedValues.clientName) {
                setOpenRoles([]);
                return;
            }

            const token = sessionStorage.getItem('token');
            const clientId = clientMap[selectedValues.clientName]?.id;
            console.log("client id is ",clientId);

            if (!clientId) return;

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_RYZ_SERVER}/find_open_roles/${clientId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                //console.log(response.data);
                setOpenRoles(response.data);

                // Create map of role titles to full role objects
                const roleMapping = {};
                response.data.forEach(role => {
                    roleMapping[role.role_desc] = role;
                });
                setRoleMap(roleMapping);
            } catch (error) {
                console.error('Error fetching open roles:', error);
            }
        };

        fetchOpenRoles();
    }, [selectedValues.clientName]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        
        // Reset dependent fields when client changes
        console.log(name, value);
        if (name === 'clientName') {
            setSelectedValues(prev => ({
                ...prev,
                clientName: value,
                openRole: ''
            }));
        } 
        else if (name === 'openRole') {
            setSelectedValues(prev => ({
                ...prev,
                openRole: value
            }));
        }
        else {
            setSelectedValues(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        // Get IDs from the maps
        const clientId = clientMap[selectedValues.clientName]?.id;
        const roleId = roleMap[selectedValues.openRole]?.id;
        const candidateId = candidateMap[selectedValues.candidate]?.id;
        const cvLink = candidateMap[selectedValues.candidate]?.cv_link;

        if (!clientId || !roleId || !candidateId) {
            alert('Please select all required fields');
            return;
        }

        try {
            const submitData = {
                client_id: clientId,
                open_roles_id: roleId,
                candidates_id: candidateId,
                remote: selectedValues.workType,
                status: 'Open',
                submitted_on: new Date().toISOString(),
                cv_link: cvLink,
            };


            console.log('Submitting data:', JSON.stringify(submitData, null, 2));

            const response = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/new_submit_cvrole`,
                submitData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Reset form and show success message
            setSelectedValues({
                clientName: '',
                openRole: '',
                candidate: '',
                workType: ''
            });

            alert('Candidate successfully submitted for the role!');
        } catch (error) {
            console.error('Error submitting candidate:', error.response?.data || error);
            alert(`Error submitting candidate: ${error.response?.data?.detail || 'Please try again.'}`);
        }
    };

    return (
        <div className="submit-candidate-container">
            <div className="panel">
                <h1>Submit Candidate</h1>

                {/* Submit Candidate Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowSubmitForm(!showSubmitForm)}
                    >
                        <h2>Submit Candidate</h2>
                        <span className={`arrow ${showSubmitForm ? 'open' : ''}`}>▼</span>
                    </div>
                    {showSubmitForm && (
                        <form onSubmit={handleSubmit} className="submit-candidate-form">
                            <div className="form-group">
                                <label htmlFor="clientName">Client Name:</label>
                                <select
                                    id="clientName"
                                    name="clientName"
                                    value={selectedValues.clientName}
                                    onChange={handleSelectChange}
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
                                <label htmlFor="openRole">Open Role:</label>
                                <select
                                    id="openRole"
                                    name="openRole"
                                    value={selectedValues.openRole}
                                    onChange={handleSelectChange}
                                    required
                                    disabled={!selectedValues.clientName}
                                >
                                    <option value="">Select Role...</option>
                                    {openRoles.map(role => (
                                        <option key={role.id} value={role.role_desc}>
                                            {role.role_desc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="candidate">Candidate:</label>
                                <select
                                    id="candidate"
                                    name="candidate"
                                    value={selectedValues.candidate}
                                    onChange={handleSelectChange}
                                    required
                                >
                                    <option value="">Select Candidate...</option>
                                    {candidates.map(candidate => (
                                        <option key={candidate.id} value={candidate.name}>
                                            {candidate.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="workType">Work Type:</label>
                                <select
                                    id="workType"
                                    name="workType"
                                    value={selectedValues.workType}
                                    onChange={handleSelectChange}
                                    required
                                >
                                    <option value="">Select Work Type...</option>
                                    {workTypeOptions.map(type => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="submit-button">
                                Submit Candidate
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitCandidatePage;