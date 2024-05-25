import React, { useState, useEffect } from 'react';
import './invoice-page.scss'; // Import CSS file for styling
import axios from 'axios';

const InvoicePage = ({ clientName }) => {
  // State for invoice date, client, start period, end period, and invoice table data
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substr(0, 10));
  const [selectedClient, setSelectedClient] = useState('All');
  const [startPeriod, setStartPeriod] = useState(getFirstBusinessDayOfMonth());
  const [endPeriod, setEndPeriod] = useState(getLastBusinessDayOfMonth());
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true); // State to control Submit button disablement
  let recTotal = 0;
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

  // Function to fetch data from the REST API endpoint and return formatted data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/get_client_transactions/2');
        const data = response.data;
        const formattedData = data.map(item => ({
          inv_date: invoiceDate,
          candidate_id: item[1],
          period_start: startPeriod,
          period_end: endPeriod,
          txn_id: item[0],
          hours_worked: 160,
          inv_value: 0,
          inv_status: 'NEW',
          client: item[2],
          candidate: item[3],
          recruiter_price: item[4],
          client_price: item[5],
          recruiter_total: item[4]*160,
          client_total: item[5]*160
        }));
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
    setInvoiceTableData(newData);
  };

  // Function to submit the invoice
  const handleSubmitInvoice = () => {
    // Call the submitInvoice REST API with invoice data
    console.log('Invoice submitted:', invoiceTableData);
  };

  // Function to save invoice changes
  // Implement the saveInvoice function
  const saveInvoice = async () => {
    try {
      //console.log(invoiceTableData);

      let recruiterTotal = 0;
      let clientTotal = 0;

      for (const invoice of invoiceTableData) {
        invoice.recruiterTotal = invoice.recruiter_price * invoice.hours_worked;
        invoice.clientTotal = invoice.client_price * invoice.hours_worked;
        recruiterTotal += invoice.recruiterTotal;
        clientTotal += invoice.clientTotal;
        if (clientTotal < recruiterTotal) {
          throw new Error('Client total is less than recruiter total');
        }
        invoice.recruiterTotal = recruiterTotal;
        invoice.clientTotal = clientTotal;
        invoice.inv_status = "SAVED";
        await axios.post('http://localhost:8000/new_invoice', invoice);
      }
      recTotal = recruiterTotal;
      console.log('Invoices saved successfully! ', recTotal);
      // Now that the invoices are saved, enable the Submit button
      setSubmitDisabled(false);
      //recTotal = recruiterTotal;
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
            <option value="Sodexo">Sodexo</option>
            <option value="InKind">InKind</option>
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
              <th>Candidate</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoiceTableData.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.client}</td>
                <td>{invoice.candidate}</td>
                <td>
                  <input
                    type="number"
                    value={invoice.hours_worked}
                    onChange={(e) => handleHoursChange(index, e)}
                  />
                </td>
                <td>{invoice.inv_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel panel-3">
        <div>
          <button onClick={saveInvoice}>Save</button>
          <button onClick={handleSubmitInvoice} disabled={submitDisabled} className={submitDisabled ? "submit-button-disabled" : "submit-button-enabled"}>Submit</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
