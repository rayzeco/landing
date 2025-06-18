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
    const [showTestModal, setShowTestModal] = useState(false);
    const [showJDModal, setShowJDModal] = useState(false);
    const [currentJD, setCurrentJD] = useState('');
    const [currentTestDoc, setCurrentTestDoc] = useState('');
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
        status: 'Open',
        posted_on: new Date().toISOString(),
        remote: 'no',
        job_desc: '',
        job_desc_link: '',
        test_doc: '',
        jd_doc: ''
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingJD, setIsGeneratingJD] = useState(false);
    const [showJDGeneratorModal, setShowJDGeneratorModal] = useState(false);
    const [jdInput, setJDInput] = useState({
        responsibilities: `• Design and develop high-performance Java-based trading platform
• Implement real-time market data processing using Kafka
• Develop REST APIs for trading operations
• Create automated test suites and CI/CD pipelines
• Monitor and optimize system performance
• Collaborate with trading team on new features
• Maintain and enhance existing trading systems`,
        candidateRequirements: `• 5+ years of Java development experience
• Strong understanding of financial markets and trading concepts
• Experience with high-performance, low-latency systems
• Bachelor's degree in Computer Science or related field
• Experience with Agile development methodologies
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities`,
        technicalSkills: `• Core Java (Java 8+)
• Spring Framework and Spring Boot
• Apache Kafka for event streaming
• RESTful API development
• SQL and NoSQL databases
• JUnit, Mockito, and TestNG
• CI/CD tools (Jenkins, GitLab CI)
• Docker and Kubernetes
• Microservices architecture
• Performance optimization techniques`,
        businessSkills: `• Understanding of financial markets and trading concepts
• Ability to work with trading teams and business stakeholders
• Experience with regulatory compliance in financial systems
• Strong documentation and technical writing skills
• Project management and time management
• Risk assessment and mitigation
• Stakeholder communication
• Problem-solving in high-pressure situations`
    });
    const [generatedJD, setGeneratedJD] = useState('');

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

            const allOpenRoles = response.data
                .filter(role => role.status === 'Open')
                .map(role => ({
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

    //https://tmqcprxidpcefgegkczt.supabase.co/storage/v1/object/public/rayze-bucket/a721be378076c162bfbf94e99c7dcd9c1b96040df5fc3677b8a5bd16cbfc39d0
    //https://tmqcprxidpcefgegkczt.supabase.co/storage/v1/object/sign/rayze-bucket/a721be378076c162bfbf94e99c7dcd9c1b96040df5fc3677b8a5bd16cbfc39d0?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNGVlOTMyYy01MzQwLTQ3ZTItYWM1Yi0zMjIzY2NkN2MxYWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyYXl6ZS1idWNrZXQvYTcyMWJlMzc4MDc2YzE2MmJmYmY5NGU5OWM3ZGNkOWMxYjk2MDQwZGY1ZmMzNjc3YjhhNWJkMTZjYmZjMzlkMCIsImlhdCI6MTc0ODc5ODU4NiwiZXhwIjoxNzgwMzM0NTg2fQ.raKycSXQJHS2eKL2SDptnIRgNREugJqgUPFmk8pSclU
    const handleGenerateEvaluation = async (jobDescLink) => {
        try {
            // First, fetch the job description content
            const response = await axios.get(jobDescLink);
            const jobDescription = response.data;
            //console.log('jd ',jobDescription);

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
            //console.log(evalResponse.data);
            if (evalResponse.data.status === 'success') {
                // Parse the evaluation JSON string into an object
                const evaluation = JSON.parse(evalResponse.data.evaluation.replace(/^```html\s*|\s*```$/g, ''));
                //console.log('Parsed evaluation:', evaluation);

                let textContent = '';

                // Format Instructions
                if (evaluation.instruction) {
                    textContent += 'INSTRUCTIONS\n' + evaluation.instruction + '\n\n';
                }

                // Format Questions
                if (evaluation.questions) {
                    textContent += 'QUESTIONS\n';
                    const questions = evaluation.questions.split('::::');
                    questions.forEach((q, index) => {
                        textContent += q.trim() + '\n';
                    });
                    textContent += '\n';
                }

                // Format Answers
                if (evaluation.answers) {
                    textContent += 'ANSWERS\n';
                    const answers = evaluation.answers.split('::::');
                    answers.forEach((a, index) => {
                        textContent += a.trim() + '\n';
                    });
                }

                // Update the state with text content
                setNewOpenRole(prev => ({
                    ...prev,
                    test_doc: textContent
                }));
            } else {
                throw new Error(evalResponse.data.message || 'Failed to generate evaluation');
            }
        } catch (error) {
            console.error('Error generating evaluation:', error);
            throw error;
        }
    };

    const sanitizeFilename = (filename) => {
        // First, replace spaces with underscores
        let sanitized = filename.replace(/\s+/g, '_');
        
        // Remove any characters that aren't URL-safe
        sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '');
        
        // Ensure the filename doesn't start or end with a dot or underscore
        sanitized = sanitized.replace(/^[._]+|[._]+$/g, '');
        
        // URL encode the result to ensure it's fully URL-safe
        return encodeURIComponent(sanitized);
    };

    const handleSubmitOpenRole = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

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
                posted_on: new Date(newOpenRole.posted_on),
                remote: newOpenRole.remote.toLowerCase(),
                job_desc_link: newOpenRole.job_desc_link || "none",
                test_doc: newOpenRole.test_doc || "none",
                jd_doc: newOpenRole.jd_doc || "none",
            };
            //console.log('Payload being sent:', payload);
            //call store bucket to store JD
            if (newOpenRole.job_desc_link) {
                const token = sessionStorage.getItem('token');
                const formData = new FormData();
                formData.append('file', newOpenRole.job_desc_link);
                const response = await axios.post(
                    `${process.env.REACT_APP_RYZ_SERVER}/store_bucket`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                //console.log(response.data);
                payload.job_desc_link = response.data.filename;
            }

            const response = await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_open_role`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            //console.log('Response:', response.data);

            setNewOpenRole({
                clientName: '',
                role_desc: '',
                location: '',
                status: 'Open',
                posted_on: new Date().toISOString(),
                remote: 'no',
                job_desc: '',
                job_desc_link: '',
                test_doc: '',
                jd_doc: ''
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
        const role = openRoles.find(r => r.id === roleId);
        if (role?.test_doc) {
            setCurrentTestDoc(role.test_doc);
            setShowTestModal(true);
        }
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
        formData.append('job_desc', file);

        try {
            const token = sessionStorage.getItem('token');
            
            // First call generate_job_description endpoint
            const jobDescResponse = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/generate_job_description`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (jobDescResponse.data.status === 'success') {
                // Store the parsed job description in both fields
                setNewOpenRole(prev => ({
                    ...prev,
                    job_desc_link: file,
                    jd_doc: jobDescResponse.data.job_desc
                }));
                const jd_str = JSON.stringify(jobDescResponse.data);
                const jobDescriptionObj = {
                    content: jd_str
                };
                // Generate the test document
                const evalResponse = await axios.post(
                    `${process.env.REACT_APP_RYZ_SERVER}/generate_candidate_evaluation`,
                    jobDescriptionObj,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                if (evalResponse.data.status === 'success') {
                    // Get the evaluation content and clean it up
                    let evaluationContent = evalResponse.data.evaluation;
                    //console.log(evaluationContent)
                    // Remove any markdown code block markers
                    //evaluationContent = evaluationContent.replace(/^```html\s*|\s*```$/g, '');
                    
                    // Try to parse as JSON if it's in JSON format
                    try {
                        // const evaluation = JSON.parse(evaluationContent);
                        // let textContent = '';

                        // // Format Instructions
                        // if (evaluation.instruction) {
                        //     textContent += 'INSTRUCTIONS\n' + evaluation.instruction + '\n\n';
                        // }

                        // // Format Questions
                        // if (evaluation.questions) {
                        //     textContent += 'QUESTIONS\n';
                        //     const questions = evaluation.questions.split('::::');
                        //     questions.forEach((q, index) => {
                        //         textContent += q.trim() + '\n';
                        //     });
                        //     textContent += '\n';
                        // }

                        // // Format Answers
                        // if (evaluation.answers) {
                        //     textContent += 'ANSWERS\n';
                        //     const answers = evaluation.answers.split('::::');
                        //     answers.forEach((a, index) => {
                        //         textContent += a.trim() + '\n';
                        //     });
                        // }

                        setNewOpenRole(prev => ({
                            ...prev,
                            test_doc: evaluationContent
                        }));
                    } catch (parseError) {
                        // If parsing as JSON fails, use the content as is
                        console.log('Using raw evaluation content:', evaluationContent);
                        setNewOpenRole(prev => ({
                            ...prev,
                            test_doc: evaluationContent
                        }));
                    }
                }
            }
        } catch (error) {
            console.error('Error processing PDF:', error);
            alert('Error processing PDF. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadEvaluation = () => {
        if (!newOpenRole.test_doc) {
            alert('No evaluation content to download');
            return;
        }

        // Create a blob with the HTML content
        const blob = new Blob([newOpenRole.test_doc], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'candidate_evaluation.html';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
    };

    const handleTestClick = (e, testDoc) => {
        e.stopPropagation();
        if (!testDoc) return;
        
        setCurrentTestDoc(testDoc);
        setShowTestModal(true);
    };

    const handleCloseModal = () => {
        setShowTestModal(false);
        setCurrentTestDoc('');
    };

    const handleCloseJDModal = () => {
        setShowJDModal(false);
        setCurrentJD('');
    };

    const handleGenerateJD = () => {
        setShowJDGeneratorModal(true);
    };

    const handleJDInputChange = (e) => {
        const { name, value } = e.target;
        setJDInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerateJDContent = async () => {
        setIsGeneratingJD(true);
        try {
            const token = sessionStorage.getItem('token');
            
            // Create a job description object
            const jobDescObj = {
                position: newOpenRole.role_desc,
                client: newOpenRole.clientName,
                location: newOpenRole.location,
                workType: newOpenRole.remote,
                responsibilities: jdInput.responsibilities,
                candidateRequirements: jdInput.candidateRequirements,
                technicalSkills: jdInput.technicalSkills,
                businessSkills: jdInput.businessSkills
            };

            // Convert to JSON string
            const jobDesc = JSON.stringify(jobDescObj);
            // console.log('Sending job description:', jobDesc);
            const formData = new FormData();
            formData.append('job_desc', jobDesc);

            const response = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/generate_job_description_from_text`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.data.status === 'success') {
                console.log(response.data);
                setGeneratedJD(response.data.text);
            } else {
                console.error('API Error Response:', response.data);
                throw new Error(response.data.message || 'Failed to generate job description');
            }
        } catch (error) {
            console.error('Error details:', error.response?.data);
            console.error('Error status:', error.response?.status);
            console.error('Error headers:', error.response?.headers);
            alert('Error generating job description. Please check the console for details.');
        } finally {
            setIsGeneratingJD(false);
        }
    };

    const handleSaveJD = () => {
        setNewOpenRole(prev => ({
            ...prev,
            job_desc_link: generatedJD,
            jd_doc: generatedJD
        }));
        setShowJDGeneratorModal(false);
        setJDInput({
            responsibilities: `• THIS IS AN EXAMPLE --> Design and develop high-performance Java-based trading platform
• Implement real-time market data processing using Kafka
• Develop REST APIs for trading operations
• Create automated test suites and CI/CD pipelines
• Monitor and optimize system performance
• Collaborate with trading team on new features
• Maintain and enhance existing trading systems`,
            candidateRequirements: `• THIS IS AN EXAMPLE --> 5+ years of Java development experience
• Strong understanding of financial markets and trading concepts
• Experience with high-performance, low-latency systems
• Bachelor's degree in Computer Science or related field
• Experience with Agile development methodologies
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities`,
            technicalSkills: `• THIS IS AN EXAMPLE --> Core Java (Java 8+)
• Spring Framework and Spring Boot
• Apache Kafka for event streaming
• RESTful API development
• SQL and NoSQL databases
• JUnit, Mockito, and TestNG
• CI/CD tools (Jenkins, GitLab CI)
• Docker and Kubernetes
• Microservices architecture
• Performance optimization techniques`,
            businessSkills: `• THIS IS AN EXAMPLE --> Understanding of financial markets and trading concepts
• Ability to work with trading teams and business stakeholders
• Experience with regulatory compliance in financial systems
• Strong documentation and technical writing skills
• Project management and time management
• Risk assessment and mitigation
• Stakeholder communication
• Problem-solving in high-pressure situations`
        });
        setGeneratedJD('');
    };

    const handleCloseJDGeneratorModal = () => {
        setShowJDGeneratorModal(false);
        setJDInput({
            responsibilities: `• THIS IS AN EXAMPLE --> Design and develop high-performance Java-based trading platform
• Implement real-time market data processing using Kafka
• Develop REST APIs for trading operations
• Create automated test suites and CI/CD pipelines
• Monitor and optimize system performance
• Collaborate with trading team on new features
• Maintain and enhance existing trading systems`,
            candidateRequirements: `• THIS IS AN EXAMPLE -->5+ years of Java development experience
• Strong understanding of financial markets and trading concepts
• Experience with high-performance, low-latency systems
• Bachelor's degree in Computer Science or related field
• Experience with Agile development methodologies
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities`,
            technicalSkills: `• THIS IS AN EXAMPLE --> Core Java (Java 8+)
• Spring Framework and Spring Boot
• Apache Kafka for event streaming
• RESTful API development
• SQL and NoSQL databases
• JUnit, Mockito, and TestNG
• CI/CD tools (Jenkins, GitLab CI)
• Docker and Kubernetes
• Microservices architecture
• Performance optimization techniques`,
            businessSkills: `• THIS IS AN EXAMPLE --> Understanding of financial markets and trading concepts
• Ability to work with trading teams and business stakeholders
• Experience with regulatory compliance in financial systems
• Strong documentation and technical writing skills
• Project management and time management
• Risk assessment and mitigation
• Stakeholder communication
• Problem-solving in high-pressure situations`
        });
        setGeneratedJD('');
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

                            <div className="form-row button-row">
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label>Actions:</label>
                                    <div className="action-buttons" style={{ 
                                        display: 'flex', 
                                        gap: '10px',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%'
                                    }}>
                                        <label htmlFor="pdf-upload" className="upload-button" style={{ flex: '1' }}>
                                            <FaFilePdf className="pdf-icon" style={{ color: '#000000' }} />
                                            <span style={{ color: 'black' }}>{isLoading ? 'Processing...' : 'AI Upload JD'}</span>
                                            {isLoading && (
                                                <div className="spinner">
                                                    <div className="spinner-inner"></div>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                id="pdf-upload"
                                                accept=".pdf"
                                                onChange={handleFileUpload}
                                                style={{ display: 'none' }}
                                                disabled={isLoading}
                                            />
                                        </label>
                                        <button 
                                            type="button" 
                                            className="download-button"
                                            onClick={handleGenerateJD}
                                            disabled={isGeneratingJD}
                                            style={{ flex: '1' }}
                                        >
                                            {isGeneratingJD ? 'Generating...' : 'AI Generate JD'}
                                            {isGeneratingJD && (
                                                <div className="spinner">
                                                    <div className="spinner-inner"></div>
                                                </div>
                                            )}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="download-button"
                                            onClick={handleDownloadEvaluation}
                                            disabled={!newOpenRole.test_doc}
                                            style={{ flex: '1' }}
                                        >
                                            AI Generated Test
                                        </button>
                                        <button 
                                            type="button" 
                                            className="submit-button"
                                            onClick={handleSubmitOpenRole}
                                            disabled={!newOpenRole.test_doc}
                                            style={{ flex: '1' }}
                                        >
                                            Add Open Role
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                                <th>Test</th>
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
                                    <td>{role.posted_on ? new Date(role.posted_on).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).replace(/,/g, '').replace(/\s+/g, '-') : '-'}</td>
                                    <td>{role.remote || '-'}</td>
                                    <td>
                                        {role.job_desc_link ? (
                                            <button 
                                                type="button"
                                                className="view-link"
                                                onClick={(e) => handleCVClick(e, role.job_desc_link)}
                                            >
                                                View JD
                                            </button>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        {role.test_doc ? (
                                            <button 
                                                type="button"
                                                className="download-test"
                                                onClick={(e) => handleTestClick(e, role.test_doc)}
                                            >
                                                View Test
                                            </button>
                                        ) : '-'}
                                    </td>
                                </tr>
                            ))}
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
                                    const content = `
                                        <!DOCTYPE html>
                                        <html>
                                            <head>
                                                <title>Test Document</title>
                                                <style>
                                                    body { 
                                                        font-family: Arial, sans-serif; 
                                                        padding: 20px;
                                                        -webkit-print-color-adjust: exact;
                                                        print-color-adjust: exact;
                                                    }
                                                    @media print {
                                                        body { 
                                                            -webkit-print-color-adjust: exact;
                                                            print-color-adjust: exact;
                                                        }
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                ${currentTestDoc}
                                            </body>
                                        </html>
                                    `;
                                    const blob = new Blob([content], { type: 'text/html' });
                                    const url = URL.createObjectURL(blob);
                                    const printWindow = window.open(url, '_blank');
                                    printWindow.onload = () => {
                                        printWindow.document.close();
                                        printWindow.focus();
                                        const mediaQueryList = printWindow.matchMedia('print');
                                        mediaQueryList.addListener(function(mql) {
                                            if (!mql.matches) {
                                                URL.revokeObjectURL(url);
                                                printWindow.close();
                                            }
                                        });
                                        printWindow.print();
                                    };
                                }}
                            >
                                Save as PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Job Description Modal */}
            {showJDModal && (
                <div className="modal-overlay" onClick={handleCloseJDModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Job Description</h2>
                            <button className="close-button" onClick={handleCloseJDModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <iframe 
                                src={currentJD} 
                                style={{ 
                                    width: '100%', 
                                    height: '80vh', 
                                    border: 'none',
                                    backgroundColor: '#ffffff'
                                }}
                                title="Job Description"
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={handleCloseJDModal}>Close</button>
                            <button 
                                className="modal-button primary"
                                onClick={() => window.open(currentJD, '_blank')}
                            >
                                Open in New Tab
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* JD Generator Modal */}
            {showJDGeneratorModal && (
                <div className="modal-overlay" onClick={handleCloseJDGeneratorModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Generate Job Description</h2>
                            <button className="close-button" onClick={handleCloseJDGeneratorModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="jd-input-section">
                                <h3>Input Details</h3>
                                <div className="input-group">
                                    <label>Responsibilities:</label>
                                    <textarea
                                        name="responsibilities"
                                        value={jdInput.responsibilities}
                                        onChange={handleJDInputChange}
                                        rows={4}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Candidate Requirements:</label>
                                    <textarea
                                        name="candidateRequirements"
                                        value={jdInput.candidateRequirements}
                                        onChange={handleJDInputChange}
                                        rows={4}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Technical Skills:</label>
                                    <textarea
                                        name="technicalSkills"
                                        value={jdInput.technicalSkills}
                                        onChange={handleJDInputChange}
                                        rows={4}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Business Skills:</label>
                                    <textarea
                                        name="businessSkills"
                                        value={jdInput.businessSkills}
                                        onChange={handleJDInputChange}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="jd-output-section">
                                <h3>Generated Job Description</h3>
                                <textarea
                                    value={generatedJD}
                                    onChange={(e) => setGeneratedJD(e.target.value)}
                                    placeholder="Generated job description will appear here..."
                                    rows={12}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={handleCloseJDGeneratorModal}>
                                Cancel
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={handleGenerateJDContent}
                                disabled={isGeneratingJD}
                            >
                                {isGeneratingJD ? 'Generating...' : 'Generate'}
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={handleSaveJD}
                                disabled={!generatedJD}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddOpenRolesPage;