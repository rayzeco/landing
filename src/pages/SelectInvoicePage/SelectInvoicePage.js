import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './select-invoice-page.scss'; // Assuming the styling is similar to InvoicePage

const SelectInvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
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
            <div className="panel">

            <h1>Select Invoice</h1>
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>ID</th>
                        <th>Invoice Date</th>
                        <th>Period Start</th>
                        <th>Period End</th>
                        <th>Invoice Value</th>
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
                            <td>{invoice.inv_value.toLocaleString()}</td>
                            <td>{invoice.inv_hash}</td>
                            <td>
                                <div onClick={(e) => e.stopPropagation()}>
                                    {invoice.inv_status === 'PAID' ? (
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            onChange={() => handleStatusChange(invoice.id, invoice.inv_status)}
                                            label="PAID"
                                        />
                                    ) : (
                                        <button
                                            onClick={() => handleStatusChange(invoice.id, invoice.inv_status)}
                                            className="status-button"
                                        >
                                            NOT PAID
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
    );
};

export default SelectInvoicePage;
