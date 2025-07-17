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
  const [filteredInputRequiredCandidates, setFilteredInputRequiredCandidates] = useState([]);
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
  const [inputRequiredFilters, setInputRequiredFilters] = useState({
    name: '',
    role: '',
    location: ''
  });
  const [openRolesFilters, setOpenRolesFilters] = useState({
    role_desc: ''
  });
  const [showMatchScoreModal, setShowMatchScoreModal] = useState(false);
  const [matchScoreResult, setMatchScoreResult] = useState(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [declineFeedback, setDeclineFeedback] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [interviewSlots, setInterviewSlots] = useState(() => {
    // Calculate default dates (next 3 business days)
    const today = new Date();
    
    // Function to get the nth business day from today
    const getNthBusinessDay = (n) => {
      const date = new Date(today);
      let businessDaysFound = 0;
      
      while (businessDaysFound < n) {
        date.setDate(date.getDate() + 1);
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          businessDaysFound++;
        }
      }
      
      return date;
    };

    const prio1Date = getNthBusinessDay(1);
    const prio2Date = getNthBusinessDay(2);
    const prio3Date = getNthBusinessDay(3);

    return {
      prio1: { 
        date: prio1Date.toISOString().split('T')[0], 
        time: '09:00', 
        timezone: 'America/Los_Angeles' 
      },
      prio2: { 
        date: prio2Date.toISOString().split('T')[0], 
        time: '08:00', 
        timezone: 'America/Los_Angeles' 
      },
      prio3: { 
        date: prio3Date.toISOString().split('T')[0], 
        time: '09:00', 
        timezone: 'America/Los_Angeles' 
      }
    };
  });
  const [convertedTimes, setConvertedTimes] = useState({
    prio1: '',
    prio2: '',
    prio3: ''
  });
  const [convertingTimes, setConvertingTimes] = useState({
    prio1: false,
    prio2: false,
    prio3: false
  });
  const [interviewEmails, setInterviewEmails] = useState('');
  const [interviewPhone, setInterviewPhone] = useState('');
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
    
    // Initialize interview contact fields with user data
    const user_data = JSON.parse(sessionStorage.getItem('user'));
    setInterviewEmails(user_data?.email || '');
    setInterviewPhone(user_data?.msg_id || '');
    
    // If user is Client, force them to Client Console
    if (role === 'Client') {
      setSelectedClientId(user.client_id);
      setActiveTab("client_console");
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
        // console.log('client_id', client_id);
        console.log('process.env.REACT_APP_RYZ_SENDMAIL', process.env.REACT_APP_RYZ_SENDMAIL, `${process.env.REACT_APP_RYZ_SENDMAIL}`);

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
          axios.get(`${process.env.REACT_APP_RYZ_SERVER}/get_console_open_roles_by_client/${client_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        ]);

        // console.log('consoleResponse', consoleResponse.data);
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

  // Add input required filter effect
  useEffect(() => {
    let filtered = candidates.filter(candidate => {
      return Object.keys(inputRequiredFilters).every(key => {
        if (!inputRequiredFilters[key]) return true;
        const value = candidate[key]?.toString().toLowerCase() || '';
        return value.includes(inputRequiredFilters[key].toLowerCase());
      });
    });
    setFilteredInputRequiredCandidates(filtered);
  }, [inputRequiredFilters, candidates]);

  // Add open roles filter effect
  useEffect(() => {
    let filtered = openRoles.filter(role => {
      return Object.keys(openRolesFilters).every(key => {
        if (!openRolesFilters[key]) return true;
        const value = role[key]?.toString().toLowerCase() || '';
        return value.includes(openRolesFilters[key].toLowerCase());
      });
    });
    setFilteredOpenRoles(filtered);
  }, [openRolesFilters, openRoles]);

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

  const handleInputRequiredFilterChange = (e, field) => {
    setInputRequiredFilters(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleOpenRolesFilterChange = (e, field) => {
    setOpenRolesFilters(prev => ({
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

  const handleDeclineClick = (e, candidate) => {
    e.stopPropagation();
    setSelectedCandidate(candidate);
    setShowDeclineModal(true);
  };

  const handleDeclineConfirm = async () => {
    if (!declineFeedback) return;

    try {
      const token = sessionStorage.getItem('token');
      const user_data = JSON.parse(sessionStorage.getItem('user'));
      //const client_id = user_data.client_id;
      const client_id = selectedClientId || user_data.client_id;

      // Update candidate status
      await axios.put(
        `${process.env.REACT_APP_RYZ_SERVER}/update_candidate/${selectedCandidate.id}`,
        {
          status: 'Declined',
          feedback: declineFeedback
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update submit CV status using the correct endpoint and parameter
      const submitCVRoleData = {
        status: 'Declined'
      };
      
      // console.log('Sending submit CV role data:', submitCVRoleData);
      
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_RYZ_SERVER}/update_submit_cvrole/${selectedCandidate.submit_cvrole_id}`,
          submitCVRoleData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('Submit CV role update response:', response.data);
      } catch (error) {
        console.error('Error details:', error.response?.data);
        throw error;
      }

      // Refresh the candidates list
      const responseCandidates = await axios.get(
        `${process.env.REACT_APP_RYZ_SERVER}/get_console_candidates_by_client/${client_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCandidates(responseCandidates.data);
      setFilteredCandidates(responseCandidates.data);

      // Close modal and reset state
      setShowDeclineModal(false);
      setSelectedCandidate(null);
      setDeclineFeedback('');
    } catch (error) {
      console.error('Error declining candidate:', error);
    }
  };

  const handleProceedClick = async (e, candidate) => {
    e.stopPropagation();
    
    if (candidate.status === 'Submitted') {
      // Show the interview scheduling modal
      setSelectedCandidate(candidate);
      setShowScheduleModal(true);
      return;
    }
    
    let newStatus;
    if (candidate.status.includes('Confirmed')) {
      newStatus = 'Ready to Hire';
    } else {
      return; // Invalid status transition
    }

    // Use the helper function for other status transitions
    handleProceedWithStatus(candidate, newStatus);
  };

  const handleCloseDeclineModal = () => {
    setShowDeclineModal(false);
    setSelectedCandidate(null);
    setDeclineFeedback('');
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
    setSelectedCandidate(null);
    
    // Reset to default interview slots
    const today = new Date();
    
    // Function to get the nth business day from today
    const getNthBusinessDay = (n) => {
      const date = new Date(today);
      let businessDaysFound = 0;
      
      while (businessDaysFound < n) {
        date.setDate(date.getDate() + 1);
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          businessDaysFound++;
        }
      }
      
      return date;
    };

    const prio1Date = getNthBusinessDay(1);
    const prio2Date = getNthBusinessDay(2);
    const prio3Date = getNthBusinessDay(3);

    // setInterviewSlots({
    //   prio1: { 
    //     date: prio1Date.toISOString().split('T')[0], 
    //     time: '09:00', 
    //     timezone: 'America/Los_Angeles'
    //   },
    //   prio2: { 
    //     date: prio2Date.toISOString().split('T')[0], 
    //     time: '08:00', 
    //     timezone: 'America/Los_Angeles' 
    //   },
    //   prio3: { 
    //     date: prio3Date.toISOString().split('T')[0], 
    //     time: '09:00', 
    //     timezone: 'America/Los_Angeles' 
    //   }
    // });
    setConvertedTimes({
      prio1: '',
      prio2: '',
      prio3: ''
    });
    setConvertingTimes({
      prio1: false,
      prio2: false,
      prio3: false
    });
    
    // Reset interview contact fields with user data
    const user = JSON.parse(sessionStorage.getItem('user'));
    setInterviewEmails(user?.email || '');
    setInterviewPhone(user?.msg_id || '');
  };

  const handleInterviewSlotChange = (priority, field, value) => {
    setInterviewSlots(prev => ({
      ...prev,
      [priority]: {
        ...prev[priority],
        [field]: value
      }
    }));
  };

  const convertTimeForCandidate = async (priority, date, time, timezone) => {
    if (!date || !time || !selectedCandidate?.location) return;
    
    setConvertingTimes(prev => ({ ...prev, [priority]: true }));
    
    try {
      const token = sessionStorage.getItem('token');
      const timeStr = `${date} ${time}`;
      
      // Convert timezone string to city name for the API
      const getCityFromTimezone = (tz) => {
        const cityMap = {
          'America/New_York': 'New York',
          'America/Chicago': 'Chicago',
          'America/Denver': 'Denver',
          'America/Los_Angeles': 'Los Angeles',
          'America/Phoenix': 'Phoenix',
          'America/Bogota': 'Bogota',
          'America/Mexico_City': 'Mexico City',
          'Europe/London': 'London',
          'Europe/Paris': 'Paris',
          'Asia/Tokyo': 'Tokyo',
          'Asia/Shanghai': 'Shanghai',
          'Asia/Singapore': 'Singapore',
          'Asia/Kolkata': 'Mumbai',
          'Australia/Sydney': 'Sydney',
          'Australia/Melbourne': 'Melbourne',
          'Australia/Perth': 'Perth'
        };
        return cityMap[tz] || tz.split('/').pop().replace('_', ' ');
      };
      console.log('Sending convert_time payload:', {
        from_city: getCityFromTimezone(timezone),
        to_city: selectedCandidate.location,
        time_str: timeStr,
        fmt: "%Y-%m-%d %H:%M"
      });
      const response = await axios.post(
        `${process.env.REACT_APP_RYZ_SENDMAIL}/convert_time`,
        {
          from_city: getCityFromTimezone(timezone),
          to_city: selectedCandidate.location,
          time_str: timeStr,
          fmt: "%Y-%m-%d %H:%M"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.status === 'success') {
        setConvertedTimes(prev => ({
          ...prev,
          [priority]: response.data.converted_time
        }));
      }
    } catch (error) {
      console.error('Error converting time:', error);
      setConvertedTimes(prev => ({
        ...prev,
        [priority]: 'Error converting time'
      }));
    } finally {
      setConvertingTimes(prev => ({ ...prev, [priority]: false }));
    }
  };

  // Update converted times when interview slots change
  useEffect(() => {
    if (!selectedCandidate?.location) return;
    
    Object.keys(interviewSlots).forEach(priority => {
      const slot = interviewSlots[priority];
      if (slot.date && slot.time && slot.timezone) {
        convertTimeForCandidate(priority, slot.date, slot.time, slot.timezone);
      }
    });
  }, [interviewSlots, selectedCandidate?.location]);

  const isScheduleButtonEnabled = () => {
    return interviewSlots.prio1.date && interviewSlots.prio1.time &&
           interviewSlots.prio2.date && interviewSlots.prio2.time &&
           interviewSlots.prio3.date && interviewSlots.prio3.time;
  };

  const handleScheduleInterview = async () => {
    let invite_emails = interviewEmails;
    if (invite_emails === '') {
      invite_emails = selectedCandidate.email;
    }
    else invite_emails = invite_emails + " , " + selectedCandidate.email;

    const scheduleData = {
      timeslot1: `${interviewSlots.prio1.date}T${interviewSlots.prio1.time} ${interviewSlots.prio1.timezone}`,
      timeslot2: `${interviewSlots.prio2.date}T${interviewSlots.prio2.time} ${interviewSlots.prio2.timezone}`,
      timeslot3: `${interviewSlots.prio3.date}T${interviewSlots.prio3.time} ${interviewSlots.prio3.timezone}`,
      invite_emails: invite_emails,
      candidate_name: selectedCandidate.name,
      candidate_email: selectedCandidate.email,
      candidate_phone: selectedCandidate.phone,
      submit_cvrole_id: selectedCandidate.submit_cvrole_id,
      interview_id: selectedCandidate.submit_cvrole_id,
      client_phone: interviewPhone,
      client_id: selectedClientId
    };
    // console.log('Interview schedule data:', JSON.stringify(scheduleData));
    const response =  await axios.post(
      `${process.env.REACT_APP_RYZ_SERVER}/submit_interview_timeslot`,
      scheduleData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
    scheduleData.content = response.data.html;
    scheduleData.interview_id = response.data.interview_id;
    scheduleData.subject = "Rayze Interview Schedule - Please Confirm";
    // console.log('Interview timeslot response:', response.data.html);
    
    // Send HTML email with interview details
    console.log('process.env.REACT_APP_SENDMAIL_CC', process.env.REACT_APP_SENDMAIL_CC, `${process.env.REACT_APP_SENDMAIL_CC}`);
    try {
      const emailPayload = {
        to_email: selectedCandidate.email,
        to_name: selectedCandidate.name,
        cc_email: process.env.REACT_APP_SENDMAIL_CC,
        subject: "Interview Schedule - Please Confirm",
        content: response.data.html,
        from_email: process.env.REACT_APP_SENDMAIL_FROM
      };
      console.log('emailPayload', emailPayload);
      if (process.env.REACT_APP_SENDMAIL_TEST) {
        emailPayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
        console.log('test email done')
      }
      // console.log('Email payload:', emailPayload);
      const emailResponse = await axios.post(
        `${process.env.REACT_APP_RYZ_SENDMAIL}/send_html_email`,
        emailPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // console.log('Email sent successfully:', emailResponse.data);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue with the process even if email fails
    }
    
    // Continue with the proceed logic
    handleCloseScheduleModal();
    // Continue with the proceed logic
    handleProceedWithStatus(selectedCandidate, 'Interview Requested');
  };

  const handleProceedWithStatus = async (candidate, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const user_data = JSON.parse(sessionStorage.getItem('user'));
      const client_id = selectedClientId || user_data.client_id;

      // Update candidate status
      await axios.put(
        `${process.env.REACT_APP_RYZ_SERVER}/update_candidate/${candidate.id}`,
        {
          status: newStatus
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update submit CV status
      await axios.put(
        `${process.env.REACT_APP_RYZ_SERVER}/update_submit_cvrole/${candidate.submit_cvrole_id}`,
        {
          status: newStatus
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the candidates list
      const response = await axios.get(
        `${process.env.REACT_APP_RYZ_SERVER}/get_console_candidates_by_client/${client_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCandidates(response.data);
      setFilteredCandidates(response.data);
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  // Function to get interview status for a candidate (stable across renders)
  // const getCandidateInterviewStatus = (candidate_status) => {
  //   let scheduleStatus;
  //   if (candidate_status === 'Submitted') {
  //     scheduleStatus = 'Submitted';
  //   } else if (candidate_status === 'Interview Scheduled') {
  //     scheduleStatus = 'Jul 02, 2025';
  //   } else if (candidate_status === 'Interview Completed') {
  //     scheduleStatus = 'Hire';
  //   } else {
  //     scheduleStatus = 'Submitted';
  //   }
  //   return scheduleStatus;
  // };

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
                <h3>Rayze on Payroll</h3>
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
                    value={inputRequiredFilters.name}
                    onChange={(e) => handleInputRequiredFilterChange(e, 'name')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by Open Role"
                    value={inputRequiredFilters.role}
                    onChange={(e) => handleInputRequiredFilterChange(e, 'role')}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by location"
                    value={inputRequiredFilters.location}
                    onChange={(e) => handleInputRequiredFilterChange(e, 'location')}
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '140px' }}>Click to Proceed</th>
                      <th style={{ width: '60px' }}>Decline</th>
                      <th>Name</th>
                      <th>Open Role</th>
                      <th>Candidate Location</th>
                      <th>Interview Status</th>
                      <th>Confirmed Interview</th>
                      <th>Days Old</th>
                      <th>CV</th>
                      <th>Match Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInputRequiredCandidates
                      .filter(candidate => candidate.status === 'Submitted' || 
                        candidate.status === 'Interview Requested' || 
                        candidate.status === 'Interview Confirmed' || 
                        candidate.status === 'Ready to Hire')
                      .map(candidate => (
                        <tr key={candidate.id}>
                          <td>
                            <button 
                              className="interview-status-button"
                              style={{
                                backgroundColor: candidate.status === 'Submitted' ? '#f59e0b' : 
                                  candidate.status === 'Interview Requested' ? '#9333ea' :
                                  candidate.status.includes('Confirmed') ? '#9333ea' :
                                  candidate.status === 'Ready to Hire' ? '#22c55e' : '#3b82f6',
                                color: 'white'
                              }}
                              disabled={candidate.status === 'Interview Requested'}
                              onClick={(e) => handleProceedClick(e, candidate)}
                            >
                              {candidate.status}
                            </button>
                          </td>
                          <td>
                            <button 
                              className="action-button decline"
                              onClick={(e) => handleDeclineClick(e, candidate)}
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
                            {candidate.interview_confirmed_on ? (
                              <span style={{
                                color: new Date(candidate.interview_confirmed_on) >= new Date() ? 'var(--theme-color)' : '#ef4444'
                              }}>
                                {new Date(candidate.interview_confirmed_on).toLocaleDateString()} {new Date(candidate.interview_confirmed_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'America/New_York'})} EDT
                              </span>
                            ) : '-'}
                          </td>
                          <td>
                            {candidate.submitted_on ? 
                              Math.floor((new Date() - new Date(candidate.submitted_on)) / (1000 * 60 * 60 * 24)) : 
                              '-'
                            }
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
                                AI Match
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
                    value={openRolesFilters.role_desc}
                    onChange={(e) => handleOpenRolesFilterChange(e, 'role_desc')}
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', width: '60ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Role Description</th>
                      <th style={{ textAlign: 'left', width: '40ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Role Location</th>
                      <th style={{ textAlign: 'left', width: '40ch' }}># Candidates Submitted</th>
                      <th style={{ textAlign: 'left', width: '40ch' }}>Days Old</th>
                      <th style={{ textAlign: 'left', width: '40ch' }}>Role Posted On</th>
                      <th style={{ textAlign: 'left', width: '40ch' }}>JD Link</th>
                      <th style={{ textAlign: 'left', width: '40ch' }}>Role Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOpenRoles.map(role => (
                      <tr key={role.role_desc}>
                        <td style={{ textAlign: 'left', width: '60ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role.role_desc || '-'}</td>
                        <td style={{ width: '40ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role.location || '-'}</td>
                        <td style={{ width: '40ch' }}>{role.num_applicants || 0}</td>
                        <td style={{ width: '40ch' }}>
                          {role.posted_date ? 
                            Math.floor((new Date() - new Date(role.posted_date)) / (1000 * 60 * 60 * 24)) : 
                            '-'
                          }
                        </td>
                        <td style={{ width: '40ch' }}>{role.posted_date || '-'}</td>
                        <td style={{ width: '40ch' }}>
                          {role.job_desc_link ? (
                            <button 
                              className="cv-link"
                              onClick={() => window.open(role.job_desc_link, '_blank')}
                            >
                              View JD
                            </button>
                          ) : '-'}
                        </td>
                        <td style={{ width: '40ch' }}>
                          <span className={`status-badge ${role.status?.toLowerCase()}`}>
                            {role.status || '-'}
                          </span>
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
                <table style={{ width: '100%', tableLayout: 'fixed' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '60px', textAlign: 'left' }}>Name</th>
                      <th style={{ width: '60px', textAlign: 'left' }}>Current Role</th>
                      <th style={{ width: '40px', textAlign: 'left' }}>Location</th>
                      <th style={{ width: '40px', textAlign: 'left' }}>Status</th>
                      <th style={{ width: '40px', textAlign: 'left' }}>CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates
                      .filter(candidate => candidate.status === 'Hired')
                      .map(candidate => (
                      <tr key={candidate.id}>
                        <td style={{ width: '60px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{candidate.name || '-'}</td>
                        <td style={{ width: '60px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{candidate.role || '-'}</td>
                        <td style={{ width: '40px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{candidate.location || '-'}</td>
                        <td style={{ width: '40px', textAlign: 'left' }}>
                          <span className={`status-badge ${candidate.status?.toLowerCase()}`}>
                            {candidate.status || '-'}
                          </span>
                        </td>
                        <td style={{ width: '40px', textAlign: 'left' }}>
                          {candidate.cv_link && (
                            <button 
                              className="cv-link"
                              onClick={() => window.open(candidate.cv_link, '_blank')}
                            >
                              View CV
                            </button>
                          )}
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

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="modal-overlay" onClick={handleCloseDeclineModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Decline</h2>
              <button className="close-button" onClick={handleCloseDeclineModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Confirm  {selectedCandidate?.name} is declined from the hiring process.</p>
              <div className="feedback-section">
                <label htmlFor="declineFeedback">Reason for Decline:</label>
                <select
                  id="declineFeedback"
                  value={declineFeedback}
                  onChange={(e) => setDeclineFeedback(e.target.value)}
                  className="feedback-select"
                >
                  <option value="">Select a reason</option>
                  <option value="Skills mismatch">Skills mismatch</option>
                  <option value="Not strong in technical skills">Not strong in technical skills</option>
                  <option value="Not strong in communications">Not strong in communications</option>
                  <option value="Location mismatch">Location mismatch</option>
                  <option value="Culture mismatch">Culture mismatch</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button cancel" 
                onClick={handleCloseDeclineModal}
              >
                Cancel
              </button>
              <button 
                className="modal-button confirm" 
                onClick={handleDeclineConfirm}
                disabled={!declineFeedback}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="modal-overlay" onClick={handleCloseScheduleModal}>
          <div className="modal-content schedule-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Schedule Interview</h2>
              <button className="close-button" onClick={handleCloseScheduleModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Please select 3 interview timeslots for the candidate {selectedCandidate?.name}</p>
              <p style={{ color: '#0066ff' }}>Candidate Location: {selectedCandidate?.location}</p>
              <p style={{ color: '#0066ff' }}>Please consider the timezone of the candidate</p>
              
              {/* Contact Information Section */}
              <div className="contact-info-section">
                <h3>Contact for Calender invite</h3>
                <div className="contact-inputs">
                  <div className="input-group">
                    <label htmlFor="interview-emails">Email Addresses (comma separated):</label>
                    <input
                      type="text"
                      id="interview-emails"
                      value={interviewEmails}
                      onChange={(e) => setInterviewEmails(e.target.value)}
                      className="schedule-input"
                      placeholder="email1@example.com, email2@example.com"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="interview-phone">Phone Number:</label>
                    <input
                      type="text"
                      id="interview-phone"
                      value={interviewPhone}
                      onChange={(e) => setInterviewPhone(e.target.value)}
                      className="schedule-input"
                      placeholder="+1-555-123-4567"
                    />
                  </div>
                </div>
              </div>
              
              <div className="interview-slots">
                {['prio1', 'prio2', 'prio3'].map((priority, index) => (
                  <div key={priority} className="interview-slot">
                    <h3>Priority {index + 1} Interview Time</h3>
                    <div className="slot-inputs">
                      <div className="input-group">
                        <label htmlFor={`${priority}-date`}>Date:</label>
                        <input
                          type="date"
                          id={`${priority}-date`}
                          value={interviewSlots[priority].date}
                          onChange={(e) => handleInterviewSlotChange(priority, 'date', e.target.value)}
                          className="schedule-input"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor={`${priority}-time`}>Time:</label>
                        <input
                          type="time"
                          id={`${priority}-time`}
                          value={interviewSlots[priority].time}
                          onChange={(e) => handleInterviewSlotChange(priority, 'time', e.target.value)}
                          className="schedule-input"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor={`${priority}-timezone`}>Timezone:</label>
                        <select
                          id={`${priority}-timezone`}
                          value={interviewSlots[priority].timezone}
                          onChange={(e) => handleInterviewSlotChange(priority, 'timezone', e.target.value)}
                          className="schedule-input"
                        >
                          <option value="America/New_York">Eastern Time (New York)</option>
                          <option value="America/Chicago">Central Time (Chicago)</option>
                          <option value="America/Denver">Mountain Time (Denver)</option>
                          <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
                          <option value="America/Chicago">Central Time (Austin)</option>
                          <option value="America/Phoenix">Mountain Time (Phoenix)</option>
                          <option value="America/Los_Angeles">Pacific Time (Seattle)</option>
                          <option value="America/Chicago">Central Time (Dallas)</option>
                          <option value="America/Chicago">Central Time (Houston)</option>
                          <option value="America/Los_Angeles">Pacific Time (San Francisco)</option>
                          <option value="America/Los_Angeles">Pacific Time (San Diego)</option>
                          <option value="America/New_York">Eastern Time (Boston)</option>
                          <option value="America/Chicago">Central Time (New Orleans)</option>
                          <option value="America/New_York">Eastern Time (Philadelphia)</option>
                          <option value="America/Bogota">Bogota</option>
                          <option value="America/Bogota">Medellin</option>
                          <option value="America/Mexico_City">Mexico City</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Paris">Paris</option>
                          <option value="Asia/Tokyo">Tokyo</option>
                          <option value="Asia/Shanghai">Shanghai</option>
                          <option value="Asia/Singapore">Singapore</option>
                          <option value="Asia/Kolkata">Mumbai</option>
                          <option value="Asia/Kolkata">Hyderabad</option>
                          <option value="Asia/Kolkata">Delhi</option>
                          <option value="Asia/Kolkata">Kolkata</option>
                          <option value="Asia/Kolkata">Chennai</option>
                          <option value="Asia/Kolkata">Bengaluru</option>
                          <option value="Asia/Kolkata">Jaipur</option>
                          <option value="Asia/Kolkata">Ahmedabad</option>
                          <option value="Asia/Kolkata">Pune</option>
                          <option value="Australia/Sydney">Sydney</option>
                          <option value="Australia/Melbourne">Melbourne</option>
                          <option value="Australia/Perth">Perth</option>
                        </select>
                      </div>
                    </div>
                    {convertedTimes[priority] && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '8px', 
                        backgroundColor: '#f0f8ff', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        color: '#0066cc'
                      }}>
                        <strong>Candidate Location Time:</strong> {convertedTimes[priority]} ({selectedCandidate?.location || selectedCandidate?.timezone || 'Unknown timezone'})
                      </div>
                    )}
                    {convertingTimes[priority] && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '8px', 
                        backgroundColor: '#fff3cd', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        color: '#856404'
                      }}>
                        <strong>Converting time...</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button cancel" 
                onClick={handleCloseScheduleModal}
              >
                Cancel
              </button>
              <button 
                className="modal-button confirm" 
                onClick={handleScheduleInterview}
                disabled={!isScheduleButtonEnabled()}
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
