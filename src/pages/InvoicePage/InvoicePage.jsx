import React, { useState, useEffect } from 'react';
import './invoice-page.scss'; // Import CSS file for styling
import axios from 'axios';
require('dotenv').config();


const InvoicePage = () => {

  // State for invoice date, client, start period, end period, and invoice table data
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substr(0, 10));
  const [selectedClient, setSelectedClient] = useState('All');
  const [startPeriod, setStartPeriod] = useState(getFirstBusinessDayOfMonth());
  const [endPeriod, setEndPeriod] = useState(getLastBusinessDayOfMonth());
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true); // State to control Submit button disablement
  const [recTotal, setRecTotal] = useState(0);
  const [invoiceStatus, setInvoiceStatus] = useState('INITIALIZED');



  // Function to get the first business day of the month
  function getFirstBusinessDayOfMonth() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startPeriodDate = new Date(firstDayOfMonth);
    while (startPeriodDate.getDay() === 0 || startPeriodDate.getDay() === 6) {
      startPeriodDate.setDate(startPeriodDate.getDate() + 1);
    }
    return startPeriodDate.toISOString().substr(0, 10);
  }

  // Function to get the last business day of the month
  function getLastBusinessDayOfMonth() {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const endPeriodDate = new Date(lastDayOfMonth);
    while (endPeriodDate.getDay() === 0 || endPeriodDate.getDay() === 6) {
      endPeriodDate.setDate(endPeriodDate.getDate() - 1);
    }
    return endPeriodDate.toISOString().substr(0, 10);
  }

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

    // const formatNumber = (num) => {
    // // Check if num is a valid number
    // if (isNaN(num)) {
    //     throw new Error('Invalid input: not a number');
    // }
    
    // // Convert num to a number if it's not already
    // num = Number(num);

    // // Format the number with commas as thousand separators
    // return num.toLocaleString();
    // };

  // Function to fetch data from the REST API endpoint and return formatted data
  useEffect(() => {
    async function fetchData() {
      try {
        //const jsvar = JSON.stringify(process.env.REACT_APP_RYZ_SERVER)
        //console.log('url is ', jsvar, `${process.env.REACT_APP_RYZ_SERVER}/get_client_transactions/2`);
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        const response = await axios.get(`${process.env.REACT_APP_RYZ_SERVER}/get_client_transactions/2`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          });
        //console.log('getClientTran:\n', response.data)
        const data = response.data;
        const formattedData = data.map(item => ({
          inv_date: invoiceDate,
          candidate_id: item.candidate_id, // Adjust based on actual field names
          period_start: startPeriod,
          period_end: endPeriod,
          txn_id: parseInt(item.txn_id, 10), // Adjust based on actual field names
          hours_worked: 160, // Default value, adjust as needed
          inv_value: 0,    // Default value, adjust as needed
          inv_status: 'NEW', // Default status
          client: item.client_name, // Adjust based on actual field names
          candidate: item.candidate_name, // Adjust based on actual field names
          project_name: item.project_name === 'NULL' ? '' : item.project_name, // Add project_name field
          recruiter_price: item.recruiter_price, // Adjust based on actual field names
          client_price: item.client_price, // Adjust based on actual field names
          recruiter_total: item.recruiter_price, // Adjust based on actual field names
          client_total: item.client_price, // Adjust based on actual field names
          client_contact: item.client_contact, // Adjust based on actual field names
          client_email: item.client_email, // Adjust based on actual field names
          client_addr: item.client_addr, // Adjust based on actual field names
          client_phone: item.client_phone, // Adjust based on actual field names
          client_id: item.client_id // Adjust based on actual field names
        }));
        //console.log('formatClientTran:\n', formattedData)
        setInvoiceTableData(formattedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Function to handle changes in the invoice date
  const handleInvoiceDateChange = (e) => {
    setInvoiceDate(e.target.value);
  };

  // Function to handle changes in the client dropdown
  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  // Function to handle changes in the start period
  const handleStartPeriodChange = (e) => {
    setStartPeriod(e.target.value);
  };

  // Function to handle changes in the end period
  const handleEndPeriodChange = (e) => {
    setEndPeriod(e.target.value);
  };

  // Function to handle changes in the hours in the invoice table
  const handleHoursChange = (index, e) => {
    const newData = [...invoiceTableData];
    newData[index].hours_worked = parseFloat(e.target.value);
    let rTotal=0;
    for (const invoice of newData) {
      rTotal += invoice.recruiter_price* invoice.hours_worked;
    }
    const rTotal_str = formatNumber(rTotal);
    console.log('recTotal is ',rTotal_str);
    setRecTotal(rTotal_str);
    setInvoiceTableData(newData);
  };

  const submitInvoice = async () => {
    try {
      // Step 1: Group the invoice table data by client and project_name combination
      const clientProjectGroups = {};
      invoiceTableData.forEach(invoice => {
        const groupKey = `${invoice.client}_${invoice.project_name || 'No Project'}`;
        if (!clientProjectGroups[groupKey]) {
          clientProjectGroups[groupKey] = [];
        }
        clientProjectGroups[groupKey].push(invoice);
      });

      // Step 2: Iterate through each client-project group and submit the invoice
      for (const groupKey in clientProjectGroups) {
        const clientProjectInvoices = clientProjectGroups[groupKey];
        //console.log("client-project invoices ", clientProjectInvoices);

        const due_date = new Date(new Date(clientProjectInvoices[0].period_end).setMonth(new Date(clientProjectInvoices[0].period_end).getMonth() + 1)).toISOString().split('T')[0];
        let totalClientPrice = 0;
        let explainStr = "";
        for (let i = 0; i < clientProjectInvoices.length; i++) {
          totalClientPrice += clientProjectInvoices[i].client_price * clientProjectInvoices[i].hours_worked;
          //explainStr += clientProjectInvoices[i].candidate + " ($" + clientProjectInvoices[i].client_price + "/hr x " + clientProjectInvoices[i].hours_worked + " =  $" + clientProjectInvoices[i].client_price * clientProjectInvoices[i].hours_worked + " <br>";
          if (clientProjectInvoices[i].hours_worked > 0) {
            explainStr += `<tr><td>${clientProjectInvoices[i].candidate}</td><td>${clientProjectInvoices[i].project_name || 'Technology Services'}</td><td>${clientProjectInvoices[i].hours_worked}</td><td>${formatNumber(clientProjectInvoices[i].client_price)}</td><td>${formatNumber(clientProjectInvoices[i].client_price * clientProjectInvoices[i].hours_worked)}</td></tr>`;
          }
          //console.log('debug: totalprice ', totalClientPrice, explainStr);
        }
        //console.log('final explain : ',explainStr);

        const invoicesData = {
          inv_date: invoiceDate,
          due_date: due_date,
          period_start: startPeriod,
          period_end: endPeriod,
          client_id: clientProjectInvoices[0].client_id,
          client_name: clientProjectInvoices[0].client,
          client_contact: clientProjectInvoices[0].client_contact,
          client_email: clientProjectInvoices[0].client_email,
          client_addr: clientProjectInvoices[0].client_addr,
          client_phone: clientProjectInvoices[0].client_phone,
          explain_str: explainStr,
          inv_html: '',
          inv_hash: '',
          inv_value: totalClientPrice,
          inv_status: "SUBMITTED"
        }
        //console.log("invoice data ", invoicesData);
        // Call the REST API function to submit the invoice for this client-project combination
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        const response = await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/submit_client_invoice`, invoicesData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });

        if (response.status === 200) {
          setInvoiceStatus('SUBMITTED');
          console.log(`Invoice(s) submitted successfully for client: ${clientProjectInvoices[0].client}, project: ${clientProjectInvoices[0].project_name || 'No Project'}`);
          //console.log(response.data);
          // Optionally, you can add further actions here, such as showing a success message to the user
        } else {
          console.error(`Failed to submit invoice(s) for client: ${clientProjectInvoices[0].client}, project: ${clientProjectInvoices[0].project_name || 'No Project'}`);
          // Optionally, handle the error case
        }
      }
    } catch (error) {
      console.error('Error submitting invoice(s):', error);
    }
  };


  // Function to save invoice changes
  // Implement the saveInvoice function
  const saveInvoice = async () => {
    try {
      let recruiterTotal = 0;
      let clientTotal = 0;
  
      for (const invoice of invoiceTableData) {
        const recruiterPriceTotal = invoice.recruiter_price * invoice.hours_worked;
        const clientPriceTotal = invoice.client_price * invoice.hours_worked;
        recruiterTotal += recruiterPriceTotal;
        clientTotal += clientPriceTotal;
  
        if (clientTotal < recruiterTotal) {
          throw new Error('Client total is less than recruiter total');
        }
  
        const newInvoice = {
          inv_date: invoiceDate,  // Use the invoiceDate from UI state
          candidate_id: invoice.candidate_id,
          period_start: startPeriod,
          period_end: endPeriod,
          txn_id: invoice.txn_id,
          hours_worked: invoice.hours_worked,
          inv_value: invoice.inv_value,  // Provide a default value if inv_value is not available
          inv_status: "SAVED",
        };
        //console.log('newInvoice ', newInvoice);
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        const response = await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/new_invoice`, newInvoice, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });
  
      }
  
      console.log('Invoices saved successfully! ', { recruiterTotal, clientTotal });
      setInvoiceStatus('SAVED')
      setSubmitDisabled(false);
      return [recruiterTotal, clientTotal];
    } catch (error) {
      console.error('Error saving invoices:', error);
    }
  };
  

  // Function to filter invoice table data based on selected client
  const filteredInvoiceTableData = selectedClient === 'All' ? invoiceTableData :
    invoiceTableData.filter(invoice => invoice.client === selectedClient);

  return (
    <div className="invoice-container">
      <div className="panel panel-1">
        <h2>Enter Invoice Details</h2>
        <div>
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input
            type="date"
            id="invoiceDate"
            value={invoiceDate}
            onChange={handleInvoiceDateChange}
          />
        </div>
        <div>
          <label htmlFor="client">Client:</label>
          <select id="client" value={selectedClient} onChange={handleClientChange}>
            <option value="All">All</option>
          </select>
        </div>
        <div>
          <label htmlFor="startPeriod">Start Period:</label>
          <input
            type="date"
            id="startPeriod"
            value={startPeriod}
            onChange={handleStartPeriodChange}
          />
        </div>
        <div>
          <label htmlFor="endPeriod">End Period:</label>
          <input
            type="date"
            id="endPeriod"
            value={endPeriod}
            onChange={handleEndPeriodChange}
          />
        </div>
      </div>
      <div className="panel panel-2">
        <h2>Enter Candidate Hours</h2>
        <h3>Total: {recTotal} USD</h3>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Project</th>
              <th>Candidate</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoiceTableData.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.client}</td>
                <td>{invoice.project_name && invoice.project_name !== 'NULL' ? invoice.project_name : ''}</td>
                <td>{invoice.candidate}</td>
                <td>
                  <input
                    type="number"
                    value={invoice.hours_worked}
                    onChange={(e) => handleHoursChange(index, e)}
                  />
                </td>
                <td>{formatNumber(invoice.recruiter_price)}</td>
                <td>{formatNumber(invoice.recruiter_price*invoice.hours_worked)}</td>
                <td>{invoice.inv_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel panel-3">
        <div>
          <button onClick={saveInvoice}>Save</button>
          <button onClick={submitInvoice} disabled={submitDisabled} className={submitDisabled ? "submit-button-disabled" : "submit-button-enabled"}>Submit</button>
          <button>Cancel</button>
          <h2>  </h2>
          <h3> {invoiceStatus}</h3>
          
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
