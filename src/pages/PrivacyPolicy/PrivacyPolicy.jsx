import React from "react";
import Document from "../../components/Document/Document";

export default function PrivacyPolicy() {
  return (
    <Document>
      <h1>Privacy Policy</h1>
      <p> Last Updated: August 04, 2022</p>

      <p>
        As fellow blockchain and cryptocurrency users, we value your privacy. We
        also balance that against the need to monitor and improve our product.
        We will never collect personally identifiable information about you.
      </p>

      <p>Our data collection is limited to:</p>
      <ul className="order-number">
        <li>Anonymized crash and performance monitoring</li>
        <li>
          Anonymized cookie based analytics including anonymized IP addresses
        </li>
        <li>Aggregated, anonymized server logs</li>
      </ul>
      <p>
        Our hosting provider and software vendors may have access to data about
        your activity including your IP address and device information as a
        result of using our services. These vendors include: Netlify, Google
        Analytics, Alchemy API
      </p>
    </Document>
  );
}
