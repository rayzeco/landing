
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './select-invoice-page.scss'; // Assuming the styling is similar to InvoicePage

const SelectInvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_RYZ_SERVER}/list_client_invoices`)
            .then(response => {
                setInvoices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the invoices!', error);
            });
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.inv_hash} onClick={() => handleRowClick(invoice.inv_hash)}>
                            <td>{invoice.client_name}</td>
                            <td>{invoice.id}</td>
                            <td>{invoice.invoice_date}</td>
                            <td>{invoice.period_start}</td>
                            <td>{invoice.period_end}</td>
                            <td>{invoice.inv_value}</td>
                            <td>{invoice.inv_hash}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default SelectInvoicePage;
