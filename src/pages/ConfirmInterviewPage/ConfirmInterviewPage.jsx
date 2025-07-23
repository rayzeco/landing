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
             'Content-Type': 'application/html',
             Authorization: `Bearer ${token}`, // Include the token in the request header
           },
           params: { slot }
        });
        // Parse the JSON response directly
        const responseData = response.data;
        console.log("responseData is", responseData);

        let parsedData = {};
        let htmlContent = '';

        // Handle different response statuses
        if (responseData.status === "already_confirmed") {
          console.log('Interview already confirmed, skipping...');
          htmlContent = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Interview already confirmed, skipping...</h2></div>';
          setHtmlString(htmlContent);
          return;
        } else if (responseData.status === "alternate_requested") {
          console.log('Alternate timeslot requested');
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; text-align: center;">Interview Timeslot Requested</h2>
              <p style="font-size: 16px; line-height: 1.5; text-align: center;">
                ${responseData.message}
              </p>
              <p style="font-size: 14px; color: #666; text-align: center;">
                ${responseData.details}
              </p>
            </div>
          `;
          setHtmlString(htmlContent);
          return;
        } else if (responseData.status === "confirmed") {
          // Extract data from the confirmed response
          parsedData = {
            status: responseData.status,
            interview_confirmed_on: responseData.interview_confirmed_on,
            interview_confirmed_on_date: responseData.interview_confirmed_on_date,
            interview_confirmed_on_time: responseData.interview_confirmed_on_time,
            interview_options: responseData.interview_options
          };
          
          console.log('Parsed response data:', parsedData);
          
          // Generate HTML for confirmed interview
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; text-align: center;">Interview Timeslot Confirmed</h2>
              <p style="font-size: 16px; line-height: 1.5; text-align: center;">
                Your interview has been scheduled for<br>
                <strong style="text-align: left">Date: ${parsedData.interview_confirmed_on_date}</strong><br>
                <strong style="text-align: left">Time: ${parsedData.interview_confirmed_on_time}</strong>
              </p>
              <p style="font-size: 14px; color: #666; text-align: center;">
                We look forward to speaking with you at the scheduled time.
              </p>
            </div>
          `;
          setHtmlString(htmlContent);
        } else {
          console.log('Unknown response status:', responseData.status);
          htmlContent = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Unknown response status</h2></div>';
          setHtmlString(htmlContent);
          return;
        }
        //console.log('status:', parsedData.status);
        if (parsedData.status === "confirmed") {
          // Send calendar invite
          //console.log('Response data:', response.data);
          console.log('interview_confirmed_on:', parsedData.interview_confirmed_on);
          
          // Check if interview_confirmed_on exists and is valid
          if (!parsedData.interview_confirmed_on) {
            console.error('interview_confirmed_on is missing or null');
            return;
          }
          
          const formattedDateTime = parsedData.interview_confirmed_on;
          console.log('Formatted datetime n confirm:', formattedDateTime, hasConfirmed.current);
          
          const invitePayload = {
            to_email: parsedData.interview_options.invite_emails,
            to_name: parsedData.interview_options.candidate_name,
            cc_email: process.env.REACT_APP_SENDMAIL_CC,
            subject: "Interview Confirmed - " + parsedData.interview_options.candidate_name,
            event_summary: "Interview with " + parsedData.interview_options.candidate_name,
            event_datetime: formattedDateTime,
            event_duration_hours: 1
          };

          if (process.env.REACT_APP_SENDMAIL_TEST) {
            invitePayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
            console.log('test calendar invite');
          }
          console.log('Invite payload:', invitePayload);
          const calendarResponse = await axios.post(
            `${process.env.REACT_APP_RYZ_SENDMAIL}/send_invite`,
            invitePayload,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          console.log('Calendar response:', calendarResponse);
          if (calendarResponse.data.status === "success") {
              console.log('calendar invite sent');
              const interview_options = parsedData.interview_options;
              interview_options.event_id = calendarResponse.data.event_id;
              interview_options.meet_link = calendarResponse.data.meet_link;
              // Update just the interview_options field for this submit_cv_role_id
              try {
                await axios.put(
                  `${process.env.REACT_APP_RYZ_SERVER}/update_interview_options/${parsedData.interview_options.submit_cvrole_id}`,
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
        } else if (parsedData.status === "alternate_requested") {
          // For alternate timeslot requests, we need to send an email to the team
          // We'll need to get the candidate info from the interview_options if available
          if (parsedData.interview_options && parsedData.interview_options.candidate_name) {
            const emailPayload = {
              to_email: parsedData.interview_options.candidate_email,
              to_name: parsedData.interview_options.candidate_name,
              cc_email: process.env.REACT_APP_SENDMAIL_CC,
              subject: "Please find mutually agreeable interview timeslot with candidate "+parsedData.interview_options.candidate_name,
              content: "Please confirm mutually agreeable interview timeslot with candidate "+parsedData.interview_options.candidate_name+" at the earliest.\n\nThanks,\nRayze AI",
              from_email: process.env.REACT_APP_SENDMAIL_FROM
            };
            if (process.env.REACT_APP_SENDMAIL_TEST) {
              emailPayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
              // console.log('test email done')
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
