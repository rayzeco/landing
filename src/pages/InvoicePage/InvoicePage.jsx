import React, { useState, useEffect } from 'react';
import './invoice-page.scss'; // Import CSS file for styling
import axios from 'axios';

const InvoicePage = ({ clientName }) => {

  // Define your Square API access token
const accessToken = 'YOUR_SQUARE_ACCESS_TOKEN';
const squareBaseUrl = 'https://connect.squareupsandbox.com/v2';


  // State for invoice date, client, start period, end period, and invoice table data
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substr(0, 10));
  const [selectedClient, setSelectedClient] = useState('All');
  const [startPeriod, setStartPeriod] = useState(getFirstBusinessDayOfMonth());
  const [endPeriod, setEndPeriod] = useState(getLastBusinessDayOfMonth());
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true); // State to control Submit button disablement
  const [recTotal, setRecTotal] = useState(0);


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
          hours_worked: 0,
          inv_value: 0,
          inv_status: 'NEW',
          client: item[2],
          candidate: item[3],
          recruiter_price: item[4],
          client_price: item[5],
          recruiter_total: item[4],
          client_total: item[5],
          client_contact: item[6],
          client_email: item[7],
          client_addr: item[8],
          client_phone: item[9],
          client_id: item[10]
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
      // Step 1: Group the invoice table data by client
      const clientGroups = {};
      invoiceTableData.forEach(invoice => {
        if (!clientGroups[invoice.client]) {
          clientGroups[invoice.client] = [];
        }
        clientGroups[invoice.client].push(invoice);
      });

      // Step 2: Iterate through each client group and submit the invoice
      for (const client in clientGroups) {
        const clientInvoices = clientGroups[client];
        console.log("client invocies ",clientInvoices);

        const due_date = new Date(new Date(clientInvoices[0].period_end).setMonth(new Date(clientInvoices[0].period_end).getMonth() + 1)).toISOString().split('T')[0];
        let totalClientPrice = 0;
        let explainStr = "";
        for (let i = 0; i < clientInvoices.length; i++) {
          totalClientPrice += clientInvoices[i].client_price * clientInvoices[i].hours_worked;
          //explainStr += clientInvoices[i].candidate + " ($" + clientInvoices[i].client_price + "/hr x " + clientInvoices[i].hours_worked + " =  $" + clientInvoices[i].client_price * clientInvoices[i].hours_worked + " <br>";
          explainStr += `<tr><td>${clientInvoices[i].candidate}</td><td>Technology Services</td><td>${clientInvoices[i].hours_worked}</td><td>${formatNumber(clientInvoices[i].client_price)}</td><td>${formatNumber(clientInvoices[i].client_price * clientInvoices[i].hours_worked)}</td></tr>`;
        }
        console.log('final explain : ',explainStr);

        const invoicesData = {
          inv_date: clientInvoices[0].inv_date,
          due_date: due_date,
          period_start: clientInvoices[0].period_start,
          period_end: clientInvoices[0].period_end,
          client_id: clientInvoices[0].client_id,
          client_name: clientInvoices[0].client,
          client_contact: clientInvoices[0].client_contact,
          client_email: clientInvoices[0].client_email,
          client_addr: clientInvoices[0].client_addr,
          client_phone: clientInvoices[0].client_phone,
          explain_str: explainStr,
          inv_html: '',
          inv_hash: '',
          inv_value: totalClientPrice,
          inv_status: "SUBMITTED"
        }
        console.log("invoice data ", invoicesData);
        // Call the REST API function to submit the invoice for this client
        const response = await axios.post('http://localhost:8000/submit_client_invoice', invoicesData);

        if (response.status === 200) {
          console.log(`Invoice(s) submitted successfully for client: ${client}`);
          console.log(response.data);
          // Optionally, you can add further actions here, such as showing a success message to the user
        } else {
          console.error(`Failed to submit invoice(s) for client: ${client}`);
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
        console.log('invoice is ',invoice);
      }
      //recTotal = recruiterTotal;
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
              <th>Rate</th>
              <th>Amount</th>
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
        </div>
      </div>
    </div>
  );

  // Define a function to create and send a new invoice for a single item
  const createAndSendInvoice = async (invoice) => {
    try {
      // Prepare the request data for creating an invoice
      const requestData = {
        idempotency_key: Math.random().toString(36).substring(7), // Generate a unique idempotency key
        invoice: {
          idempotency_key: Math.random().toString(36).substring(7),
          primary_recipient: {
            customer_id: invoice.customer_id, // Assuming you have a customer ID associated with the invoice
          },
          title: 'Invoice Title', // Replace with your invoice title
          description: 'Invoice Description', // Replace with your invoice description
          requested_money: {
            amount: invoice.inv_value * 100, // Square API expects amount in cents, so multiply by 100
            currency_code: 'USD', // Replace with your currency code if different
          },
        },
      };

      // Make a POST request to create the invoice using the Square API
      const response = await axios.post(`${squareBaseUrl}/invoices`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle the response and retrieve the created invoice ID
      const invoiceId = response.data.invoice.id;

      // Optionally, you can send the invoice via email
      await sendInvoiceByEmail(invoiceId);

      console.log('Invoice created and sent:', invoiceId);
    } catch (error) {
      console.error('Error creating and sending invoice:', error.response.data);
    }
  };

  // Define a function to send the created invoice via email
  const sendInvoiceByEmail = async (invoiceId) => {
    try {
      // Prepare the request data for sending the invoice via email
      const requestData = {
        invoice_id: invoiceId,
        to: 'recipient@example.com', // Replace with the recipient's email address
        subject: 'Invoice Subject', // Replace with your email subject
        body: 'Invoice Body', // Replace with your email body
      };

      // Make a POST request to send the invoice via email using the Square API
      await axios.post(`${squareBaseUrl}/invoices/${invoiceId}/send`, requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Invoice sent via email:', invoiceId);
    } catch (error) {
      console.error('Error sending invoice via email:', error.response.data);
    }
  };
};

export default InvoicePage;
