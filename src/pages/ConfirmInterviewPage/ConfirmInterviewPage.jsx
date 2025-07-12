import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import axios from 'axios';
import './ConfirmInterview-page.scss';

const ConfirmInterviewPage = () => {
  const [htmlString, setHtmlString] = useState('');
  const { interview_id } = useParams();
  const location = useLocation();
  const hasConfirmed = useRef(false); // Track if confirmTimeslot has been called
  
  // Extract slot parameter from URL query string
  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  };

  const query = useQuery();
  const slot = query.get('slot');

  useEffect(() => {
    const confirmTimeslot = async () => {
      // Prevent multiple calls
      if (hasConfirmed.current) {
        console.log('confirmTimeslot already called, skipping...');
        return;
      }
      
      hasConfirmed.current = true;
      
      try {
        //console.log("interview_id is ", interview_id);
        //console.log("slot is ", slot);
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
        console.log(response);
        if (response.data.prior_status.includes("Confirmed")) {
          console.log('Interview already confirmed, skipping...');
          setHtmlString('<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Interview already confirmed, skipping...</h2></div>');
          return;
        }
        
        if (response.data.status === "confirmed") {
          // Send calendar invite
          //console.log('Response data:', response.data);
          //console.log('interview_confirmed_on:', response.data.interview_confirmed_on);
          
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
          console.log('Formatted datetime n confirm:', formattedDateTime, hasConfirmed.current);
          
          const invitePayload = {
            to_email: response.data.interview_options.invite_emails,
            to_name: response.data.interview_options.candidate_name,
            cc_email: process.env.REACT_APP_SENDMAIL_CC,
            subject: "Interview Confirmed - " + response.data.interview_options.candidate_name,
            event_summary: "Interview with " + response.data.interview_options.candidate_name,
            event_datetime: formattedDateTime,
            event_duration_hours: 1
          };

          if (process.env.REACT_APP_SENDMAIL_TEST) {
            invitePayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
            console.log('test calendar invite');
          }
          //console.log('Invite payload:', invitePayload);
          const calendarResponse = await axios.post(
            `${process.env.REACT_APP_RYZ_SENDMAIL}/send_invite`,
            invitePayload,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          
          if (calendarResponse.data.status === "success") {
              console.log('calendar invite sent');
              const interview_options = response.data.interview_options;
              interview_options.event_id = calendarResponse.data.event_id;
              interview_options.meet_link = calendarResponse.data.meet_link;
              // Update just the interview_options field for this submit_cv_role_id
              try {
                await axios.put(
                  `${process.env.REACT_APP_RYZ_SERVER}/update_interview_options/${response.data.interview_options.submit_cvrole_id}`,
                  {
                    interview_options: JSON.stringify(interview_options)
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );
                console.log('Updated interview options with calendar details');
              } catch (error) {
                console.error('Error updating interview options:', error);
              }
            }
          //setHtmlString(response.data.html);
        } else if (response.data.status === "requested") {
          const emailPayload = {
            to_email: response.data.interview_options.candidate_email,
            to_name: response.data.interview_options.candidate_name,
            cc_email: process.env.REACT_APP_SENDMAIL_CC,
            subject: "Please find mutually agreeable interview timeslot with candidate "+response.data.interview_options.candidate_name,
            content: "Please confirm mutually agreeable interview timeslot with candidate "+response.data.interview_options.candidate_name+" at the earliest.\n\nThanks,\nRayze AI",
            from_email: process.env.REACT_APP_SENDMAIL_FROM
          };
          if (process.env.REACT_APP_SENDMAIL_TEST) {
            emailPayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
            console.log('test email done')
          }
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
    hasConfirmed.current = true;

  }, [interview_id, slot]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default ConfirmInterviewPage;
