import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './add-candidate-page.scss';

const AddCandidatePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
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
        cv_link: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidates = async () => {
            const token = sessionStorage.getItem('token');
            const user = JSON.parse(sessionStorage.getItem('user'));
            const id = JSON.parse(sessionStorage.getItem('id'));
            console.log('id is ',id);
            
            try {
                const response = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_candidates`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const allCandidates = response.data;
                const filteredData = response.data;
                setCandidates(filteredData);
                setFilteredCandidates(filteredData);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);

    useEffect(() => {
        const filtered = candidates.filter(candidate => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                const value = candidate[key]?.toString().toLowerCase() || '';
                return value.includes(filters[key].toLowerCase());
            });
        });
        setFilteredCandidates(filtered);
    }, [filters, candidates]);

    const handleFilterChange = (e, field) => {
        setFilters(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleNewCandidateChange = (e) => {
        const { name, value } = e.target;
        setNewCandidate(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitCandidate = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        
        try {
            await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_candidate`, newCandidate, {
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
                cv_link: ''
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
            
            alert('Candidate created successfully!');
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

    return (
        <div className="add-candidate-container">
            <div className="panel">
                <h1>Candidates</h1>


                {/* Add Candidate Accordion */}
                <div className="accordion">
                    <div 
                        className="accordion-header"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        <h2>Add Candidate</h2>
                        <span className={`arrow ${showAddForm ? 'open' : ''}`}>▼</span>
                    </div>
                    {showAddForm && (
                        <form onSubmit={handleSubmitCandidate} className="add-candidate-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newCandidate.name}
                                    onChange={handleNewCandidateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Role"
                                    value={newCandidate.role}
                                    onChange={handleNewCandidateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={newCandidate.location}
                                    onChange={handleNewCandidateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="candidate_cost"
                                    placeholder="Candidate Cost"
                                    value={newCandidate.candidate_cost}
                                    onChange={handleNewCandidateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={newCandidate.phone}
                                    onChange={handleNewCandidateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={newCandidate.email}
                                    onChange={handleNewCandidateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="feedback"
                                    placeholder="Feedback"
                                    value={newCandidate.feedback}
                                    onChange={handleNewCandidateChange}
                                    rows="4"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="url"
                                    name="cv_link"
                                    placeholder="CV Link"
                                    value={newCandidate.cv_link}
                                    onChange={handleNewCandidateChange}
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Add Candidate
                            </button>
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
                                placeholder="Filter by role"
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
                </div>
                
                <div className="table-container">
                    <table cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.map(candidate => (
                                <tr 
                                    key={candidate.id} 
                                    onClick={() => handleRowClick(candidate.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{candidate.name || '-'}</td>
                                    <td>{candidate.role || '-'}</td>
                                    <td>{candidate.location || '-'}</td>
                                    <td>{candidate.phone || '-'}</td>
                                    <td>{candidate.email || '-'}</td>
                                    <td>{candidate.status || '-'}</td>
                                    <td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddCandidatePage;