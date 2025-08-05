import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './work-order-page.scss';

const WorkOrderPage = () => {
  const [htmlString, setHtmlString] = useState('');
  const [error, setError] = useState('');
  const { workOrderId } = useParams();

  useEffect(() => {
    try {
      // Try to get the work order HTML from sessionStorage
      const workOrderHtml = sessionStorage.getItem(`workOrder_${workOrderId}`);
      
      if (workOrderHtml) {
        setHtmlString(workOrderHtml);
      } else {
        setError('Work order not found or has expired. Please request a new link.');
      }
    } catch (error) {
      console.error('Error loading work order:', error);
      setError('Error loading work order. Please try again.');
    }
  }, [workOrderId]);

  if (error) {
    return (
      <div className="work-order-error">
        <div className="error-container">
          <h2>Work Order Unavailable</h2>
          <p>{error}</p>
          <p>Please contact the sender for a new link.</p>
        </div>
      </div>
    );
  }

  if (!htmlString) {
    return (
      <div className="work-order-loading">
        <div className="loading-container">
          <h2>Loading Work Order...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="work-order-page">
      <div className="work-order-content" dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

export default WorkOrderPage;