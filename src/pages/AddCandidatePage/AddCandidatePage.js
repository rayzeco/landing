import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './add-candidate-page.scss';

const AddCandidatePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [unfilteredCandidates, setUnfilteredCandidates] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUploadAnswers, setShowUploadAnswers] = useState(false);
    const [selectedAnswerCandidate, setSelectedAnswerCandidate] = useState('');
    const [candidateAnswers, setCandidateAnswers] = useState('');
    const [showMatchScoreModal, setShowMatchScoreModal] = useState(false);
    const [matchScoreResult, setMatchScoreResult] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [clients, setClients] = useState([]);
    const [openRoles, setOpenRoles] = useState([]);
    const [filteredOpenRoles, setFilteredOpenRoles] = useState([]);
    const [submitCVRoles, setSubmitCVRoles] = useState([]);
    const [isOpenRolesEnabled, setIsOpenRolesEnabled] = useState(false);
    const [showOnlyMatched, setShowOnlyMatched] = useState(true);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showTestAnswersModal, setShowTestAnswersModal] = useState(false);
    const [showSaveAnswersConfirmModal, setShowSaveAnswersConfirmModal] = useState(false);
    const [currentTestDoc, setCurrentTestDoc] = useState('');
    const [currentTestAnswers, setCurrentTestAnswers] = useState('');
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
        status: ''
    });
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [submissionNotes, setSubmissionNotes] = useState('');
    const [isSavingAnswers, setIsSavingAnswers] = useState(false);
    const [showTestScoreModal, setShowTestScoreModal] = useState(false);
    const [currentTestScore, setCurrentTestScore] = useState('');
    const [showHireModal, setShowHireModal] = useState(false);
    const [hireForm, setHireForm] = useState({
        start_date: '',
        end_date: '',
        client_price: '',
        recruiter_price: ''
    });
    const [isFormEnabled, setIsFormEnabled] = useState(false);
    const [isCVProcessing, setIsCVProcessing] = useState(false);
    const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
    const [workOrderHtml, setWorkOrderHtml] = useState('');
    const [isHiring, setIsHiring] = useState(false);
    const [candidateSearch, setCandidateSearch] = useState('');
    const [showCandidateSuggestions, setShowCandidateSuggestions] = useState(false);
    const [filteredCandidatesForSearch, setFilteredCandidatesForSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            const user = JSON.parse(sessionStorage.getItem('user'));
            const id = JSON.parse(sessionStorage.getItem('id'));
            //console.log('id is ',id);
            
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
                setUnfilteredCandidates(allCandidates);
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
        
        // Special handling for client_id to filter open roles
        if (name === 'client_id') {
            const selectedClient = clients.find(client => client.id === parseInt(value));

            if (selectedClient) {
                const filteredRoles = openRoles.filter(role => role.client_id === selectedClient.id);
                setFilteredOpenRoles(filteredRoles);
                setIsOpenRolesEnabled(true);
                
                // Update the newCandidate state with the new client_id
                setNewCandidate(prev => ({
                    ...prev,
                    client_id: value,
                    // Reset open_role_id if it's not valid for the new client
                    open_role_id: filteredRoles.some(role => role.id === prev.open_role_id) ? prev.open_role_id : ''
                }));
            } else {
                setIsOpenRolesEnabled(false);
                setFilteredOpenRoles([]);
                setNewCandidate(prev => ({
                    ...prev,
                    client_id: value,
                    open_role_id: ''
                }));
            }
            return;
        }

        // Handle all other field updates
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
            // open_role_id: 'Open Role'
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([field]) => !newCandidate[field])
            .map(([_, label]) => label);

        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields:\n${missingFields.join('\n')}`);
            return;
        }
        // Then create the submit_cvrole entry
        const candidateData = {
            name: newCandidate.name,
            role: newCandidate.role,
            location: newCandidate.location,
            candidate_cost: newCandidate.candidate_cost,
            phone: newCandidate.phone,
            email: newCandidate.email,
            feedback: newCandidate.feedback,
            cv_link: newCandidate.cv_link,
            client_id: newCandidate.client_id,
            status: 'Submitted'
        };
        //console.log(candidateData);
        // Store the CV in the bucket

        if (newCandidate.cv_link) {
            const formData = new FormData();
            formData.append('file', newCandidate.cv_link);
            
            const token = sessionStorage.getItem('token');
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
            candidateData.cv_link = response.data.filename;
        }

        try {
            // First create the candidate
            const candidateResponse = await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_candidate`, candidateData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            //console.log('now store bucket');
            
            // Then create the submit_cvrole entry
            const submitCVRoleData = {
                client_id: newCandidate.client_id,
                open_roles_id: newCandidate.open_role_id,
                candidates_id: candidateResponse.data.id,
                status: 'Submitted',
                submitted_on: new Date().toISOString(),
                remote: 'no',
                cv_link: candidateData.cv_link,
                match_score: newCandidate.match_score || null
            };
            //console.log("match_score", newCandidate.match_score, " : ", newCandidate.id);

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
                status: '',
            });
            // Reset match score
            setMatchScoreResult('');

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
                //console.log('candidates are ', response.data);
            };
            fetchCandidates();
            
            alert('Candidate created and submitted successfully!');
            window.location.reload(); // Refresh the page after successful creation
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

    const handleTestAnswersClick = (e, candidateId) => {
        e.stopPropagation();
        
        // Find the submission for this candidate
        const submission = getCVRoleSubmission(candidateId);
        if (!submission || !submission.test_answers) return;
        
        // Set the test answers content and show the modal
        setCurrentTestAnswers(submission.test_answers);
        setShowTestAnswersModal(true);
    };

    const handleCloseTestAnswersModal = () => {
        setShowTestAnswersModal(false);
        setCurrentTestAnswers('');
    };

    const handleMatchScoreClick = () => {
        setShowMatchScoreModal(true);
        setCvFile(null);
        setMatchScoreResult('');
    };

    const handleNewCV = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setCvFile(file);
        setIsCVProcessing(true);
        console.log(JSON.parse(sessionStorage.getItem('user'))?.role);
        
        try {
            const formData = new FormData();
            formData.append('cv', file);
            
            const token = sessionStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/generate_candidate`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Parse the candidate_info string into a JSON object
            const candidateInfo = JSON.parse(response.data.candidate_info);

            // Update the newCandidate state with the parsed information
            setNewCandidate(prev => ({
                ...prev,
                name: candidateInfo.name || '',
                phone: candidateInfo.phone || '',
                email: candidateInfo.email || '',
                role: candidateInfo.role || '',
                location: candidateInfo.location || '',
                cv_link: file,
                feedback: candidateInfo.cv_summary || '',


                // Keep existing values for fields not provided by the API
                candidate_cost: prev.candidate_cost,
                client_id: prev.client_id,
                status: ''
               // open_role_id: prev.open_role_id
            }));

            // Enable the form after successful CV upload
            setIsFormEnabled(true);

            // If there's a selected role, proceed with match score generation
            const selectedRole = openRoles.find(role => role.id === parseInt(newCandidate.open_role_id));
            if (selectedRole && selectedRole.jd_doc) {
                // Create a new FormData for match score
                const matchScoreFormData = new FormData();
                matchScoreFormData.append('cv', file);
                matchScoreFormData.append('job_desc', selectedRole.jd_doc);
                
                const matchScoreResponse = await axios.post(
                    `${process.env.REACT_APP_RYZ_SERVER}/generate_candidate_match`,
                    matchScoreFormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const matchScore = matchScoreResponse.data.evaluation;
                setMatchScoreResult(matchScore);
                setNewCandidate(prev => ({
                    ...prev,
                    match_score: matchScore
                }));
                
                // Show the match score modal
                setShowMatchScoreModal(true);
            }

        } catch (error) {
            console.error('Error processing CV:', error);
            alert('Error processing CV. Please try again.');
            setIsFormEnabled(false);
        } finally {
            setIsCVProcessing(false);
        }
    };

    const handleCvUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setCvFile(file);
        const selectedRole = openRoles.find(role => role.id === parseInt(newCandidate.open_role_id));
        
        try {
            const formData = new FormData();
            formData.append('cv', file);
            
            // If there's a selected role with JD, include it
            if (selectedRole && selectedRole.jd_doc) {
                formData.append('job_desc', selectedRole.jd_doc);
                
                const token = sessionStorage.getItem('token');
                const response = await axios.post(
                    `${process.env.REACT_APP_RYZ_SERVER}/generate_candidate_match`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const matchScore = response.data.evaluation;
                setMatchScoreResult(matchScore);
                setNewCandidate(prev => ({
                    ...prev,
                    match_score: matchScore
                }));
            }

            // Enable the form after successful CV upload
            setIsFormEnabled(true);

        } catch (error) {
            console.error('Error processing CV:', error);
            alert('Error processing CV. Please try again.');
            setIsFormEnabled(false);
        }
    };

    const handleCloseMatchScoreModal = () => {
        setShowMatchScoreModal(false);
        setCvFile(null);
        setMatchScoreResult('');
    };

    // Helper function to get CV role submission for a candidate
    const getCVRoleSubmission = (candidateId) => {
        if (!candidateId) return null;
        const numericCandidateId = parseInt(candidateId, 10);
        //console.log('candidateId is ', candidateId, 'numericCandidateId is ', numericCandidateId, 'submitCVRoles is ', submitCVRoles);
        return submitCVRoles.find(submission => parseInt(submission.candidates_id, 10) === numericCandidateId);
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

    const handleCandidateSearch = (e) => {
        const searchTerm = e.target.value;
        setCandidateSearch(searchTerm);
        
        if (searchTerm.length > 0) {
            const filtered = unfilteredCandidates.filter(candidate => 
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCandidatesForSearch(filtered);
            setShowCandidateSuggestions(true);
        } else {
            setFilteredCandidatesForSearch([]);
            setShowCandidateSuggestions(false);
        }
    };

    const handleCandidateSearchSelect = (candidate) => {
        setSelectedAnswerCandidate(candidate.id);
        setCandidateSearch(candidate.name);
        setShowCandidateSuggestions(false);
    };

    const handleAnswersFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.txt')) {
            alert('Please upload a text file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setCandidateAnswers(e.target.result);
        };
        reader.readAsText(file);
    };

    const handleSaveAnswers = async () => {
        setShowSaveAnswersConfirmModal(true);


    };

    const handleConfirmSaveAnswers = async () => {
        setIsSavingAnswers(true);
        const token = sessionStorage.getItem('token');
        const submission = getCVRoleSubmission(selectedAnswerCandidate);

        if (!submission) {
            alert('No submission found for this candidate. Please ensure the candidate is submitted for an open role first.');
            setIsSavingAnswers(false);
            return;
        }

        try {
            // Get the open role's test document
            const openRole = openRoles.find(role => role.id === submission.open_roles_id);
            if (!openRole || !openRole.test_doc) {
                alert('No test document found for this role.');
                setIsSavingAnswers(false);
                return;
            }

            // Generate score using the test document and candidate answers
            const scoreResponse = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/generate_score`,
                {
                    test_doc: openRole.test_doc,
                    test_answers: candidateAnswers
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!scoreResponse.data || !scoreResponse.data.evaluation) {
                throw new Error('Invalid response from score generation');
            }

            // Update the submit_cv_role entry with the test answers and generated score
            const updatePayload = {
                client_id: submission.client_id,
                open_roles_id: submission.open_roles_id,
                candidates_id: parseInt(selectedAnswerCandidate, 10),
                status: submission.status,
                submitted_on: submission.submitted_on,
                remote: submission.remote,
                cv_link: submission.cv_link,
                test_answers: candidateAnswers,
                test_score: scoreResponse.data.evaluation
            };

            await axios.put(
                `${process.env.REACT_APP_RYZ_SERVER}/update_submit_cvrole/${submission.id}`,
                updatePayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Refresh the submit CV roles data
            const submitCVRolesResponse = await axios.get(
                `${process.env.REACT_APP_RYZ_SERVER}/list_submit_cvroles`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSubmitCVRoles(submitCVRolesResponse.data);

            // Reset the form
            setSelectedAnswerCandidate('');
            setCandidateAnswers('');
            setShowSaveAnswersConfirmModal(false);
            setIsSavingAnswers(false);
            alert('Test answers saved successfully!');
        } catch (error) {
            console.error('Error saving test answers:', error);
            let errorMessage = 'Error saving test answers. Please try again.';
            if (error.response) {
                errorMessage = `Error: ${error.response.data.message || error.response.statusText}`;
            }
            alert(errorMessage);
            setIsSavingAnswers(false);
        }
    };

    const handleTestScoreClick = (e, testScore) => {
        e.stopPropagation();
        setCurrentTestScore(testScore);
        setShowTestScoreModal(true);
    };

    const handleCloseTestScoreModal = () => {
        setShowTestScoreModal(false);
        setCurrentTestScore('');
    };

    const handleHireClick = async () => {
        // Find the candidate
        const candidate = unfilteredCandidates.find(c => c.id === parseInt(selectedAnswerCandidate));
        
        if (!candidate) {
            alert('Candidate not found');
            return;
        }

        if (candidate.status === 'Hired') {
            alert('This candidate is already hired');
            return;
        }

        setShowHireModal(true);
    };

    const calculateEndDate = (startDate) => {
        if (!startDate) return '';
        
        // Create date 6 months from start date
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + 6);
        
        // Adjust to nearest business day (Monday-Friday)
        const day = date.getDay();
        if (day === 0) { // Sunday
            date.setDate(date.getDate() + 1);
        } else if (day === 6) { // Saturday
            date.setDate(date.getDate() + 2);
        }
        
        return date.toISOString().split('T')[0];
    };

    const handleHireFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'start_date') {
            const endDate = calculateEndDate(value);
            setHireForm(prev => ({
                ...prev,
                start_date: value,
                end_date: endDate
            }));
        } else {
            setHireForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleHireConfirm = async () => {
        const token = sessionStorage.getItem('token');
        setIsHiring(true);

        try {
            // First get the candidate to ensure we have all necessary data
            const candidate = unfilteredCandidates.find(c => c.id === parseInt(selectedAnswerCandidate));
            if (!candidate) {
                alert('Candidate not found');
                setIsHiring(false);
                return;
            }

            // Get the submission for this candidate
            const submission = submitCVRoles.find(sub => sub.candidates_id === parseInt(selectedAnswerCandidate));
            if (!submission) {
                alert('No submission found for this candidate');
                setIsHiring(false);
                return;
            }

            // Create new transaction with exact required fields from TransactionCreate
            const transactionData = {
                txn_date: new Date().toISOString(),  // Required field
                candidate_id: parseInt(selectedAnswerCandidate),
                client_id: parseInt(submission.client_id),
                client_price: parseFloat(hireForm.client_price),
                start_date: new Date(hireForm.start_date).toISOString(),  // Convert to ISO string
                end_date: new Date(hireForm.end_date).toISOString(),     // Convert to ISO string
                // Optional fields
                recruiter_id: 2,
                referral_id: 4,
                recruiter_price: parseFloat(hireForm.recruiter_price),
                referral_price: 2.5,
                num_payments_received: 0,
                total_client_recv: 0,
                total_recruiter_paid: 0,
                total_referral_paid: 0
            };

            await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/new_transaction`,
                transactionData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Update candidate status
            await axios.put(
                `${process.env.REACT_APP_RYZ_SERVER}/update_candidate/${selectedAnswerCandidate}`,
                { status: 'Hired' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Generate work order
            const workOrderResponse = await axios.post(
                `${process.env.REACT_APP_RYZ_SERVER}/generate_client_work_order`,
                transactionData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }
            );

            if (workOrderResponse.data && workOrderResponse.data.html) {
                setWorkOrderHtml(workOrderResponse.data.html);
                setShowWorkOrderModal(true);
            } else {
                throw new Error('Invalid response format from server');
            }

            // Reset and close hire modal
            setHireForm({
                start_date: '',
                end_date: '',
                client_price: '',
                recruiter_price: ''
            });
            setShowHireModal(false);

            // Refresh candidates list
            const candidatesResponse = await axios.get(
                `${process.env.REACT_APP_RYZ_SERVER}/list_candidates`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setCandidates(candidatesResponse.data);
            setFilteredCandidates(candidatesResponse.data);

            alert('Candidate hired successfully!');
        } catch (error) {
            console.error('Error hiring candidate:', error);
            if (error.response && error.response.data) {
                console.log('Validation error:', error.response.data);
                alert(`Error hiring candidate: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Error hiring candidate. Please try again.');
            }
        } finally {
            setIsHiring(false);
        }
    };

    const renderUploadAnswersSection = () => (
        <div className="add-candidate-form">
            <div className="form-row" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', position: 'relative' }}>
                <div className="form-group" style={{ flex: 1, position: 'relative', marginBottom: '200px' }}>
                    <label htmlFor="answer_candidate">Candidate</label>
                    <input
                        type="text"
                        id="answer_candidate"
                        placeholder="Search candidate by name, role, or location..."
                        value={candidateSearch}
                        onChange={handleCandidateSearch}
                        style={{ 
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                    {showCandidateSuggestions && filteredCandidatesForSearch.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            maxHeight: '180px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {filteredCandidatesForSearch.map(candidate => (
                                <div
                                    key={candidate.id}
                                    onClick={() => handleCandidateSearchSelect(candidate)}
                                    style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: '#fff',
                                        transition: 'background-color 0.2s',
                                        ':hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                >
                                    <div style={{ fontWeight: 'bold' }}>{candidate.name}</div>
                                    <div style={{ fontSize: '0.9em', color: '#666' }}>
                                        {candidate.role} - {candidate.location}
                                    </div>
                                </div>
                            ))}
                </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button 
                    type="button"
                    className="submit-button"
                    onClick={handleHireClick}
                    disabled={!selectedAnswerCandidate || JSON.parse(sessionStorage.getItem('user'))?.role !== 'ADMIN'}
                    style={{ 
                        backgroundColor: '#00A389',
                        margin: 0,
                        width: 'fit-content',
                        whiteSpace: 'nowrap',
                        padding: '8px 16px',
                        cursor: selectedAnswerCandidate && JSON.parse(sessionStorage.getItem('user'))?.role === 'ADMIN' ? 'pointer' : 'not-allowed',
                        opacity: selectedAnswerCandidate && JSON.parse(sessionStorage.getItem('user'))?.role === 'ADMIN' ? 1 : 0.5
                    }}
                >
                    Hire Candidate
                </button>
                <button 
                    type="button" 
                    className="submit-button"
                    onClick={handleSaveAnswers}
                    disabled={!selectedAnswerCandidate}
                    style={{
                        margin: 0,
                        width: 'fit-content',
                        whiteSpace: 'nowrap',
                        padding: '8px 16px',
                        opacity: selectedAnswerCandidate ? 1 : 0.5,
                        cursor: selectedAnswerCandidate ? 'pointer' : 'not-allowed'
                    }}
                >
                    Submit Answers
                </button>
                </div>
            </div>
            {candidateAnswers && (
                <div className="file-preview" style={{ marginTop: '5px', fontSize: '0.9em', color: '#666' }}>
                    ( {candidateAnswers.length} characters)
                </div>
            )}
        </div>
    );

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
                            {/* First Row: Client, Open Role, Candidate Cost, CV Upload, Add Candidate */}
                            <div className="form-row" style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                                <div className="form-group" style={{ flex: 0.5 }}>
                                    <label htmlFor="client_id">Client</label>
                                    <select
                                        id="client_id"
                                        name="client_id"
                                        value={newCandidate.client_id}
                                        onChange={handleNewCandidateChange}
                                        required
                                        style={{ width: '100%' }}
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ flex: 0.5 }}>
                                    <label htmlFor="open_role_id">Open Role</label>
                                    <select
                                        id="open_role_id"
                                        name="open_role_id"
                                        value={newCandidate.open_role_id}
                                        onChange={handleNewCandidateChange}
                                        required
                                        disabled={!isOpenRolesEnabled}
                                        style={{ width: '100%' }}
                                    >
                                        <option value="">Select an open role</option>
                                        {filteredOpenRoles.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.role_desc}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ flex: 0.3 }}>
                                    <label htmlFor="candidate_cost">Candidate Cost</label>
                                    <input
                                        type="number"
                                        id="candidate_cost"
                                        name="candidate_cost"
                                        placeholder="Enter cost"
                                        value={newCandidate.candidate_cost}
                                        onChange={handleNewCandidateChange}
                                        required
                                        disabled={!isFormEnabled}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                                    <button 
                                        type="button"
                                        className="submit-button"
                                        onClick={() => document.getElementById('cv-upload').click()}
                                        style={{
                                            backgroundColor: '#00A389',
                                            margin: 0,
                                            flex: 1,
                                            whiteSpace: 'nowrap',
                                            padding: '8px 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            minWidth: '120px'
                                        }}
                                    >
                                        {isCVProcessing ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <img 
                                                    src="/rayze-icon.png" 
                                                    alt="Loading" 
                                                    style={{ 
                                                        width: '20px', 
                                                        height: '20px', 
                                                        animation: 'spin 1s linear infinite' 
                                                    }} 
                                                />
                                                <span>Processing CV...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Upload CV {isFormEnabled && <span style={{ marginLeft: '5px' }}>✓</span>}
                                            </>
                                        )}
                                    </button>
                                    <input
                                        type="file"
                                        id="cv-upload"
                                        accept=".pdf,.doc,.docx"
                                        style={{ display: 'none' }}
                                        onChange={handleNewCV}
                                    />
                                    <button 
                                        type="submit" 
                                        className="submit-button"
                                        disabled={!isFormEnabled}
                                        style={{
                                            opacity: isFormEnabled ? 1 : 0.5,
                                            cursor: isFormEnabled ? 'pointer' : 'not-allowed',
                                            margin: 0,
                                            flex: 1,
                                            whiteSpace: 'nowrap',
                                            padding: '8px 16px',
                                            minWidth: '120px'
                                        }}
                                    >
                                        Add Candidate
                                    </button>
                                </div>
                            </div>

                            {/* Add horizontal line for separation */}
                            <hr style={{ 
                                margin: '0 0 20px 0',
                                border: 'none',
                                borderBottom: '1px solid #e0e0e0'
                            }} />

                            {/* Second Row: Name, Current Role, Location */}
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
                                        disabled={!isFormEnabled}
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
                                        disabled={!isFormEnabled}
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
                                        disabled={!isFormEnabled}
                                    />
                                </div>
                            </div>

                            {/* Third Row: Phone, Email */}
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
                                        disabled={!isFormEnabled}
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
                                        disabled={!isFormEnabled}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Upload Candidate Test Answers Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowUploadAnswers(!showUploadAnswers)}
                    >
                        <h2>Candidate Actions</h2>
                        <span className={`arrow ${showUploadAnswers ? 'open' : ''}`}>▼</span>
                    </div>
                    {showUploadAnswers && renderUploadAnswersSection()}
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
                                <th colSpan="7" className="section-header">Open Role</th>
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
                                <th>Test Answers</th>
                                <th>Test Score</th>
                                <th>Match Score</th>
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
                                            {jdLink && jdLink.trim() ? (
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
                                            {submission && openRoles.find(role => role.id === submission.open_roles_id)?.test_doc ? (
                                                <button 
                                                    type="button"
                                                    className="download-test"
                                                    onClick={(e) => handleDownloadTest(e, candidate.id)}
                                                >
                                                    Download Test
                                                </button>
                                            ) : '-'}
                                        </td>
                                        <td>
                                            {submission && submission.test_answers ? (
                                                <button 
                                                    type="button"
                                                    className="view-test-answers"
                                                    onClick={(e) => handleTestAnswersClick(e, candidate.id)}
                                                >
                                                    View Answers
                                                </button>
                                            ) : '-'}
                                        </td>
                                        <td>
                                            {submission?.test_score ? (
                                                <button 
                                                    type="button"
                                                    className="view-test-score"
                                                    onClick={(e) => handleTestScoreClick(e, submission.test_score)}
                                                >
                                                    View Score
                                                </button>
                                            ) : '-'}
                                        </td>
                                        <td>{submission?.match_score ? (
                                            <button 
                                                type="button"
                                                className="view-match-score"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMatchScoreResult(submission.match_score);
                                                    setShowMatchScoreModal(true);
                                                }}
                                            >
                                                View Score
                                            </button>
                                        ) : '-'}</td>
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

            {/* Save Answers Confirmation Modal */}
            {showSaveAnswersConfirmModal && (
                <div className="modal-overlay" onClick={() => !isSavingAnswers && setShowSaveAnswersConfirmModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Submit Test Answers</h2>
                            <button className="close-button" onClick={() => !isSavingAnswers && setShowSaveAnswersConfirmModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div style={{ 
                                height: '300px', 
                                overflowY: 'auto', 
                                border: '1px solid #ccc',
                                padding: '10px',
                                marginBottom: '20px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                {candidateAnswers ? (
                                    <pre style={{ 
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                        margin: 0,
                                        fontFamily: 'monospace'
                                    }}>
                                        {candidateAnswers}
                                    </pre>
                                ) : (
                                    <div style={{ 
                                        color: '#666',
                                        textAlign: 'center',
                                        padding: '20px'
                                    }}>
                                        No answers uploaded yet
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer" style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <button 
                                className="modal-button" 
                                onClick={() => setShowSaveAnswersConfirmModal(false)}
                                disabled={isSavingAnswers}
                            >
                                Cancel
                            </button>
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <button 
                                    type="button"
                                    className="submit-button"
                                    onClick={() => document.getElementById('answers-upload').click()}
                                    disabled={isSavingAnswers}
                                    style={{ 
                                        backgroundColor: '#00A389',
                                        margin: 0,
                                        width: 'fit-content',
                                        whiteSpace: 'nowrap',
                                        padding: '8px 16px',
                                        cursor: isSavingAnswers ? 'not-allowed' : 'pointer',
                                        opacity: isSavingAnswers ? 0.5 : 1
                                    }}
                                >
                                    Upload Answers
                                </button>
                                <input
                                    type="file"
                                    id="answers-upload"
                                    accept=".txt"
                                    onChange={handleAnswersFileUpload}
                                    style={{ display: 'none' }}
                                    disabled={isSavingAnswers}
                                />
                                {candidateAnswers && (
                                    <div className="file-preview" style={{ fontSize: '0.9em', color: '#666' }}>
                                        {candidateAnswers.length} characters
                                    </div>
                                )}
                            </div>
                            <button 
                                className="modal-button primary" 
                                onClick={handleConfirmSaveAnswers}
                                disabled={isSavingAnswers || !candidateAnswers}
                            >
                                {isSavingAnswers ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <img 
                                            src="/rayze-icon.png" 
                                            alt="Loading" 
                                            style={{ 
                                                width: '20px', 
                                                height: '20px', 
                                                animation: 'spin 1s linear infinite' 
                                            }} 
                                        />
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Test Answers Modal */}
            {showTestAnswersModal && (
                <div className="modal-overlay" onClick={handleCloseTestAnswersModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Test Answers</h2>
                            <button className="close-button" onClick={handleCloseTestAnswersModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{ __html: currentTestAnswers }} />
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={handleCloseTestAnswersModal}>Close</button>
                            <button 
                                className="modal-button primary"
                                onClick={() => {
                                    const content = `
                                        <!DOCTYPE html>
                                        <html>
                                            <head>
                                                <title>Test Answers</title>
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
                                                ${currentTestAnswers}
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

            {/* Match Score Modal */}
            {showMatchScoreModal && (
                <div className="modal-overlay" onClick={handleCloseMatchScoreModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Candidate Match Score</h2>
                            <button className="close-button" onClick={handleCloseMatchScoreModal}>×</button>
                        </div>
                        <div className="modal-body">
                            {!matchScoreResult ? (
                                <div className="upload-section">
                                    <p>Please upload the candidate's CV to generate a match score.</p>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleNewCV}
                                        style={{ marginTop: '10px' }}
                                    />
                                    {cvFile && <p>Processing... Please wait.</p>}
                                </div>
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: matchScoreResult }} />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={handleCloseMatchScoreModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Test Score Modal */}
            {showTestScoreModal && (
                <div className="modal-overlay" onClick={handleCloseTestScoreModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Test Score</h2>
                            <button className="close-button" onClick={handleCloseTestScoreModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{ __html: currentTestScore }} />
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={handleCloseTestScoreModal}>Close</button>
                            <button 
                                className="modal-button primary"
                                onClick={() => {
                                    const content = `
                                        <!DOCTYPE html>
                                        <html>
                                            <head>
                                                <title>Test Score</title>
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
                                                ${currentTestScore}
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

            {/* Hire Candidate Modal */}
            {showHireModal && (
                <div className="modal-overlay" onClick={() => !isHiring && setShowHireModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Hire Candidate</h2>
                            <button className="close-button" onClick={() => !isHiring && setShowHireModal(false)} disabled={isHiring}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* First Row: Dates */}
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="start_date">Start Date</label>
                                        <input
                                            type="date"
                                            id="start_date"
                                            name="start_date"
                                            value={hireForm.start_date}
                                            onChange={handleHireFormChange}
                                            required
                                            disabled={isHiring}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="end_date">End Date (6 months)</label>
                                        <input
                                            type="date"
                                            id="end_date"
                                            name="end_date"
                                            value={hireForm.end_date}
                                            onChange={handleHireFormChange}
                                            required
                                            disabled={isHiring}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                </div>
                                {/* Second Row: Prices */}
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="client_price">Client Price</label>
                                        <input
                                            type="number"
                                            id="client_price"
                                            name="client_price"
                                            value={hireForm.client_price}
                                            onChange={handleHireFormChange}
                                            required
                                            disabled={isHiring}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="recruiter_price">Recruiter Price</label>
                                        <input
                                            type="number"
                                            id="recruiter_price"
                                            name="recruiter_price"
                                            value={hireForm.recruiter_price}
                                            onChange={handleHireFormChange}
                                            required
                                            disabled={isHiring}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            gap: '10px',
                            padding: '15px',
                            borderTop: '1px solid #e0e0e0'
                        }}>
                            <button 
                                className="modal-button" 
                                onClick={() => setShowHireModal(false)}
                                disabled={isHiring}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ffffff',
                                    cursor: isHiring ? 'not-allowed' : 'pointer',
                                    opacity: isHiring ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={handleHireConfirm}
                                disabled={isHiring || !hireForm.start_date || !hireForm.end_date || !hireForm.client_price || !hireForm.recruiter_price}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: '#00A389',
                                    color: '#fff',
                                    cursor: isHiring || !hireForm.start_date || !hireForm.end_date || !hireForm.client_price || !hireForm.recruiter_price ? 'not-allowed' : 'pointer',
                                    opacity: isHiring || !hireForm.start_date || !hireForm.end_date || !hireForm.client_price || !hireForm.recruiter_price ? 0.5 : 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {isHiring ? (
                                    <>
                                        <img 
                                            src="/rayze-icon.png" 
                                            alt="Loading" 
                                            style={{ 
                                                width: '20px', 
                                                height: '20px', 
                                                animation: 'spin 1s linear infinite' 
                                            }} 
                                        />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    'Hire Confirmed'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Work Order Modal */}
            {showWorkOrderModal && (
                <div className="modal-overlay" onClick={() => setShowWorkOrderModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ 
                        maxWidth: '90%', 
                        width: '800px', 
                        maxHeight: '90vh',
                        backgroundColor: '#ffffff',
                        color: '#000000'
                    }}>
                        <div className="modal-header" style={{ 
                            borderBottom: '1px solid #e0e0e0',
                            backgroundColor: '#ffffff',
                            color: '#000000'
                        }}>
                            <h2 style={{ color: '#000000' }}>Work Order</h2>
                            <button className="close-button" onClick={() => setShowWorkOrderModal(false)}>×</button>
                        </div>
                        <div className="modal-body" style={{ 
                            maxHeight: 'calc(90vh - 120px)', 
                            overflowY: 'auto',
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            color: '#000000'
                        }}>
                            <div id="workOrderContent" style={{ 
                                backgroundColor: '#ffffff',
                                color: '#000000'
                            }} dangerouslySetInnerHTML={{ __html: workOrderHtml }} />
                        </div>
                        <div className="modal-footer" style={{ 
                            display: 'flex', 
                            gap: '10px', 
                            justifyContent: 'flex-end',
                            borderTop: '1px solid #e0e0e0',
                            backgroundColor: '#ffffff',
                            padding: '15px'
                        }}>
                            <button 
                                className="modal-button" 
                                onClick={() => setShowWorkOrderModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                            <button 
                                className="modal-button"
                                onClick={() => {
                                    // Create a complete HTML document with proper styling
                                    const content = `
                                        <!DOCTYPE html>
                                        <html>
                                            <head>
                                                <title>Work Order</title>
                                                <meta charset="UTF-8">
                                                <style>
                                                    body { 
                                                        font-family: Arial, sans-serif; 
                                                        padding: 20px;
                                                        background-color: #ffffff;
                                                        color: #000000;
                                                        -webkit-print-color-adjust: exact;
                                                        print-color-adjust: exact;
                                                    }
                                                    img {
                                                        max-width: 100%;
                                                        height: auto;
                                                    }
                                                    .panel {
                                                        margin-bottom: 20px;
                                                    }
                                                    h1, h2, h3, h4, h5 {
                                                        color: #000000;
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                ${workOrderHtml}
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
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    cursor: 'pointer'
                                }}
                            >
                                Print
                            </button>
                            <button 
                                className="modal-button"
                                onClick={() => {
                                    // Create a complete HTML document with proper styling
                                    const content = `
                                        <!DOCTYPE html>
                                        <html>
                                            <head>
                                                <title>Work Order</title>
                                                <meta charset="UTF-8">
                                                <style>
                                                    body { 
                                                        font-family: Arial, sans-serif; 
                                                        padding: 20px;
                                                        background-color: #ffffff;
                                                        color: #000000;
                                                        -webkit-print-color-adjust: exact;
                                                        print-color-adjust: exact;
                                                    }
                                                    img {
                                                        max-width: 100%;
                                                        height: auto;
                                                    }
                                                    .panel {
                                                        margin-bottom: 20px;
                                                    }
                                                    h1, h2, h3, h4, h5 {
                                                        color: #000000;
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                ${workOrderHtml}
                                            </body>
                                        </html>
                                    `;
                                    
                                    // Create a blob with the HTML content
                                    const blob = new Blob([content], { type: 'text/html' });
                                    
                                    // Create a download link
                                    const downloadLink = document.createElement('a');
                                    downloadLink.href = URL.createObjectURL(blob);
                                    downloadLink.download = 'work_order.html';
                                    
                                    // Append to body, click, and remove
                                    document.body.appendChild(downloadLink);
                                    downloadLink.click();
                                    document.body.removeChild(downloadLink);
                                    
                                    // Clean up the URL object
                                    URL.revokeObjectURL(downloadLink.href);
                                }}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    cursor: 'pointer'
                                }}
                            >
                                Download HTML
                            </button>
                            <button 
                                className="modal-button primary"
                                onClick={() => {
                                    const element = document.getElementById('workOrderContent');
                                    const opt = {
                                        margin: 1,
                                        filename: 'work_order.pdf',
                                        image: { type: 'jpeg', quality: 0.98 },
                                        html2canvas: { 
                                            scale: 2,
                                            useCORS: true,
                                            logging: true,
                                            backgroundColor: '#ffffff'
                                        },
                                        jsPDF: { 
                                            unit: 'in', 
                                            format: 'letter', 
                                            orientation: 'portrait' 
                                        }
                                    };

                                    // Create a clone of the element to modify for PDF
                                    const clone = element.cloneNode(true);
                                    const images = clone.getElementsByTagName('img');
                                    for (let img of images) {
                                        img.crossOrigin = 'anonymous';
                                    }

                                    // Add styles to ensure proper rendering
                                    const style = document.createElement('style');
                                    style.textContent = `
                                        body { 
                                            font-family: Arial, sans-serif; 
                                            padding: 20px;
                                            background-color: #ffffff;
                                            color: #000000;
                                            -webkit-print-color-adjust: exact;
                                            print-color-adjust: exact;
                                        }
                                        img { 
                                            max-width: 100%;
                                            height: auto;
                                        }
                                    `;
                                    clone.appendChild(style);

                                    // Generate PDF
                                    html2pdf().set(opt).from(clone).save();
                                }}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: '#00A389',
                                    color: '#ffffff',
                                    cursor: 'pointer'
                                }}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCandidatePage;