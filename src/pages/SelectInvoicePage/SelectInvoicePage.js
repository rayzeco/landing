import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './select-invoice-page.scss'; // Assuming the styling is similar to InvoicePage

const SelectInvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);
    const [invoiceBreakdown, setInvoiceBreakdown] = useState([]);
    const [isLoadingBreakdown, setIsLoadingBreakdown] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [emailAddress, setEmailAddress] = useState('');
    const [invoiceHtml, setInvoiceHtml] = useState('');
    const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    
    // New payment form states
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        
        // Fetch main invoices
        axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_client_invoices`,
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          })
            .then(response => {
                setInvoices(response.data);
                
                // Get unique clients from invoices array after invoices are loaded
                const uniqueClients = Array.from(new Set(response.data.map(invoice => 
                    `${invoice.client_name}_${invoice.project_name}`)))
                    .map(combinedKey => {
                        const [clientName, projectName] = combinedKey.split('_');
                        // Find first invoice for this client+project combination
                        const invoice = response.data.find(inv => 
                            inv.client_name === clientName && 
                            inv.project_name === projectName
                        );
                        return {
                            id: invoice.client_id || invoice.id, // fallback to invoice id if client_id doesn't exist
                            name: invoice.client_name,
                            project: invoice.project_name
                        };
                    });
                setClients(uniqueClients);
            })
            .catch(error => {
                console.error('There was an error fetching the invoices!', error);
            });

        // Prevent swipe navigation
        const preventSwipeNavigation = (e) => {
            if (e.touches && e.touches.length > 1) return;
            
            // Prevent horizontal swipe gestures from triggering browser navigation
            const target = e.target.closest('.select-invoice-container');
            if (target && Math.abs(e.deltaX || 0) > Math.abs(e.deltaY || 0)) {
                e.preventDefault();
            }
        };

        const preventTouchMove = (e) => {
            // Only prevent if it's a horizontal swipe on our container
            if (e.target.closest('.select-invoice-container')) {
                const touch = e.touches[0];
                if (touch) {
                    // Allow vertical scrolling but prevent horizontal swiping
                    const element = e.target.closest('.select-invoice-container');
                    if (element && !element.contains(e.target.closest('.breakdown-table-wrapper'))) {
                        // This helps prevent accidental navigation
                        if (Math.abs(e.touches[0].clientX - (e.touches[0].pageX || 0)) > 10) {
                            e.preventDefault();
                        }
                    }
                }
            }
        };

        // Add event listeners
        document.addEventListener('touchstart', preventSwipeNavigation, { passive: false });
        document.addEventListener('touchmove', preventTouchMove, { passive: false });
        document.addEventListener('wheel', preventSwipeNavigation, { passive: false });

        return () => {
            document.removeEventListener('touchstart', preventSwipeNavigation);
            document.removeEventListener('touchmove', preventTouchMove);
            document.removeEventListener('wheel', preventSwipeNavigation);
        };
    }, []);

    const handleSendEmail = async (invoice) => {
        setSelectedInvoice(invoice);
        setIsLoadingInvoice(true);
        
        // Set default email to client's email if available
        setEmailAddress(invoice.client_email || '');
        
        try {
            // Fetch the invoice HTML
            const token = sessionStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_RYZ_SERVER}/get_invoice/${invoice.inv_hash}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setInvoiceHtml(response.data.html);
            setShowEmailModal(true);
        } catch (error) {
            console.error('Error fetching invoice HTML:', error);
            alert('Failed to load invoice. Please try again.');
        } finally {
            setIsLoadingInvoice(false);
        }
    };

    const handleCloseModal = () => {
        setShowEmailModal(false);
        setSelectedInvoice(null);
        setInvoiceHtml('');
    };

    const handleSendEmailSubmit = async () => {
        if (!emailAddress.trim()) {
            alert('Please enter an email address');
            return;
        }

        setIsSendingEmail(true);
        
        try {
            const emailPayload = {
                to_email: emailAddress,
                to_name: selectedInvoice.client_name,
                subject: `Invoice #${selectedInvoice.id} from Rayze`,
                content: invoiceHtml,
                from_email: process.env.REACT_APP_SENDMAIL_FROM || 'noreply@rayze.com',
                cc_email: process.env.REACT_APP_SENDMAIL_CC_CLIENT || 'jc@rayze.xyz'
            };

            // Check for test email override
            if (process.env.REACT_APP_SENDMAIL_TEST) {
                emailPayload.to_email = process.env.REACT_APP_SENDMAIL_TEST;
                console.log('test email done');
            }

            console.log('Email payload being sent:', {
                ...emailPayload,
                content: emailPayload.content ? `[HTML content - ${emailPayload.content.length} chars]` : 'No content'
            });

            const emailResponse = await axios.post(
                `${process.env.REACT_APP_RYZ_SENDMAIL}/send_html_email`,
                emailPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Email sent successfully:', emailResponse.data);
            
            // Update invoice status to SENT after successful email send
            if (selectedInvoice.inv_status === 'READY') {
                try {
                    const token = sessionStorage.getItem('token');
                    await axios.put(
                        `${process.env.REACT_APP_RYZ_SERVER}/update_client_invoice/${selectedInvoice.id}`,
                        { inv_status: 'SENT' },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    
                    // Update local state
                    setInvoices(invoices.map(invoice => 
                        invoice.id === selectedInvoice.id 
                            ? { ...invoice, inv_status: 'SENT' }
                            : invoice
                    ));
                } catch (statusError) {
                    console.error('Error updating invoice status:', statusError);
                    // Don't show error to user since email was sent successfully
                }
            }
            
            alert('Invoice email sent successfully!');
            handleCloseModal();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setIsSendingEmail(false);
        }
    };


    const fetchInvoiceBreakdown = async (clientInvoice) => {
        setIsLoadingBreakdown(true);
        
        try {
            const token = sessionStorage.getItem('token');
            
            // Parse the comma-separated invoice IDs from invoice_link
            const invoiceIds = clientInvoice.invoice_link
                ? clientInvoice.invoice_link.split(',').map(id => id.trim()).filter(id => id)
                : [];
            
            if (invoiceIds.length === 0) {
                setInvoiceBreakdown([]);
                setIsLoadingBreakdown(false);
                return;
            }
            
            // Fetch breakdown details for each invoice ID
            const breakdownPromises = invoiceIds.map(invoiceId =>
                axios.get(`${process.env.REACT_APP_RYZ_SERVER}/invoice_breakdown/${invoiceId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
            );
            
            const responses = await Promise.all(breakdownPromises);
            const breakdownData = responses.map(response => ({
                ...response.data,
                clientInvoiceStatus: clientInvoice.inv_status // Add client invoice status to each breakdown item
            })).flat();
            
            setInvoiceBreakdown(breakdownData);
        } catch (error) {
            console.error('Error fetching invoice breakdown:', error);
            setInvoiceBreakdown([]);
        } finally {
            setIsLoadingBreakdown(false);
        }
    };

    const handleRowClick = (invoice) => {
        // Toggle the expanded state
        if (expandedInvoiceId === invoice.id) {
            // If clicking the same row, collapse it
            setExpandedInvoiceId(null);
            setInvoiceBreakdown([]);
        } else {
            // Expand this row and fetch breakdown data
            setExpandedInvoiceId(invoice.id);
            fetchInvoiceBreakdown(invoice);
        }
    };

    // Helper function to find subset sum combinations, prioritizing single rows first
    const findSubsetSum = (arr, targetSum) => {
        const n = arr.length;
        const combinations = [];
        
        // First, check for single-row exact matches (prioritize first occurrence)
        for (let j = 0; j < n; j++) {
            if (Math.abs(arr[j].amount - targetSum) < 0.01) {
                // Found a single row match - return immediately with just this one
                return [[arr[j]]];
            }
        }
        
        // If no single row match found, then look for multi-row combinations
        // Generate all possible combinations (2^n) starting from 2-item combinations
        for (let i = 2; i < (1 << n); i++) {
            const combination = [];
            let sum = 0;
            
            for (let j = 0; j < n; j++) {
                if (i & (1 << j)) {
                    combination.push(arr[j]);
                    sum += arr[j].amount;
                }
            }
            
            // Check if this combination sums to target (with small tolerance for floating point)
            if (Math.abs(sum - targetSum) < 0.01) {
                combinations.push(combination);
            }
        }
        
        // Sort combinations by size (prefer fewer invoices)
        combinations.sort((a, b) => a.length - b.length);
        
        return combinations;
    };

    const handlePaymentAction = async (action) => {
        if (!selectedClientId) {
            alert('Please select a client');
            return;
        }
        
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setIsProcessingPayment(true);
        
        try {
            const targetAmount = parseFloat(paymentAmount);
            
            // Find the selected client name
            const selectedClient = clients.find(client => client.id == selectedClientId);
            if (!selectedClient) {
                alert('Selected client not found');
                return;
            }
            
            // Filter invoices for the selected client
            const clientInvoices = invoices.filter(invoice => 
                invoice.client_name === selectedClient.name && 
                (action === 'received' ? 
                    (invoice.inv_status === 'READY' || invoice.inv_status === 'SENT') :
                    invoice.inv_status === 'PAID'
                )
            );
            
            if (clientInvoices.length === 0) {
                alert(`No eligible invoices found for ${selectedClient.name} with status ${action === 'received' ? 'READY/SENT' : 'PAID'}`);
                setIsProcessingPayment(false);
                return;
            }
            
            // Prepare amounts for combination finding
            const amountData = clientInvoices.map(invoice => ({
                id: invoice.id,
                amount: action === 'received' ? invoice.inv_value : (invoice.pay_recruiter || 0),
                invoice: invoice
            }));
            
            // Find combinations that sum to target amount
            const combinations = findSubsetSum(amountData, targetAmount);
            
            if (combinations.length === 0) {
                alert('No payment combination found');
                setIsProcessingPayment(false);
                return;
            }
            
            // Use the first valid combination found
            const selectedCombination = combinations[0];
            const invoiceIds = selectedCombination.map(item => item.id);
            
            // Update invoice statuses
            const token = sessionStorage.getItem('token');
            const newStatus = action === 'received' ? 'PAID' : 'CLOSED';
            
            // Update each invoice in the combination
            for (const invoiceId of invoiceIds) {
                await axios.put(
                    `${process.env.REACT_APP_RYZ_SERVER}/update_client_invoice/${invoiceId}`,
                    { inv_status: newStatus },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            
            // Update local state
            setInvoices(invoices.map(invoice => 
                invoiceIds.includes(invoice.id) 
                    ? { ...invoice, inv_status: newStatus }
                    : invoice
            ));

            alert(`Payment ${action} recorded successfully! Updated ${invoiceIds.length} invoice(s) to ${newStatus} status.\nInvoice IDs: ${invoiceIds.join(', ')}`);
            
            // Reset form
            setSelectedClientId('');
            setPaymentAmount('');
            
        } catch (error) {
            console.error(`Error recording ${action}:`, error);
            alert(`Failed to record ${action}. Please try again.`);
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const renderBreakdownRow = (invoice) => {
        if (expandedInvoiceId !== invoice.id) return null;

        // Determine header classes based on invoice status
        const getHeaderClasses = (status) => {
            //console.log('status is', status);
            switch (status) {
                case 'READY':
                case 'SENT':
                    return {
                        fromClient: 'status-red',
                        payRecruiter: 'status-red'
                    };
                case 'PAID':
                    return {
                        fromClient: 'status-green',
                        payRecruiter: 'status-red'
                    };
                case 'CLOSED':
                    return {
                        fromClient: 'status-default',
                        payRecruiter: 'status-default'
                    };
                default:
                    return {
                        fromClient: 'status-default',
                        payRecruiter: 'status-default'
                    };
            }
        };

        // Use the client invoice status from the breakdown data, or fall back to the invoice status
        const clientInvoiceStatus = invoiceBreakdown.length > 0 ? invoiceBreakdown[0].clientInvoiceStatus : invoice.inv_status;
        const headerClasses = getHeaderClasses(clientInvoiceStatus);
        //console.log('inv_status', 'invoiceBreakdown', invoice.inv_status, invoiceBreakdown);

        return (
            <tr key={`breakdown-${invoice.id}`} className="breakdown-row">
                <td colSpan="10" className="breakdown-cell">
                    <div className="breakdown-container">
                        <div className="breakdown-header">
                            <h3>Invoice Breakdown - {invoice.client_name} (Invoice #{invoice.id}) - Status: {clientInvoiceStatus}</h3>
                        </div>
                        <div className="breakdown-table-wrapper">
                            {isLoadingBreakdown ? (
                                <div className="breakdown-loading">
                                    <span>Loading breakdown data...</span>
                                </div>
                            ) : invoiceBreakdown.length > 0 ? (
                                <table className="breakdown-table">
                                    <thead>
                                        <tr>
                                            <th>Candidate</th>
                                            <th>Recruiter</th>
                                            <th>Start Period</th>
                                            <th>End Period</th>
                                            <th>Hours</th>
                                            <th className={headerClasses.fromClient}>From Client</th>
                                            <th className={headerClasses.payRecruiter}>Pay Recruiter</th>
                                            <th>Margin</th>
                                            <th>Margin/Hr</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceBreakdown.map((breakdown, index) => {
                                            const expectedClientTotal = breakdown.expected_client_total || 0;
                                            const expectedRecruiterTotal = breakdown.expected_recruiter_total || 0;
                                            const margin = expectedClientTotal - expectedRecruiterTotal;
                                            const hours = breakdown.Hours || 0;
                                            const marginPerHour = hours > 0 ? margin / hours : 0;
                                            
                                            // Format dates to show only date part (YYYY-MM-DD)
                                            const formatDate = (dateString) => {
                                                if (!dateString) return '';
                                                const date = new Date(dateString);
                                                return date.toISOString().split('T')[0];
                                            };
                                            
                                            return (
                                                <tr key={`${breakdown["Invoice Id"]}-${index}`}>
                                                    <td>{breakdown["Candidate Name"]}</td>
                                                    <td>{breakdown["Recruiter Name"]}</td>
                                                    <td>{formatDate(breakdown["Start Period"])}</td>
                                                    <td>{formatDate(breakdown["End Period"])}</td>
                                                    <td>{hours}</td>
                                                    <td className={headerClasses.fromClient}>${expectedClientTotal?.toLocaleString() || '0'}</td>
                                                    <td className={headerClasses.payRecruiter}>${expectedRecruiterTotal?.toLocaleString() || '0'}</td>
                                                    <td className="margin-cell">${margin?.toLocaleString() || '0'}</td>
                                                    <td className="margin-cell">${marginPerHour?.toFixed(2) || '0.00'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="breakdown-empty">
                                    <span>No breakdown data available for this invoice</span>
                                </div>
                            )}
                        </div>
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="select-invoice-container">
            <div className="content-header">
                <h1>Invoice Management</h1>
                <div className="header-actions">
                    <div className="payment-form">
                        <select 
                            value={selectedClientId} 
                            onChange={(e) => setSelectedClientId(e.target.value)}
                            className="client-dropdown"
                            disabled={isProcessingPayment}
                        >
                            <option value="">Select Client</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                        
                        <input
                            type="number"
                            placeholder="Amount"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            className="amount-input"
                            disabled={isProcessingPayment}
                            min="0"
                            step="0.01"
                        />
                        
                        <button 
                            className="btn-received"
                            onClick={() => handlePaymentAction('received')}
                            disabled={isProcessingPayment || !selectedClientId || !paymentAmount}
                        >
                            {isProcessingPayment ? 'Processing...' : 'Received'}
                        </button>
                        
                        <button 
                            className="btn-paid"
                            onClick={() => handlePaymentAction('paid')}
                            disabled={isProcessingPayment || !selectedClientId || !paymentAmount}
                        >
                            {isProcessingPayment ? 'Processing...' : 'Paid'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Invoices Table Section */}
            <div className="dashboard-section">
                <div className="section-header">
                    <h2 style={{ color: 'var(--theme-color)' }}>Client Invoices</h2>
                </div>
                <div className="table-container">
                    <div className="table-scroll-wrapper">
                        <table>
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Project Name</th>
                                <th>ID</th>
                                <th>Invoice Date</th>
                                <th>Period Start</th>
                                <th>Period End</th>
                                <th>Client Invoice</th>
                                <th>Pay Recruiter</th>
                                <th>Send</th>
                                <th>Invoice Hash</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.filter(invoice => {
                                // Filter out SUBMITTED invoices
                                if (invoice.inv_status === 'SUBMITTED' || invoice.inv_status === 'TEST') {
                                    return false;
                                }
                                
                                // For PAID invoices, check if they are older than 3 months
                                if (invoice.inv_status === 'CLOSED') {
                                    const invoiceDate = new Date(invoice.inv_date);
                                    const threeMonthsAgo = new Date();
                                    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                                    
                                    // Don't display PAID invoices older than 3 months
                                    if (invoiceDate < threeMonthsAgo) {
                                        return false;
                                    }
                                }
                                
                                return true;
                            }).map(invoice => [
                                <tr 
                                    key={invoice.inv_hash} 
                                    onClick={() => handleRowClick(invoice)}
                                    className={`invoice-row ${expandedInvoiceId === invoice.id ? 'expanded' : ''}`}
                                >
                                    <td>{invoice.client_name}</td>
                                    <td>{invoice.project_name || ''}</td>
                                    <td>{invoice.id}</td>
                                    <td>{invoice.inv_date}</td>
                                    <td>{invoice.period_start}</td>
                                    <td>{invoice.period_end}</td>
                                    <td>USD ${invoice.inv_value.toLocaleString()}</td>
                                    <td>USD ${invoice.pay_recruiter ? invoice.pay_recruiter.toLocaleString() : '0'}</td>
                                    <td>
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => handleSendEmail(invoice)}
                                                className="send-button"
                                                disabled={isLoadingInvoice}
                                            >
                                                {isLoadingInvoice && selectedInvoice?.inv_hash === invoice.inv_hash ? 'Loading...' : 'Send'}
                                            </button>
                                        </div>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                                        {invoice.inv_hash.substring(0, 10)}...
                                    </td>
                                    <td>
                                        <span className={`status-badge ${invoice.inv_status.toLowerCase()}`}>
                                            {invoice.inv_status}
                                        </span>
                                        <span className="expand-indicator">
                                            {expandedInvoiceId === invoice.id ? '▲' : '▼'}
                                        </span>
                                    </td>
                                </tr>,
                                renderBreakdownRow(invoice)
                            ]).flat()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            {showEmailModal && (
                <div className="modal-overlay">
                    <div className="modal-content email-modal">
                        <div className="modal-header">
                            <h2>Send Invoice Email</h2>
                            <button 
                                className="close-button" 
                                onClick={handleCloseModal}
                                disabled={isSendingEmail}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="email-form">
                                <label htmlFor="email-address">Email Address:</label>
                                <input
                                    id="email-address"
                                    type="email"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    className="email-input"
                                    disabled={isSendingEmail}
                                />
                            </div>
                            <div className="invoice-preview">
                                <h3>Invoice Preview:</h3>
                                <div 
                                    className="invoice-content"
                                    dangerouslySetInnerHTML={{ __html: invoiceHtml }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="modal-button cancel"
                                onClick={handleCloseModal}
                                disabled={isSendingEmail}
                            >
                                Cancel
                            </button>
                            <button 
                                className="modal-button send-email"
                                onClick={handleSendEmailSubmit}
                                disabled={isSendingEmail || !emailAddress.trim()}
                            >
                                {isSendingEmail ? 'Sending...' : 'Send Email'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectInvoicePage;
