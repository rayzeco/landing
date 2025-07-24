import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ConfirmInterview-page.scss';

const ConfirmInterviewPage = () => {
  const [htmlString, setHtmlString] = useState('');
  const { interview_id } = useParams();
  const location = useLocation();
  const hasConfirmed = useRef(false);

  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  };

  const query = useQuery();
  const slot = query.get('slot');

  useEffect(() => {
    const confirmTimeslot = async () => {
      if (hasConfirmed.current) {
        console.log('confirmTimeslot already called, skipping...');
        return;
      }

      hasConfirmed.current = true;

      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_RYZ_SERVER}/confirm_timeslot/${interview_id}`,
          {
            headers: {
              'Content-Type': 'application/json', // Fixed Content-Type
              Authorization: `Bearer ${token}`,
            },
            params: { slot },
          }
        );

        const responseData = response.data;
        console.log('responseData:', responseData);

        let htmlContent = '';

        if (responseData.status === 'already_confirmed') {
          htmlContent = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Interview already confirmed, skipping...</h2></div>';
        } else if (responseData.status === 'alternate_requested') {
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
        } else if (responseData.status === 'confirmed') {
          const parsedData = {
            status: responseData.status,
            interview_confirmed_on: responseData.interview_confirmed_on,
            interview_confirmed_on_date: responseData.interview_confirmed_on_date,
            interview_confirmed_on_time: responseData.interview_confirmed_on_time,
            interview_options: responseData.interview_options,
          };

          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; text-align: center;">Interview Timeslot Confirmed</h2>
              <p style="font-size: 16px; line-height: 1.5; text-align: center;">
                Your interview has been scheduled for<br>
                <strong>Date: ${parsedData.interview_confirmed_on_date}</strong><br>
                <strong>Time: ${parsedData.interview_confirmed_on_time}</strong>
              </p>
              <p style="font-size: 14px; color: #666; text-align: center;">
                We look forward to speaking with you at the scheduled time.
              </p>
            </div>
          `;
        } else {
          htmlContent = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Unknown response status</h2></div>';
        }

        console.log('htmlContent:', htmlContent);
        setHtmlString(htmlContent);

        // Handle calendar invite and other logic as in your original code
        if (responseData.status === 'confirmed') {
          const parsedData = {
            status: responseData.status,
            interview_confirmed_on: responseData.interview_confirmed_on,
            interview_confirmed_on_date: responseData.interview_confirmed_on_date,
            interview_confirmed_on_time: responseData.interview_confirmed_on_time,
            interview_options: responseData.interview_options,
          };

          if (!parsedData.interview_confirmed_on) {
            console.error('interview_confirmed_on is missing or null');
            return;
          }

          const invitePayload = {
            to_email: parsedData.interview_options.invite_emails,
            to_name: parsedData.interview_options.candidate_name,
            cc_email: process.env.REACT_APP_SENDMAIL_CC,
            subject: `Interview Confirmed - ${parsedData.interview_options.candidate_name}`,
            event_summary: `Interview with ${parsedData.interview_options.candidate_name}`,
            event_datetime: parsedData.interview_confirmed_on,
            event_duration_hours: 1,
          };

          if (process.env.REACT_APP_SENDMAIL_TEST) {
            invitePayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
          }

          const calendarResponse = await axios.post(
            `${process.env.REACT_APP_RYZ_SENDMAIL}/send_invite`,
            invitePayload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (calendarResponse.data.status === 'success') {
            const interview_options = parsedData.interview_options;
            interview_options.event_id = calendarResponse.data.event_id;
            interview_options.meet_link = calendarResponse.data.meet_link;

            await axios.put(
              `${process.env.REACT_APP_RYZ_SERVER}/update_interview_options/${parsedData.interview_options.submit_cvrole_id}`,
              {
                interview_options: JSON.stringify(interview_options),
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Updated interview options with calendar details');
          }
        }
      } catch (error) {
        console.error('Error confirming timeslot:', error);
        setHtmlString('<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2 style="color: #333;">Error loading interview details</h2></div>');
      }
    };

    confirmTimeslot();
  }, [interview_id, slot]);
  console.log('htmlString is', htmlString);
  return (
    // <div>
    //   {htmlString ? (
    //     <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    //   ) : (
    //     <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
    //       <h2>Loading...</h2>
    //     </div>
    //   )}
    // </div>
    <div dangerouslySetInnerHTML={{ __html: htmlString || '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;"><h2>Loading...</h2></div>' }} />
  );
};

export default ConfirmInterviewPage;