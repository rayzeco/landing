import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './select-invoice-page.scss'; // Assuming the styling is similar to InvoicePage

const SelectInvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [emailAddress, setEmailAddress] = useState('');
    const [invoiceHtml, setInvoiceHtml] = useState('');
    const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        
        axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_client_invoices`,
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          })
            .then(response => {
                setInvoices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the invoices!', error);
            });
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
            alert('Invoice email sent successfully!');
            handleCloseModal();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleStatusChange = async (invoiceId, currentStatus) => {
        try {
            const token = sessionStorage.getItem('token');
            const newStatus = currentStatus === 'PAID' ? 'SUBMITTED' : 'PAID';
            console.log('status is ', newStatus)
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

            // Update local state
            setInvoices(invoices.map(invoice => 
                invoice.id === invoiceId 
                    ? { ...invoice, inv_status: newStatus }
                    : invoice
            ));
        } catch (error) {
            console.error('Error updating invoice status:', error);
            alert('Failed to update invoice status. Please try again.');
        }
    };

    const handleRowClick = (inv_hash) => {
        navigate(`/render_invoice/${inv_hash}`);
    };

    return (
        <div className="select-invoice-container">
            <div className="content-header">
                <h1>Invoice Management</h1>
                <div className="header-actions">
                    <button className="btn-secondary" onClick={() => navigate('/invoice')}>
                        Create New Invoice
                    </button>
                </div>
            </div>

            {/* Invoices Table Section */}
            <div className="dashboard-section">
                <div className="section-header">
                    <h2 style={{ color: 'var(--theme-color)' }}>Client Invoices</h2>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>ID</th>
                                <th>Invoice Date</th>
                                <th>Period Start</th>
                                <th>Period End</th>
                                <th>Invoice Value</th>
                                <th>Send</th>
                                <th>Invoice Hash</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => (
                                <tr key={invoice.inv_hash} onClick={() => handleRowClick(invoice.inv_hash)}>
                                    <td>{invoice.client_name}</td>
                                    <td>{invoice.id}</td>
                                    <td>{invoice.inv_date}</td>
                                    <td>{invoice.period_start}</td>
                                    <td>{invoice.period_end}</td>
                                    <td>USD ${invoice.inv_value.toLocaleString()}</td>
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
                                        <div onClick={(e) => e.stopPropagation()}>
                                            {invoice.inv_status === 'PAID' ? (
                                                <span className="status-badge active">PAID</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusChange(invoice.id, invoice.inv_status)}
                                                    className="status-button"
                                                >
                                                    MARK PAID
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
