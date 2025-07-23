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
        // Parse the JSON string to extract the HTML content
        //const htmlData = JSON.parse(response.data.html);
        const htmlData = response.data;

        //console.log("htmlData is", htmlData, response.headers['x-response-data']);
        //console.log("response is", response.data);
        // Decode the HTML string to handle escaped Unicode characters
        // const decodedHtml = htmlData.html.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
        //   return String.fromCharCode(parseInt(hex, 16));
        // });
        // console.log(decodedHtml, response.data.html, htmlData);
        setHtmlString(htmlData);
        if (htmlData.includes("already confirmed")) {
          console.log('Interview already confirmed, skipping...');
          setHtmlString('<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Interview already confirmed, skipping...</h2></div>');
          return;
        }
        
                // Extract response data from embedded div with individual attributes
        const responseDataDiv = htmlData.match(/<div id="response-data" status="([^"]*)" interview_confirmed_on="([^"]*)" interview_options="([^"]*)"[^>]*>/);
        console.log('Response data div match:', responseDataDiv);
        let parsedData = {};
        if (responseDataDiv && responseDataDiv.length >= 4) {
          try {
            // Extract individual attributes
            const status = responseDataDiv[1];
            const interview_confirmed_on = responseDataDiv[2];
            const interview_options_str = responseDataDiv[3];
            
            console.log('Raw interview_options_str:', interview_options_str);
            
            // Decode HTML entities in interview_options
            const decodedInterviewOptions = interview_options_str
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&#39;/g, "'")
              .replace(/&#x27;/g, "'")
              .replace(/&#x2F;/g, '/');
            
            console.log('Decoded interview_options:', decodedInterviewOptions);
            
            // Try to parse the interview_options JSON
            let interview_options;
            try {
              interview_options = JSON.parse(decodedInterviewOptions);
            } catch (jsonErr) {
              console.error('JSON parse error:', jsonErr);
              console.error('Failed to parse:', decodedInterviewOptions);
              // If JSON parsing fails, try to create a basic object
              interview_options = {
                candidate_name: "Unknown",
                candidate_email: "unknown@example.com",
                submit_cvrole_id: 0
              };
            }
            
            parsedData = {
              status: status,
              interview_confirmed_on: interview_confirmed_on,
              interview_options: interview_options
            };
            
            console.log('Parsed response data:', parsedData);
            
            // Add the parsed values to the response data object
            
            
            //console.log('Updated response data:', response.data);
          } catch (err) {
            console.error('Error parsing embedded response data:', err);
            console.error('Raw responseData div:', responseDataDiv);
          }
        } else {
          console.log('No embedded response data found in HTML');
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
        } else if (parsedData.status === "requested") {
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
