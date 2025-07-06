import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import axios from 'axios';
import './ConfirmInterview-page.scss';

const ConfirmInterviewPage = () => {
  const [htmlString, setHtmlString] = useState('');
  const { interview_id } = useParams();
  const location = useLocation();
  
  // Extract slot parameter from URL query string
  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  };

  const query = useQuery();
  const slot = query.get('slot');

  useEffect(() => {
    const confirmTimeslot = async () => {
      try {
        console.log("interview_id is ", interview_id);
        console.log("slot is ", slot);
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        const response = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/confirm_timeslot/${interview_id}`,
        {
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`, // Include the token in the request header
           },
           params: { slot }
        });
        setHtmlString(response.data.html);
        if (response.data.status === "confirmed") {
          // Send calendar invite
          console.log('Response data:', response.data);
          console.log('interview_confirmed_on:', response.data.interview_confirmed_on);
          
          // Check if interview_confirmed_on exists and is valid
          if (!response.data.interview_confirmed_on) {
            console.error('interview_confirmed_on is missing or null');
            return;
          }
          
          // Parse the datetime string and timezone
          // const [datePart, timezonePart] = response.data.interview_confirmed_on.split(' ');
          // const dateObj = new Date(datePart);
          
          // // Check if the date is valid
          // if (isNaN(dateObj.getTime())) {
          //   console.error('Invalid date:', response.data.interview_confirmed_on);
          //   return;
          // }
          
          // // Format to YYYY-MM-DD HH:MM:SS TZ
          // const formattedDate = dateObj.toISOString().slice(0, 10);
          // const formattedTime = dateObj.toTimeString().slice(0, 8);
          // const formattedDateTime = `${formattedDate} ${formattedTime} ${timezonePart}`;
          const formattedDateTime = response.data.interview_confirmed_on;
          console.log('Formatted datetime:', formattedDateTime);
          
          const invitePayload = {
            to_email: response.data.interview_options.invite_emails,
            to_name: response.data.interview_options.candidate_name,
            cc_email: "ravi@rayze.xyz, jc@rayze.xyz",
            subject: "Interview Confirmed - " + response.data.interview_options.candidate_name,
            event_summary: "Interview with " + response.data.interview_options.candidate_name,
            event_datetime: formattedDateTime,
            event_duration_hours: 1
          };

          if (process.env.REACT_APP_RYZ_SENDMAIL === "http://127.0.0.1:8888") {
            invitePayload.to_email = "212cooperja@gmail.com";
            invitePayload.cc_email = "212cooperja@gmail.com";
            console.log('test calendar invite');
          }
          console.log('Invite payload:', invitePayload);
          const calendarResponse = await axios.post(
            `${process.env.REACT_APP_RYZ_SENDMAIL}/send_invite`,
            invitePayload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          //setHtmlString(response.data.html);
        } else if (response.data.status === "requested") {
          const emailPayload = {
            to_email: "ravi@rayze.xyz",
            to_name: "AI Ops",
            cc_email: "ravi@rayze.xyz, jc@rayze.xyz",
            subject: "Please find mutually agreeable interview timeslot with candidate "+response.data.interview_options.candidate_name,
            content: "Please confirm mutually agreeable interview timeslot with candidate "+response.data.interview_options.candidate_name+" at the earliest.\n\nThanks,\nRayze AI",
            from_email: "jc@rayze.xyz"
          };
          if (process.env.REACT_APP_RYZ_SENDMAIL === "http://127.0.0.1:8888") {
            emailPayload.to_email = "212cooperja@gmail.com";
            emailPayload.cc_email = "212cooperja@gmail.com";
            console.log('test email done')
          }
          emailPayload.to_email = "212cooperja@gmail.com";
          console.log('Email payload:', emailPayload);
          const emailResponse = await axios.post(
            `${process.env.REACT_APP_RYZ_SENDMAIL}/send_html_email`,
            emailPayload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );    
        }
      } catch (error) {
        console.error('Error confirming timeslot:', error);
      }
    };

    confirmTimeslot();
  }, [interview_id, slot]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default ConfirmInterviewPage;
